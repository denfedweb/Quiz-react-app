import React, { Component } from "react";
import classes from "./Auth.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";



function validateEmail(email) {
    var re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {

    state = {
        isFormValid: false,
    formControls: {
        email: {
            value: "",
            type: "email",
            placeholder: 'Email',
            label: "Email",
            errorMessage: 'Please enter a valid email',
            valid: false,
            touched: false,
            validation: {
                required: true,
                email: true
            }
        },
        password: {
            value: "",
            type: "password",
            placeholder: 'Password',
            label: "Password",
            errorMessage: 'Please enter a valid password',
            valid: false,
            touched: false,
            validation: {
                required: true,
                minLength: 6
            }
        },
    },
    }
    validateControl(value, validation){
        if(!validation){
            return true
        }
        
        let isValid = true

        if(validation.required){
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }
        if (validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }
        
        return isValid
    }
    
    onChangeEvent = (e, controlName) => {
           const formControls = {...this.state.formControls}
           const control = {...formControls[controlName]}
           control.value = e.target.value
           control.touched = true
           control.valid = this.validateControl(control.value, control.validation)

           formControls[controlName] = control

           let isFormValid = true

           Object.keys(formControls).forEach(name => {
               isFormValid = formControls[name].valid && isFormValid
           })

           this.setState({
               formControls, isFormValid
           })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, key) =>{
            const control = this.state.formControls[controlName]
            return (
                <Input 
                placeholder={control.placeholder} 
                key={controlName + key} 
                type={control.type}
                value={control.value}
                valid={control.valid}
                touched={control.touched}
                errorMessage={control.errorMessage}
                shouldValidate={!!control.validation}
                onChange={e => this.onChangeEvent(e, controlName)}
                />
            )
        })
        
        
    }

    loginEvent = () => {

    }
    registerEvent = () => {

    }
    submitEvent = (e) => {
        e.preventDefault();
    }
  render() {
    return (
      <div className={classes.Auth}>
        <h1> Authorization </h1>{" "}
        <form onSubmit={this.submitEvent} className={classes.AuthForm}>
            {this.renderInputs()}
          <Button type="success" onClick={this.loginEvent} disabled={!this.state.isFormValid}>
            Sign in
          </Button>
          <Button type="primary" onClick={this.registerEvent} disabled={!this.state.isFormValid}>
            Sign up
          </Button>
        </form>
      </div>
    );
  }
}
