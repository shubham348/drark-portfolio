import React from "react";
import "./button.scss";

const Button = ({ href, text, customClass, ...rest }) => {
  return (
    <a className={customClass ?? "button"} href={href} {...rest}>
      {text}
    </a>
  );
};

export default Button;
