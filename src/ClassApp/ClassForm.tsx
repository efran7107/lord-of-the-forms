import { Component, createRef } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { isAllValid, isEmailValid, isValidCity, isValidNumber } from '../utils/validations';
import { UserInformation } from '../types';
import { setArray, switchInput } from '../ts-functions/functions';
import { capitalize, formatPhoneNumber } from '../utils/transformations';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

export class ClassForm extends Component<{ handleInformation: (userInfo: UserInformation) => void }> {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		city: '',
		phoneNumber: ['', '', '', ''],
		hasSubmitted: false,
	};
	phoneRef = [createRef<HTMLInputElement>(), createRef<HTMLInputElement>(), createRef<HTMLInputElement>(), createRef<HTMLInputElement>()];

	render() {
		const { firstName, lastName, email, city, phoneNumber, hasSubmitted } = this.state;
		const { handleInformation } = this.props;

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
							firstName: '',
							lastName: '',
							email: '',
							city: '',
							phoneNumber: ['', '', '', ''],
							hasSubmitted: false,
						});
					} else {
						alert('bad data input');
					}
				}}>
				<u>
					<h3>User Information Form</h3>
				</u>

				{/* first name input */}
				<div className='input-wrap'>
					<label>{'First Name'}:</label>
					<input
						placeholder='Bilbo'
						onChange={(e) => {
							this.setState({ firstName: e.target.value });
						}}
						value={firstName}
					/>
				</div>
				{hasSubmitted === true && firstName.length < 2 ? (
					<ErrorMessage
						message={firstNameErrorMessage}
						show={true}
					/>
				) : null}

				{/* last name input */}
				<div className='input-wrap'>
					<label>{'Last Name'}:</label>
					<input
						placeholder='Baggins'
						onChange={(e) => {
							this.setState({ lastName: e.target.value });
						}}
						value={lastName}
					/>
				</div>
				{hasSubmitted === true && lastName.length < 2 ? (
					<ErrorMessage
						message={lastNameErrorMessage}
						show={true}
					/>
				) : null}

				{/* Email Input */}
				<div className='input-wrap'>
					<label>{'Email'}:</label>
					<input
						placeholder='bilbo-baggins@adventurehobbits.net'
						onChange={(e) => {
							this.setState({ email: e.target.value });
						}}
						value={email}
					/>
				</div>
				{hasSubmitted === true && !isEmailValid(email) ? (
					<ErrorMessage
						message={emailErrorMessage}
						show={true}
					/>
				) : null}

				{/* City Input */}
				<div className='input-wrap'>
					<label>{'City'}:</label>
					<input
						placeholder='Hobbiton'
						list='cities'
						onChange={(e) => {
							this.setState({ city: e.target.value });
						}}
						value={city}
					/>
				</div>
				{hasSubmitted === true && !isValidCity(capitalize(city)) ? (
					<ErrorMessage
						message={cityErrorMessage}
						show={true}
					/>
				) : null}

				<div className='input-wrap'>
					<label htmlFor='phone'>Phone:</label>
					<div id='phone-input-wrap'>
						<input
							type='text'
							id='phone-input-1'
							placeholder='55'
							maxLength={2}
							ref={this.phoneRef[0]}
							onChange={(e) => {
								if (isValidNumber(e.currentTarget.value) || isValidNumber(phoneNumber[0])) {
									this.setState({ phoneNumber: [...setArray(phoneNumber, e.currentTarget.value, 0)] });
								} else {
									if (e.currentTarget.value === '') e.currentTarget.value;
									else e.currentTarget.value = phoneNumber[0];
								}
								switchInput(this.phoneRef[0], this.phoneRef);
							}}
							value={phoneNumber[0]}
						/>
						-
						<input
							type='text'
							id='phone-input-2'
							placeholder='55'
							maxLength={2}
							ref={this.phoneRef[1]}
							onChange={(e) => {
								if (isValidNumber(e.currentTarget.value) || isValidNumber(phoneNumber[1])) {
									this.setState({ phoneNumber: [...setArray(phoneNumber, e.currentTarget.value, 1)] });
								} else {
									if (e.currentTarget.value === '') e.currentTarget.value;
									else e.currentTarget.value = phoneNumber[1];
								}
								switchInput(this.phoneRef[1], this.phoneRef);
							}}
							value={phoneNumber[1]}
						/>
						-
						<input
							type='text'
							id='phone-input-3'
							placeholder='55'
							maxLength={2}
							ref={this.phoneRef[2]}
							onChange={(e) => {
								if (isValidNumber(e.currentTarget.value) || isValidNumber(phoneNumber[2])) {
									this.setState({ phoneNumber: [...setArray(phoneNumber, e.currentTarget.value, 2)] });
								} else {
									if (e.currentTarget.value === '') e.currentTarget.value;
									else e.currentTarget.value = phoneNumber[2];
								}
								switchInput(this.phoneRef[2], this.phoneRef);
							}}
							value={phoneNumber[2]}
						/>
						-
						<input
							type='text'
							id='phone-input-4'
							placeholder='5'
							maxLength={1}
							ref={this.phoneRef[3]}
							onChange={(e) => {
								if (isValidNumber(e.currentTarget.value) || isValidNumber(phoneNumber[3])) {
									this.setState({ phoneNumber: [...setArray(phoneNumber, e.currentTarget.value, 3)] });
								} else {
									if (e.currentTarget.value === '') e.currentTarget.value;
									else e.currentTarget.value = phoneNumber[3];
								}
								switchInput(this.phoneRef[3], this.phoneRef);
							}}
							value={phoneNumber[3]}
						/>
					</div>
				</div>
				{hasSubmitted === true && phoneNumber.join('').length < 7 ? (
					<ErrorMessage
						message={phoneNumberErrorMessage}
						show={true}
					/>
				) : null}

				<input
					type='submit'
					value='Submit'
				/>
			</form>
		);
	}
}
