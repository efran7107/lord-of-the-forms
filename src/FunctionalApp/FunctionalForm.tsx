import { useRef, useState } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { UserInformation } from '../types';

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
	const firstNameRef = useRef(null);
	const lastNameRef = useRef(null);
	const emailRef = useRef(null);
	const cityRef = useRef(null);
	const phoneNumber1Ref = useRef(null);
	const phoneNumber2Ref = useRef(null);
	const phoneNumber3Ref = useRef(null);
	const phoneNumber4Ref = useRef(null);
	const [isSubmitted, setIsSubmitted] = useState(false);

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
				<input
					ref={firstNameRef}
					placeholder='Bilbo'
				/>
			</div>
			<ErrorMessage
				message={firstNameErrorMessage}
				show={true}
			/>

			{/* last name input */}
			<div className='input-wrap'>
				<label>{'Last Name'}:</label>
				<input
					ref={lastNameRef}
					placeholder='Baggins'
				/>
			</div>
			<ErrorMessage
				message={lastNameErrorMessage}
				show={true}
			/>

			{/* Email Input */}
			<div className='input-wrap'>
				<label>{'Email'}:</label>
				<input
					ref={emailRef}
					placeholder='bilbo-baggins@adventurehobbits.net'
				/>
			</div>
			<ErrorMessage
				message={emailErrorMessage}
				show={true}
			/>

			{/* City Input */}
			<div className='input-wrap'>
				<label>{'City'}:</label>
				<input
					ref={cityRef}
					placeholder='Hobbiton'
				/>
			</div>
			<ErrorMessage
				message={cityErrorMessage}
				show={true}
			/>

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

			<ErrorMessage
				message={phoneNumberErrorMessage}
				show={true}
			/>

			<input
				type='submit'
				value='Submit'
			/>
		</form>
	);
};
