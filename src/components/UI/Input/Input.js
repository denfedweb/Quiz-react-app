import React from "react";
import classes from "./Input.css";


function isInvalid({valid, touched, shouldValidate}) {
    return !valid && touched && shouldValidate
  
}

const Input = props => {
  const inputType = props.type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.floor(Math.random() * 9999)}`;

   if (isInvalid(props)) {
       cls.push(classes.invalid);
   }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        id={htmlFor}
        type={inputType}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={props.className}
      />

      {
          isInvalid(props) ? <span>{props.errorMessage || 'Enter the correct value'}</span> : null
      }

     
    </div>
  );
};

export default Input;
