import { useState } from "react";
import { UserInformation } from "../types";
import { isAllValid } from "../utils/validations";
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

export const FunctionalForm = ({ handleUserInfo }: THandleUserInfo) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(["", "", "", ""]);

  return (
    <form
      key="functional-form"
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
        const allInfo: UserInformation = {
          firstName: capitalize(firstName),
          lastName: capitalize(lastName),
          email: email,
          city: capitalize(city),
          phone: formatPhoneNumber(phoneNumber),
        };
        if (isAllValid(allInfo)) {
          handleUserInfo(allInfo);
          setFirstName("");
          setLastName("");
          setEmail("");
          setCity("");
          setPhoneNumber(["", "", "", ""]);
          setIsSubmitted(false);
        } else {
          alert("bad data input");
        }
      }}
    >
      <u>
        <h3 key="userInfo">User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput
        label="First Name"
        inputProps={{
          placeholder: "Bilbo",
          onChange: (e) => {
            setFirstName(e.currentTarget.value);
          },
          value: firstName,
        }}
        errorMessage={firstNameErrorMessage}
        submitted={isSubmitted}
      />

      {/* last name input */}
      <FunctionalTextInput
        label="Last Name"
        inputProps={{
          placeholder: "Baggins",
          onChange: (e) => {
            setLastName(e.currentTarget.value);
          },
          value: lastName,
        }}
        errorMessage={lastNameErrorMessage}
        submitted={isSubmitted}
      />

      {/* Email Input */}
      <FunctionalTextInput
        label="Email"
        inputProps={{
          placeholder: "bilbo-baggins@adventurehobbits.net",
          onChange: (e) => {
            setEmail(e.currentTarget.value);
          },
          value: email,
        }}
        errorMessage={emailErrorMessage}
        submitted={isSubmitted}
      />

      {/* City Input */}
      <FunctionalTextInput
        label="City"
        inputProps={{
          placeholder: "Hobbiton",
          list: "cities",
          onChange: (e) => {
            setCity(e.currentTarget.value);
          },
          value: city,
        }}
        errorMessage={cityErrorMessage}
        submitted={isSubmitted}
      />

      <FunctionalPhoneInput
        phoneArr={phoneNumber}
        handlePhoneArr={(phoneNumber) => setPhoneNumber(phoneNumber)}
        error={phoneNumberErrorMessage}
        submitted={isSubmitted}
        label="Phone"
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
