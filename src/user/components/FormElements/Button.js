import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
  const className = `button button--${props.size || "default"} ${
    props.inverse ? "button--inverse" : ""
  } ${props.danger ? "button--danger" : ""} ${props.disabled ? "button--disabled" : ""}`;

  if (props.href) {
    return (
      <a href={props.href} className={className} target={props.target} rel={props.rel}>
        {props.children}
      </a>
    );
  }

  if (props.to && !props.disabled) {
    return (
      <Link to={props.to} exact={props.exact} className={className}>
        {props.children}
      </Link>
    );
  }

  if (props.to && props.disabled) {
    return (
      <button type="button" className={className} disabled onClick={(e) => e.preventDefault()}>
        {props.children}
      </button>
    );
  }

  return (
    <button type={props.type || "button"} className={className} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Button;