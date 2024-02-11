import { Component, createRef } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { isEmailValid, isNameValid, isValidCity, isValidPhoneNumber } from '../utils/validations';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

export class ClassForm extends Component {
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
		const { hasSubmitted } = this.state;

		return (
			<form
				onSubmit={(e) => {
					e.preventDefault();
					this.firstNameRef.current ? isNameValid(this.firstNameRef.current.value) : null;
					this.lastNameRef.current ? isNameValid(this.lastNameRef.current.value) : null;
					this.emailRef.current ? isEmailValid(this.emailRef.current.value) : null;
					this.cityRef.current ? isValidCity(this.cityRef.current.value) : null;
					this.phoneNumberRef1.current && this.phoneNumberRef2.current && this.phoneNumberRef3.current && this.phoneNumberRef4.current
						? isValidPhoneNumber([this.phoneNumberRef1.current.value, this.phoneNumberRef2.current.value, this.phoneNumberRef3.current.value, this.phoneNumberRef4.current.value])
						: null;
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
				{hasSubmitted === true ? (
					<ErrorMessage
						message={firstNameErrorMessage}
						show={true}
					/>
				) : null}

				{/* last name input */}
				<div className='input-wrap'>
					<label>{'Last Name'}:</label>
					<input placeholder='Baggins' />
				</div>
				{hasSubmitted === true ? (
					<ErrorMessage
						message={lastNameErrorMessage}
						show={true}
					/>
				) : null}

				{/* Email Input */}
				<div className='input-wrap'>
					<label>{'Email'}:</label>
					<input placeholder='bilbo-baggins@adventurehobbits.net' />
				</div>
				{hasSubmitted === true ? (
					<ErrorMessage
						message={emailErrorMessage}
						show={true}
					/>
				) : null}

				{/* City Input */}
				<div className='input-wrap'>
					<label>{'City'}:</label>
					<input placeholder='Hobbiton' />
				</div>
				{hasSubmitted === true ? (
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
						/>
						-
						<input
							type='text'
							id='phone-input-2'
							placeholder='55'
						/>
						-
						<input
							type='text'
							id='phone-input-3'
							placeholder='55'
						/>
						-
						<input
							type='text'
							id='phone-input-4'
							placeholder='5'
						/>
					</div>
				</div>
				{hasSubmitted === true ? (
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
