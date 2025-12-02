import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const [isAnimating, setIsAnimating] = useState(props.show);

  useEffect(() => {
    setIsAnimating(props.show);
  }, [props.show]);

  if (!props.show && !isAnimating) return null;

  const content = (
    <aside 
      className={`side-drawer ${isAnimating ? 'slide-in-left-enter-active' : 'slide-in-left-exit-active'}`} 
      onClick={props.onClick}
    >
      {props.children}
    </aside>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
