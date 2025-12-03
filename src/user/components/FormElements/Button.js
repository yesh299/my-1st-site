import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
  const { to, href, exact, target, rel, size, inverse, danger, disabled, type, onClick, className: extraClass, ...rest } = props;

  const className = `button button--${size || "default"} ${inverse ? "button--inverse" : ""} ${
    danger ? "button--danger" : ""
  } ${disabled ? "button--disabled" : ""} ${extraClass || ""}`.trim();

  if (href) {
    return (
      <a href={href} className={className} target={target} rel={rel} {...rest}>
        {props.children}
      </a>
    );
  }

  if (to && !disabled) {
    return (
      <Link to={to} exact={exact} className={className} {...rest}>
        {props.children}
      </Link>
    );
  }

  if (to && disabled) {
    return (
      <button type="button" className={className} disabled onClick={(e) => e.preventDefault()} {...rest}>
        {props.children}
      </button>
    );
  }

  return (
    <button type={type || "button"} className={className} onClick={onClick} disabled={disabled} {...rest}>
      {props.children}
    </button>
  );
};

export default Button;