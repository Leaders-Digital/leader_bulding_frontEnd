/* eslint-disable react/display-name */
 
import React from "react";
import { Input as AntInput } from "antd";
import "../../Styles/Costum_hover_input.css";
const CostumInput = React.forwardRef(
  (
    {
      value,
      onChange,
      placeholder,
      icon,
      width = "100%",
      height = "40px",
      iconHeight,
      iconWidth,
      iconName,
    },
    ref
  ) => {
    return (
      <div style={{ width }} className="custom_Input_hover mt-2">
        <AntInput
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            height,
            paddingRight: icon ? "10px" : "10px",
            outline: "none",
          }}
          suffix={
            icon
              ? React.createElement(icon, {
                  icon: iconName,
                  style: {
                    height: iconHeight,
                    width: iconWidth,
                    fontSize: iconHeight,
                  },
                })
              : null
          }
        />
      </div>
    );
  }
);

export default CostumInput;
