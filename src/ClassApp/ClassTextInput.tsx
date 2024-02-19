import { Component } from "react";
import { TextInputProps } from "../types";
import { ErrorMessage } from "../ErrorMessage";
import { isEmailValid, isValidCity } from "../utils/validations";

export class ClassTextInput extends Component<{
  inputProps: TextInputProps;
  label: string;
  errorMessage: string;
  submitted: boolean;
}> {
  render() {
    const { inputProps, label, errorMessage, submitted } = this.props;
    const { value } = inputProps;
    const strVal = value?.toString();
    return (
      <>
        <div className="input-wrap">
          <label key={label}>{label}: </label>
          <input type="text" {...inputProps} />
        </div>
        <ErrorMessage message={errorMessage} show={submitted &&
					(((label === 'First Name' || label === 'Last Name') && (strVal ? strVal.length < 2 : true)) ||
						(label === 'Email' && (strVal ? (isEmailValid(strVal) === false ? true : false) : true)) ||
						(label === 'City' && (strVal ? (isValidCity(strVal) === false ? true : false) : true)))}/>
      </>
    );
  }
}
