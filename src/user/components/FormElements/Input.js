import React, { useReducer } from "react";

import "./Input.css";

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: true
            };
        default:
            return state;
    }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const changeHandler = (event) => {
    const value = event.target.value;
    dispatch({ type: "CHANGE", val: value });
    if (props.onInput) {
      props.onInput(props.id, value, true);
    }
  };

  const { element, id, type, placeholder, rows, label, ...rest } = props;
  const controlled = rest.value !== undefined;
  const currentValue = controlled ? rest.value : inputState.value;

  const elementNode =
    element === "input" ? (
      <input
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        onChange={changeHandler}
        value={currentValue}
        {...rest}
      />
    ) : (
      <textarea 
        id={id} 
        rows={rows || 3} 
        onChange={changeHandler} 
        placeholder={placeholder}
        value={currentValue}
        {...rest}
      />
    );

  return (
    <div className={`form-control`}>
      <label htmlFor={id}>{label}</label>
      {elementNode}
    </div>
  );
};

export default Input;
