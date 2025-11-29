import React from "react";

import "./Avatar.css";

const Avatar = (props) => {
  const imgHeight = props.height || props.width;
  const extraClass = props.className ? ` ${props.className}` : "";
  const imgStyle = {};
  if (props.width) imgStyle.width = props.width;
  if (imgHeight) imgStyle.height = imgHeight;
  
  return (
    <div className={`avatar${extraClass}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={imgStyle}
      />
    </div>
  );
};

export default Avatar;
