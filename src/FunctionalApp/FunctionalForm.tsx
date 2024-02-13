import { useRef, useState } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { UserInformation } from '../types';
import { isAllValid, isEmailValid, isNameValid, isValidCity, isValidPhoneNumber } from '../utils/validations';
import { switchInput } from '../ts-functions/functions';
import { capitalize, formatPhoneNumber } from '../utils/transformations';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

type THandleUserInfo = {
	handleUserInfo: (userInfo: UserInformation) => void;
};

export const FunctionalForm = ({ handleUserInfo }: THandleUserInfo) => {
	const [isSubmitted, setIsSubmitted] = useState(false);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [city, setCity] = useState('');
	const [phoneNumber, setPhoneNumber] = useState(['', '', '', '']);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
			}}>
			<u>
				<h3>User Information Form</h3>
			</u>

			{/* first name input */}
			<div className='input-wrap'>
				<label>{'First Name'}:</label>
				<input placeholder='Bilbo' />
			</div>
			{isSubmitted && !isNameValid(firstName) ? (
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
			{isSubmitted && !isNameValid(lastName) ? (
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
			{isSubmitted && !isEmailValid(email) ? (
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
			{isSubmitted && isValidCity(city) === false ? (
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
						onChange={() => {}}
						maxLength={2}
					/>
					-
					<input
						type='text'
						id='phone-input-2'
						placeholder='55'
						onChange={() => {}}
						maxLength={2}
					/>
					-
					<input
						type='text'
						id='phone-input-3'
						placeholder='55'
						onChange={() => {}}
						maxLength={2}
					/>
					-
					<input
						type='text'
						id='phone-input-4'
						placeholder='5'
						onChange={() => {}}
						maxLength={1}
					/>
				</div>
			</div>

			{isSubmitted && isValidPhoneNumber(phoneNumber) === false ? (
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
};
