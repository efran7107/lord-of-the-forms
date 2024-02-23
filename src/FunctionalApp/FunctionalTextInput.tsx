import { ErrorMessage } from "../ErrorMessage";
import { TextInputProps } from "../types";

export const FunctionalTextInput = ({
  inputProps,
  label,
  isValid,
  errorMessage,
  submitted,
}: {
  inputProps: TextInputProps;
  label: string;
  isValid: boolean;
  errorMessage: string;
  submitted: boolean;
}) => {
  return (
    <>
      <div className="input-wrap">
        <label key={label}>{label}: </label>
        <input type="text" {...inputProps} />
      </div>

      <ErrorMessage message={errorMessage} show={submitted && !isValid} />
    </>
  );
};
