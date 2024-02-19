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

  const inputObjArr = [
    {
      label: "First Name",
      placeholder: "Bilbo",
      errorMessage: firstNameErrorMessage,
      value: firstName,
    },
    {
      label: "Last Name",
      placeholder: "Baggins",
      errorMessage: lastNameErrorMessage,
      value: lastName,
    },
    {
      label: "Email",
      placeholder: "bilbo-baggins@adventurehobbits.net",
      errorMessage: emailErrorMessage,
      value: email,
    },
    {
      label: "City",
      placeholder: "Hobbiton",
      errorMessage: cityErrorMessage,
      value: city,
    },
  ];

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

      {inputObjArr.map((input) => (
        <FunctionalTextInput
          key={input.label.toLowerCase()}
          label={input.label}
          inputProps={{
            placeholder: input.placeholder,
            onChange: (e) => {
              switch (input.label) {
                case "First Name":
                  setFirstName(e.currentTarget.value);
                  break;
                case "Last Name":
                  setLastName(e.currentTarget.value);
                  break;
                case "Email":
                  setEmail(e.currentTarget.value);
                  break;
                case "City":
                  setCity(e.currentTarget.value);
                  break;
                default:
                  break;
              }
            },
            value: input.value,
            list: input.label === "City" ? "cities" : "",
          }}
          errorMessage={input.errorMessage}
          submitted={isSubmitted}
        />
      ))}

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
