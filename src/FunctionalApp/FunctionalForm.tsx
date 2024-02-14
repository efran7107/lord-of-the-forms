import { useRef, useState } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { UserInformation } from '../types';
import { hasNumberOrNonAlfa, isAllValid, isEmailValid, isNameValid, isValidCity, isValidNumber } from '../utils/validations';
import { capitalize, formatPhoneNumber } from '../utils/transformations';
import { allCities } from '../utils/all-cities';
import { setArray, switchInput } from '../ts-functions/functions';

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

	const phoneSetRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				setIsSubmitted(true);
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
						setFirstName(e.currentTarget.value);
					}}
				/>
			</div>
			{isSubmitted && firstName.length < 2 ? (
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
						setLastName(e.target.value);
					}}
				/>
			</div>
			{isSubmitted && lastName.length < 2 ? (
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
						setEmail(e.currentTarget.value);
					}}
				/>
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
					onChange={(e) => {
						setCity(e.currentTarget.value);
					}}
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
							if (isValidNumber(e.currentTarget.value)) {
								setPhoneNumber([...setArray(phoneNumber, e.currentTarget.value, 0)]);
							} else {
								e.currentTarget.value = '';
							}
							switchInput(phoneSetRefs[0], phoneSetRefs);
						}}
						maxLength={2}
						ref={phoneSetRefs[0]}
					/>
					-
					<input
						type='text'
						id='phone-input-2'
						placeholder='55'
						onChange={(e) => {
							if (isValidNumber(e.currentTarget.value)) {
								setPhoneNumber([...setArray(phoneNumber, e.currentTarget.value, 1)]);
							} else {
								e.currentTarget.value = '';
							}
							switchInput(phoneSetRefs[1], phoneSetRefs);
						}}
						maxLength={2}
						ref={phoneSetRefs[1]}
					/>
					-
					<input
						type='text'
						id='phone-input-3'
						placeholder='55'
						onChange={(e) => {
							if (isValidNumber(e.currentTarget.value)) {
								setPhoneNumber([...setArray(phoneNumber, e.currentTarget.value, 2)]);
							} else {
								e.currentTarget.value = '';
							}
							switchInput(phoneSetRefs[2], phoneSetRefs);
						}}
						maxLength={2}
						ref={phoneSetRefs[2]}
					/>
					-
					<input
						type='text'
						id='phone-input-4'
						placeholder='5'
						onChange={(e) => {
							if (isValidNumber(e.currentTarget.value)) {
								setPhoneNumber([...setArray(phoneNumber, e.currentTarget.value, 3)]);
							} else {
								e.currentTarget.value = '';
							}
							switchInput(phoneSetRefs[3], phoneSetRefs);
						}}
						maxLength={1}
						ref={phoneSetRefs[3]}
					/>
				</div>
			</div>

			{isSubmitted && phoneNumber.join('').length < 7 ? (
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
