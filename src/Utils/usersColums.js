const userscolumns = [
  {
    title: "Nom",
    dataIndex: "name",
    sorter: true,
    render: (name, record) => `${record.name} ${record.lastName}`,
    width: "20%",
  },
  {
    title: "Prénom",
    dataIndex: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
    className: "text-center",
  },
  {
    title: "Role",
    dataIndex: "role",
  },

  {
    title: "Phone",
    dataIndex: "telephone",
  },
];
export default userscolumns;
