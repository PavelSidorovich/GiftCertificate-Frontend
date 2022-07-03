import React from "react";
import {
  getFeedback,
  getFieldInputClass,
  getInputFieldIconClass,
} from "../../helpers/FormClasses";

const InputBlock = ({
  id,
  label,
  type,
  placeholder,
  value,
  error,
  onChange,
  autoComplete,
  min,
}) => {
  const getInput = () => {
    return type === "number" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder || ""}
        value={value || ""}
        onChange={onChange}
        min={min || 1}
      />
    ) : (
      <input
        id={id}
        type={type}
        placeholder={placeholder || ""}
        value={value || ""}
        onChange={onChange}
        autoComplete={autoComplete || "off"}
      />
    );
  };

  return (
    <div className="form-block">
      <div className={getFieldInputClass(error)}>
        {label ? <label htmlFor={id}>{label}</label> : null}
        <div className="form-block__input-wrapper">
          {getInput()}
          <span className={getInputFieldIconClass(error)}></span>
        </div>
      </div>
      <div className="form-block__feedback">
        <span className="form-block__feedback--invalid">
          {getFeedback(error)}
        </span>
      </div>
    </div>
  );
};

export default InputBlock;
