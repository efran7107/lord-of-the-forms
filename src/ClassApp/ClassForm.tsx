import { Component } from "react";
import { isAllValid, isEmailValid, isValidCity } from "../utils/validations";
import { UserInformation } from "../types";
import { capitalize, formatPhoneNumber } from "../utils/transformations";
import { ClassTextInput } from "./ClassTextInput";
import { ClassPhoneInput } from "./ClassPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

const defaultBlankForm = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  phoneNumber: ["", "", "", ""],
};

export class ClassForm extends Component<{
  handleInformation: (userInfo: UserInformation) => void;
  
}> {
  state = {
    formInfo: defaultBlankForm,    
    hasSubmitted: false,
  };

  render() {
    const { firstName, lastName, email, city, phoneNumber } =
      this.state.formInfo;
      const { hasSubmitted } = this.state
    const { handleInformation } = this.props;

    const setPhoneNumber = (newPhone: Array<string>) => {
      this.setState({phoneNumber: newPhone})
    }

    const inputObjArr = [
      {
        label: "First Name",
        placeHolder: "Bilbo",
        errorMessage: firstNameErrorMessage,
        value: firstName,
        key: 'firstName',
        isValid: firstName.length >= 2
      },
      {
        label: "Last Name",
        placeHolder: "Baggins",
        errorMessage: lastNameErrorMessage,
        value: lastName,
        key: 'lastName',
        isValid: lastName.length >= 2
      },
      {
        label: "Email",
        placeHolder: "bilbo-baggins@adventurehobbits.net",
        errorMessage: emailErrorMessage,
        value: email,
        key: 'email',
        isValid: isEmailValid(email)
      },
      {
        label: "City",
        placeHolder: "Hobbiton",
        errorMessage: cityErrorMessage,
        value: city,
        key: 'city',
        isValid: isValidCity(city)
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
          if (!isAllValid(allInfo)) {
            alert("bad data input");
            return
          }
          handleInformation(allInfo);
            this.setState({
              formInfo: defaultBlankForm,
              hasSubmitted: false
            })
        }}
      >
        <u>
          <h3>User Information Form</h3>
        </u>

        {inputObjArr.map((input) => (
          <ClassTextInput
            key={input.label.toLowerCase()}
            label={input.label}
            isValid={input.isValid}
            inputProps={{
              placeholder: input.placeHolder,
              onChange: (e) => {
                this.setState({[input.key]: e.currentTarget.value})
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
          handlePhoneArr={setPhoneNumber}
          error={phoneNumberErrorMessage}
          submitted={hasSubmitted}
          label="Phone"
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
