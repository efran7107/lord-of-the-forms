import { Component, createRef } from "react";
import { isAllValid } from "../utils/validations";
import { UserInformation } from "../types";
import { capitalize, formatPhoneNumber } from "../utils/transformations";
import { ClassTextInput } from "./ClassTextInput";
import { ClassPhoneInput } from "./ClassPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component<{
  handleInformation: (userInfo: UserInformation) => void;
}> {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phoneNumber: ["", "", "", ""],
    hasSubmitted: false,
  };
  phoneRef = [
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
  ];

  render() {
    const { firstName, lastName, email, city, phoneNumber, hasSubmitted } =
      this.state;
    const { handleInformation } = this.props;

    const inputObjArr = [
      {
        label: "First Name",
        placeHolder: "Bilbo",
        errorMessage: firstNameErrorMessage,
        value: firstName,
      },
      {
        label: "Last Name",
        placeHolder: "Baggins",
        errorMessage: lastNameErrorMessage,
        value: lastName,
      },
      {
        label: "Email",
        placeHolder: "bilbo-baggins@adventurehobbits.net",
        errorMessage: emailErrorMessage,
        value: email,
      },
      {
        label: "City",
        placeHolder: "Hobbiton",
        errorMessage: cityErrorMessage,
        value: city,
      },
    ];

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.setState({ hasSubmitted: true });
          const allInfo: UserInformation = {
            firstName: capitalize(firstName),
            lastName: capitalize(lastName),
            email: email,
            city: capitalize(city),
            phone: formatPhoneNumber(phoneNumber),
          };
          if (isAllValid(allInfo)) {
            handleInformation(allInfo);
            this.setState({
              firstName: "",
              lastName: "",
              email: "",
              city: "",
              phoneNumber: ["", "", "", ""],
              hasSubmitted: false,
            });
          } else {
            alert("bad data input");
          }
        }}
      >
        <u>
          <h3>User Information Form</h3>
        </u>

        {inputObjArr.map((input) => (
          <ClassTextInput
            key={input.label.toLowerCase()}
            label={input.label}
            inputProps={{
              placeholder: input.placeHolder,
              onChange: (e) => {
                switch (input.label) {
                  case "First Name":
                    this.setState({ firstName: e.currentTarget.value });
                    break;
                  case "Last Name":
                    this.setState({ lastName: e.currentTarget.value });
                    break;
                  case "Email":
                    this.setState({ email: e.currentTarget.value });
                    break;
                  case "City":
                    this.setState({ city: e.currentTarget.value });
                    break;
                  default:
                    break;
                }
              },
              value: input.value,
              list: input.label === "City" ? "cities" : "",
            }}
            errorMessage={input.errorMessage}
            submitted={hasSubmitted}
          />
        ))}

        <ClassPhoneInput
          phoneArr={phoneNumber}
          handlePhoneArr={(phoneNumber) =>
            this.setState({ phoneNumber: phoneNumber })
          }
          error={phoneNumberErrorMessage}
          submitted={hasSubmitted}
          label="Phone"
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
