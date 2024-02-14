import { useState } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { UserInformation } from '../types';
import { hasNumberOrNonAlfa, isAllValid, isEmailValid, isNameValid, isValidCity, isValidNumber } from '../utils/validations';
import { capitalize, formatPhoneNumber } from '../utils/transformations';
import { allCities } from '../utils/all-cities';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

type THandleUserInfo = {
	handleUserInfo: (userInfo: UserInformation) => void;
};

export const FunctionalForm = ({ handleUserInfo }: THandleUserInfo) => {
	const cities = allCities.join('\n');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [city, setCity] = useState('');
	const [phoneNumber, setPhoneNumber] = useState(['', '', '', '']);
	console.log(phoneNumber);

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
				<input
					placeholder='Hobbiton'
					list='cities'
				/>
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
						onChange={(e) => {
							const phoneSet = [...phoneNumber];
							let set = [...phoneSet[0]];
							set = [e.currentTarget.value];
							phoneSet[0] = set.join('');
							setPhoneNumber([...phoneSet]);
						}}
						maxLength={2}
					/>
					-
					<input
						type='text'
						id='phone-input-2'
						placeholder='55'
						onChange={(e) => {
							const phoneSet = [...phoneNumber];
							let set = [...phoneSet[1]];
							set = [e.currentTarget.value];
							phoneSet[1] = set.join('');
							setPhoneNumber([...phoneSet]);
						}}
						maxLength={2}
					/>
					-
					<input
						type='text'
						id='phone-input-3'
						placeholder='55'
						onChange={(e) => {
							const phoneSet = [...phoneNumber];
							let set = [...phoneSet[2]];
							set = [e.currentTarget.value];
							phoneSet[2] = set.join('');
							setPhoneNumber([...phoneSet]);
						}}
						maxLength={2}
					/>
					-
					<input
						type='text'
						id='phone-input-4'
						placeholder='5'
						onChange={(e) => {
							const phoneSet = [...phoneNumber];
							let set = [...phoneSet[3]];
							set = [e.currentTarget.value];
							phoneSet[3] = set.join('');
							setPhoneNumber([...phoneSet]);
						}}
						maxLength={1}
					/>
				</div>
			</div>

			{isSubmitted === false && phoneNumber.join('').length < 7 ? (
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
