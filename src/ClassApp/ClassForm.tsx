import { Component, createRef } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { isAllValid, isEmailValid, isNameValid, isValidCity, isValidPhoneNumber } from '../utils/validations';
import { switchInput } from '../ts-functions/functions';
import { UserInformation } from '../types';
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

	firstNameRef = createRef<HTMLInputElement>();
	lastNameRef = createRef<HTMLInputElement>();
	emailRef = createRef<HTMLInputElement>();
	cityRef = createRef<HTMLInputElement>();
	phoneNumberRef1 = createRef<HTMLInputElement>();
	phoneNumberRef2 = createRef<HTMLInputElement>();
	phoneNumberRef3 = createRef<HTMLInputElement>();
	phoneNumberRef4 = createRef<HTMLInputElement>();

	render() {
		const { firstName, lastName, email, city, phoneNumber, hasSubmitted } = this.state;
		const { firstNameRef, lastNameRef, emailRef, cityRef, phoneNumberRef1, phoneNumberRef2, phoneNumberRef3, phoneNumberRef4 } = this;
		const { handleInformation } = this.props;
		const phoneRefArr = [phoneNumberRef1, phoneNumberRef2, phoneNumberRef3, phoneNumberRef4];
		return (
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (
						firstNameRef.current &&
						lastNameRef.current &&
						emailRef.current &&
						cityRef.current &&
						phoneNumberRef1.current &&
						phoneNumberRef2.current &&
						phoneNumberRef3.current &&
						phoneNumberRef4.current
					) {
						this.setState({
							firstName: capitalize(firstNameRef.current.value),
							lastName: capitalize(lastNameRef.current.value),
							email: emailRef.current.value,
							city: capitalize(cityRef.current.value),
							phoneNumber: formatPhoneNumber([phoneNumberRef1.current.value, phoneNumberRef2.current.value, phoneNumberRef3.current.value, phoneNumberRef4.current.value]),
							hasSubmitted: true,
						});
						if (
							isAllValid(firstNameRef.current.value, lastNameRef.current.value, emailRef.current.value, cityRef.current.value, [
								phoneNumberRef1.current.value,
								phoneNumberRef2.current.value,
								phoneNumberRef3.current.value,
								phoneNumberRef4.current.value,
							])
						) {
							handleInformation({
								firstName: firstNameRef.current.value,
								lastName: lastNameRef.current.value,
								email: emailRef.current.value,
								city: cityRef.current.value,
								phone: [phoneNumberRef1.current.value, phoneNumberRef2.current.value, phoneNumberRef3.current.value, phoneNumberRef4.current.value].join('-'),
							});
						}
						firstNameRef.current.value = '';
						lastNameRef.current.value = '';
						emailRef.current.value = '';
						cityRef.current.value = '';
						phoneNumberRef1.current.value = '';
						phoneNumberRef2.current.value = '';
						phoneNumberRef3.current.value = '';
						phoneNumberRef4.current.value = '';
					}
				}}>
				<u>
					<h3>User Information Form</h3>
				</u>

				{/* first name input */}
				<div className='input-wrap'>
					<label>{'First Name'}:</label>
					<input
						ref={this.firstNameRef}
						placeholder='Bilbo'
					/>
				</div>
				{hasSubmitted === true && !isNameValid(firstName) ? (
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
						ref={lastNameRef}
					/>
				</div>
				{hasSubmitted === true && !isNameValid(lastName) ? (
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
						ref={emailRef}
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
						ref={cityRef}
					/>
				</div>
				{hasSubmitted === true && !isValidCity(city) ? (
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
							ref={phoneNumberRef1}
							onChange={() => {
								switchInput(phoneNumberRef1, phoneRefArr);
							}}
							maxLength={2}
						/>
						-
						<input
							type='text'
							id='phone-input-2'
							placeholder='55'
							ref={phoneNumberRef2}
							onChange={() => {
								switchInput(phoneNumberRef2, phoneRefArr);
							}}
							maxLength={2}
						/>
						-
						<input
							type='text'
							id='phone-input-3'
							placeholder='55'
							ref={phoneNumberRef3}
							onChange={() => {
								switchInput(phoneNumberRef3, phoneRefArr);
							}}
							maxLength={2}
						/>
						-
						<input
							type='text'
							id='phone-input-4'
							placeholder='5'
							ref={phoneNumberRef4}
							onChange={() => {
								switchInput(phoneNumberRef4, phoneRefArr);
							}}
							maxLength={1}
						/>
					</div>
				</div>
				{hasSubmitted === true && !isValidPhoneNumber(phoneNumber) ? (
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
