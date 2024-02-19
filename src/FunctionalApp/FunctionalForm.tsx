import { useRef, useState } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { UserInformation } from '../types';
import { isAllValid, isValidNumber } from '../utils/validations';
import { capitalize, formatPhoneNumber } from '../utils/transformations';
import { setArray, switchInput } from '../ts-functions/functions';
import { FunctionalTextInput } from './FunctionalTextInput';
import { FunctionalPhoneInput } from './FunctionalPhoneInput';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

type THandleUserInfo = {
	handleUserInfo: (userInfo: UserInformation) => void;
};

export const FunctionalForm = ({ handleUserInfo }: THandleUserInfo) => {
	// const cities = allCities.join('\n');
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
				const allInfo: UserInformation = { firstName: capitalize(firstName), lastName: capitalize(lastName), email: email, city: capitalize(city), phone: formatPhoneNumber(phoneNumber) };
				if (isAllValid(allInfo)) {
					handleUserInfo(allInfo);
					setFirstName('');
					setLastName('');
					setEmail('');
					setCity('');
					setPhoneNumber(['', '', '', '']);
					setIsSubmitted(false);
				} else {
					alert('bad data input');
				}
			}}>
			<u>
				<h3>User Information Form</h3>
			</u>

			{/* first name input */}
			<FunctionalTextInput
				label='First Name'
				inputProps={{
					placeholder: 'Bilbo',
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
				label='Last Name'
				inputProps={{
					placeholder: 'Baggins',
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
				label='Email'
				inputProps={{
					placeholder: 'bilbo-baggins@adventurehobbits.net',
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
				label='City'
				inputProps={{
					placeholder: 'Hobbiton',
					list: 'cities',
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
				label='Phone'
			/>

			{/* <div className='input-wrap'>
				<label htmlFor='phone'>Phone:</label>
				<div id='phone-input-wrap'>
					<input
						type='text'
						id='phone-input-1'
						placeholder='55'
						onChange={(e) => {
							if (isValidNumber(e.currentTarget.value) || isValidNumber(phoneNumber[0])) {
								setPhoneNumber([...setArray(phoneNumber, e.currentTarget.value, 0)]);
							} else {
								if (e.currentTarget.value === '') e.currentTarget.value;
								else e.currentTarget.value = phoneNumber[0];
							}
							switchInput(phoneSetRefs[0], phoneSetRefs);
						}}
						maxLength={2}
						ref={phoneSetRefs[0]}
						value={phoneNumber[0]}
					/>
					-
					<input
						type='text'
						id='phone-input-2'
						placeholder='55'
						onChange={(e) => {
							if (isValidNumber(e.currentTarget.value) || isValidNumber(phoneNumber[1])) {
								setPhoneNumber([...setArray(phoneNumber, e.currentTarget.value, 1)]);
							} else {
								if (e.currentTarget.value === '') e.currentTarget.value;
								else e.currentTarget.value = phoneNumber[1];
							}
							switchInput(phoneSetRefs[1], phoneSetRefs);
						}}
						maxLength={2}
						ref={phoneSetRefs[1]}
						value={phoneNumber[1]}
					/>
					-
					<input
						type='text'
						id='phone-input-3'
						placeholder='55'
						onChange={(e) => {
							if (isValidNumber(e.currentTarget.value) || isValidNumber(phoneNumber[2])) {
								setPhoneNumber([...setArray(phoneNumber, e.currentTarget.value, 2)]);
							} else {
								if (e.currentTarget.value === '') e.currentTarget.value;
								else e.currentTarget.value = phoneNumber[2];
							}
							switchInput(phoneSetRefs[2], phoneSetRefs);
						}}
						maxLength={2}
						ref={phoneSetRefs[2]}
						value={phoneNumber[2]}
					/>
					-
					<input
						type='text'
						id='phone-input-4'
						placeholder='5'
						onChange={(e) => {
							if (isValidNumber(e.currentTarget.value) || isValidNumber(phoneNumber[3])) {
								setPhoneNumber([...setArray(phoneNumber, e.currentTarget.value, 3)]);
							} else {
								if (e.currentTarget.value === '') e.currentTarget.value;
								else e.currentTarget.value = phoneNumber[3];
							}
							switchInput(phoneSetRefs[3], phoneSetRefs);
						}}
						maxLength={1}
						ref={phoneSetRefs[3]}
						value={phoneNumber[3]}
					/>
				</div>
			</div>

			{isSubmitted && phoneNumber.join('').length < 7 ? (
				<ErrorMessage
					message={phoneNumberErrorMessage}
					show={true}
				/>
			) : null} */}

			<input
				type='submit'
				value='Submit'
			/>
		</form>
	);
};
