import { useState } from "react";
import { UserInformation } from "../types";
import { isAllValid, isEmailValid, isValidCity } from "../utils/validations";
import { capitalize, formatPhoneNumber } from "../utils/transformations";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type THandleUserInfo = {
  handleUserInfo: (userInfo: UserInformation) => void;
};

const defaultBlankForm = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  phoneNumber: ["", "", "", ""],
};

export const FunctionalForm = ({ handleUserInfo }: THandleUserInfo) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formInfo, setFormInfo] = useState(defaultBlankForm);

  const setPhoneNumber = (newPhone: Array<string>) => {
    setFormInfo({ ...formInfo, phoneNumber: newPhone });
  };

  const inputObjArr = [
    {
      label: "First Name",
      placeholder: "Bilbo",
      errorMessage: firstNameErrorMessage,
      value: formInfo.firstName,
      key: "firstName",
      isValid: formInfo.firstName.length >= 2,
    },
    {
      label: "Last Name",
      placeholder: "Baggins",
      errorMessage: lastNameErrorMessage,
      value: formInfo.lastName,
      key: "lastName",
      isValid: formInfo.lastName.length >= 2,
    },
    {
      label: "Email",
      placeholder: "bilbo-baggins@adventurehobbits.net",
      errorMessage: emailErrorMessage,
      value: formInfo.email,
      key: "email",
      isValid: isEmailValid(formInfo.email),
    },
    {
      label: "City",
      placeholder: "Hobbiton",
      errorMessage: cityErrorMessage,
      value: formInfo.city,
      key: "city",
      isValid: isValidCity(formInfo.city),
    },
  ];

  return (
    <form
      key="functional-form"
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
        const allInfo: UserInformation = {
          firstName: capitalize(formInfo.firstName),
          lastName: capitalize(formInfo.lastName),
          email: formInfo.email,
          city: capitalize(formInfo.city),
          phone: formatPhoneNumber(formInfo.phoneNumber),
        };
        if (!isAllValid(allInfo)) {
          alert("bad data input");
          return;
        }
        handleUserInfo(allInfo);
        setFormInfo(defaultBlankForm);
        setIsSubmitted(false)
      }}
    >
      <u>
        <h3 key="formInfo">User Information Form</h3>
      </u>

      {inputObjArr.map((input) => (
        <FunctionalTextInput
          key={input.label.toLowerCase()}
          label={input.label}
          isValid={input.isValid}
          inputProps={{
            placeholder: input.placeholder,
            onChange: (e) => {
              setFormInfo({ ...formInfo, [input.key]: e.currentTarget.value });
            },
            value: input.value,
            list: input.label === "City" ? "cities" : "",
          }}
          errorMessage={input.errorMessage}
          submitted={isSubmitted}
        />
      ))}

      <FunctionalPhoneInput
        phoneArr={formInfo.phoneNumber}
        handlePhoneArr={setPhoneNumber}
        error={phoneNumberErrorMessage}
        submitted={isSubmitted}
        label="Phone"
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
