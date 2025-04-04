import React from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  },
  tableRow: { flexDirection: "row" },
  // Column width definitions
  col1: { width: "47%" }, // Largest column
  col2: { width: "9%" }, // Middle columns
  col3: { width: "12%" },
  col4: { width: "12%" },
  col5: { width: "20%" }, // Right-most slightly larger column
  // Common cell styles
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  tableHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#eee',
    height: '100%', // Ensure header cells fill vertical space
  },
  tableData: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    height: '100%', // Ensure data cells fill vertical space
  },
  numberContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
});

export const Home = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text>Invoice</Text>
      <View style={styles.section}>
        <Text>Customer: John</Text>
        <Text>Date: 2025-04-04</Text>
      </View>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={[styles.col1, styles.tableHeader]}><Text style={styles.tableCell}>Item</Text></View>
          <View style={[styles.col2, styles.tableHeader]}><Text style={styles.tableCell}>Qty</Text></View>
          <View style={[styles.col3, styles.tableHeader]}><Text style={styles.tableCell}>Price</Text></View>
          <View style={[styles.col4, styles.tableHeader]}><Text style={styles.tableCell}>Total</Text></View>
          <View style={[styles.col5, styles.tableHeader]}><Text style={styles.tableCell}>Extended Info</Text></View>
        </View>

        {/* Table Data */}
        {[1, 2, 3, 5, 6, 7, 8, 9].map((_, i) => (
          <View style={styles.tableRow} key={i}>
            {/* Item Column (40%) */}
            <View style={[styles.col1, styles.tableData]}>
              <Text style={styles.tableCell}>
                Product {i + 1} - Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Cupiditate ipsam vitae accusantium, dignissimos magni natus neque quae 
                excepturi hic, dolores corrupti ea iste nihil aliquam iure a ratione, 
                quidem officia.
              </Text>
            </View>

            {/* Number Columns (12% each) */}
            <View style={[styles.col2, styles.tableData]}>
              <View style={styles.numberContainer}>
                <Text style={styles.tableCell}>2</Text>
              </View>
            </View>
            <View style={[styles.col3, styles.tableData]}>
              <View style={styles.numberContainer}>
                <Text style={styles.tableCell}>$10.00000</Text>
              </View>
            </View>
            <View style={[styles.col4, styles.tableData]}>
              <View style={styles.numberContainer}>
                <Text style={styles.tableCell}>$20.0000</Text>
              </View>
            </View>

            {/* Last Column (24%) */}
            <View style={[styles.col5, styles.tableData]}>
              <View style={styles.numberContainer}>
                <Text style={styles.tableCell}>123-456-789</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default Home;