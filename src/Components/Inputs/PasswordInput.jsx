/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import "../../Styles/Costum_hover.css";

const PasswordInput = React.forwardRef(
  ({ width = "100%", height = "40px", value, onChange, placeholder }, ref) => {
    return (
      <div style={{ width }} className="mt-2">
        <Input.Password
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ height }}
          className="custom_Input_Hover focus:border-Golden-500 hover:border-Golden-500 border-Golden"
          iconRender={(visible) => {
            const iconStyle = {
              fontSize: "24px",
              width: "24px",
              height: "24px",
              color: visible ? "#f7d47a" : "#000",
            };

            return visible ? (
              <Icon
                icon="hugeicons:view"
                width="24"
                height="24"
                style={{ color: iconStyle.color }}
              />
            ) : (
              <Icon
                icon="hugeicons:view-off-slash"
                width="24"
                height="24"
                style={{ color: iconStyle.color }}
              />
            );
          }}
        />
      </div>
    );
  }
);

export default PasswordInput;
