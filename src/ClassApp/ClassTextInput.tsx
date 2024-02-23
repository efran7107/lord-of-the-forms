import { Component } from "react";
import { TextInputProps } from "../types";
import { ErrorMessage } from "../ErrorMessage";

export class ClassTextInput extends Component<{
  inputProps: TextInputProps;
  label: string;
  isValid: boolean;
  errorMessage: string;
  submitted: boolean;
}> {
  render() {
    const { inputProps, label, errorMessage, submitted, isValid } = this.props;
    return (
      <>
        <div className="input-wrap">
          <label key={label}>{label}: </label>
          <input type="text" {...inputProps} />
        </div>
        <ErrorMessage message={errorMessage} show={submitted && !isValid}/>
      </>
    );
  }
}
