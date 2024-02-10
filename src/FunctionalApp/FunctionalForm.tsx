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
	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const cityRef = useRef<HTMLInputElement>(null);
	const phoneNumber1Ref = useRef<HTMLInputElement>(null);
	const phoneNumber2Ref = useRef<HTMLInputElement>(null);
	const phoneNumber3Ref = useRef<HTMLInputElement>(null);
	const phoneNumber4Ref = useRef<HTMLInputElement>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const phoneNumberRefs = [phoneNumber1Ref, phoneNumber2Ref, phoneNumber3Ref, phoneNumber4Ref];

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [city, setCity] = useState('');
	const [phoneNumber, setPhoneNumber] = useState(['', '', '', '']);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				setIsSubmitted(true);
				firstNameRef.current !== null ? setFirstName(firstNameRef.current.value) : null;
				lastNameRef.current !== null ? setLastName(lastNameRef.current.value) : null;
				emailRef.current !== null ? setEmail(emailRef.current.value) : null;
				cityRef.current !== null ? setCity(cityRef.current.value) : null;
				phoneNumber1Ref.current !== null && phoneNumber2Ref.current !== null && phoneNumber3Ref.current !== null && phoneNumber4Ref.current !== null
					? setPhoneNumber([phoneNumber1Ref.current.value, phoneNumber2Ref.current.value, phoneNumber3Ref.current.value, phoneNumber4Ref.current.value])
					: null;

				if (
					firstNameRef.current !== null &&
					lastNameRef.current !== null &&
					emailRef.current !== null &&
					cityRef.current !== null &&
					phoneNumber1Ref.current !== null &&
					phoneNumber2Ref.current !== null &&
					phoneNumber3Ref.current !== null &&
					phoneNumber4Ref.current !== null
				) {
					if (
						isAllValid(firstNameRef.current.value, lastNameRef.current.value, emailRef.current.value, cityRef.current.value, [
							phoneNumber1Ref.current.value,
							phoneNumber2Ref.current.value,
							phoneNumber3Ref.current.value,
							phoneNumber4Ref.current.value,
						]) === true
					) {
						handleUserInfo({
							firstName: capitalize(firstNameRef.current.value),
							lastName: capitalize(lastNameRef.current.value),
							email: emailRef.current.value,
							city: capitalize(cityRef.current.value),
							phone: formatPhoneNumber([phoneNumber1Ref.current.value, phoneNumber2Ref.current.value, phoneNumber3Ref.current.value, phoneNumber4Ref.current.value]),
						});
						firstNameRef.current.value = '';
						lastNameRef.current.value = '';
						emailRef.current.value = '';
						cityRef.current.value = '';
						phoneNumber1Ref.current.value = '';
						phoneNumber2Ref.current.value = '';
						phoneNumber3Ref.current.value = '';
						phoneNumber4Ref.current.value = '';
					}
				}
			}}>
			<u>
				<h3>User Information Form</h3>
			</u>

			{/* first name input */}
			<div className='input-wrap'>
				<label>{'First Name'}:</label>
				<input
					ref={firstNameRef}
					placeholder='Bilbo'
				/>
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
				<input
					ref={lastNameRef}
					placeholder='Baggins'
				/>
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
				<input
					ref={emailRef}
					placeholder='bilbo-baggins@adventurehobbits.net'
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
					ref={cityRef}
					placeholder='Hobbiton'
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
						ref={phoneNumber1Ref}
						type='text'
						id='phone-input-1'
						placeholder='55'
						onChange={() => {
							switchInput(phoneNumber1Ref, phoneNumberRefs);
						}}
						maxLength={2}
					/>
					-
					<input
						ref={phoneNumber2Ref}
						type='text'
						id='phone-input-2'
						placeholder='55'
						onChange={() => {
							switchInput(phoneNumber2Ref, phoneNumberRefs);
						}}
						maxLength={2}
					/>
					-
					<input
						ref={phoneNumber3Ref}
						type='text'
						id='phone-input-3'
						placeholder='55'
						onChange={() => {
							switchInput(phoneNumber3Ref, phoneNumberRefs);
						}}
						maxLength={2}
					/>
					-
					<input
						ref={phoneNumber4Ref}
						type='text'
						id='phone-input-4'
						placeholder='5'
						onChange={() => {
							switchInput(phoneNumber4Ref, phoneNumberRefs);
						}}
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
