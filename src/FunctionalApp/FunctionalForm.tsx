import { MutableRefObject, useRef, useState } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { UserInformation } from '../types';
import { capitalize } from '../utils/transformations';
import { isEmailValid, isNameValid } from '../utils/validations';

const firstNameErrorMessage =
	'First name must be at least 2 characters long';
const lastNameErrorMessage =
	'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

type THandleUserInfo = {
	handleUserInfo: (userInfo: UserInformation) => void;
};

export const FunctionalForm = (handleUserInfo: THandleUserInfo) => {
	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const cityRef = useRef<HTMLInputElement>(null);
	const phoneNumber1Ref = useRef<HTMLInputElement>(null);
	const phoneNumber2Ref = useRef<HTMLInputElement>(null);
	const phoneNumber3Ref = useRef<HTMLInputElement>(null);
	const phoneNumber4Ref = useRef<HTMLInputElement>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	
	
	
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				firstNameRef.current !== null ? capitalize(firstNameRef.current.value) : null
				firstNameRef.current !== null ? console.log(isNameValid(capitalize(firstNameRef.current.value))) : null
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
			{isSubmitted ? (
				<ErrorMessage
				message={firstNameErrorMessage}
				show={true}
			/>
			) : (null)}
			

			{/* last name input */}
			<div className='input-wrap'>
				<label>{'Last Name'}:</label>
				<input
					ref={lastNameRef}
					placeholder='Baggins'
				/>
			</div>
			{isSubmitted ? (
				<ErrorMessage
				message={lastNameErrorMessage}
				show={true}
			/>
			) : (null)}
			

			{/* Email Input */}
			<div className='input-wrap'>
				<label>{'Email'}:</label>
				<input
					ref={emailRef}
					placeholder='bilbo-baggins@adventurehobbits.net'
				/>
			</div>
			{isSubmitted && !isEmailValid(emailRef.current!.value) ? (
				<ErrorMessage
				message={emailErrorMessage}
				show={true}
				/>
			) : (null)}
			

			{/* City Input */}
			<div className='input-wrap'>
				<label>{'City'}:</label>
				<input
					ref={cityRef}
					placeholder='Hobbiton'
				/>
			</div>
			{isSubmitted ? (
				<ErrorMessage
				message={cityErrorMessage}
				show={true}
				/>
			) : (null)}
			

			<div className='input-wrap'>
				<label htmlFor='phone'>Phone:</label>
				<div id='phone-input-wrap'>
					<input
						ref={phoneNumber1Ref}
						type='text'
						id='phone-input-1'
						placeholder='55'
					/>
					-
					<input
						ref={phoneNumber2Ref}
						type='text'
						id='phone-input-2'
						placeholder='55'
					/>
					-
					<input
						ref={phoneNumber3Ref}
						type='text'
						id='phone-input-3'
						placeholder='55'
					/>
					-
					<input
						ref={phoneNumber4Ref}
						type='text'
						id='phone-input-4'
						placeholder='5'
					/>
				</div>
			</div>

			{isSubmitted ? (
				<ErrorMessage
				message={phoneNumberErrorMessage}
				show={true}
			/>
			) : (null)}
			

			<input
				type='submit'
				value='Submit'
			/>
		</form>
	);
};
