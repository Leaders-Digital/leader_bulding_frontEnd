/* eslint-disable no-unused-vars */
 
import React from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd'

function CostumButton({
    isLoading=false,
  className,
  onClick,
  children,
  height = "50px",
  width = "100%",
  text = "Click me",
  type = "button",
  ...props
}) {
  return (
    <div style={{ width }}>
      <button
        type={type}
        onClick={onClick}
        disabled={isLoading}
        className={`bg-Golden relative text-black text-[20px] rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out h-[56px] w-full`}
      >

          {isLoading?    <Spin indicator={<LoadingOutlined spin />} size="small" />:      text}
      </button>
    </div>
  );
}

export default CostumButton;
