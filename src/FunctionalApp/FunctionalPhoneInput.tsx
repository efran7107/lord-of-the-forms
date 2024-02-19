import { useRef } from 'react';
import { ErrorMessage } from '../ErrorMessage';

export const FunctionalPhoneInput = ({
	label,
	handlePhoneArr,
	phoneArr,
	error,
	submitted,
}: {
	handlePhoneArr: (phoneArr: string[]) => void;
	phoneArr: string[];
	error: string;
	submitted: boolean;
	label: string;
}) => {
	console.log(phoneArr);

	const phoneRefArr = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
	const phoneRefArrLen = [2, 2, 2, 1];

	return (
		<>
			<div className='input-wrap'>
				<label htmlFor='phone'>{label}:</label>
				<div id='phone-input-wrap'></div>
			</div>
			<ErrorMessage
				message={error}
				show={submitted && phoneArr.join('').length < 7}
			/>
		</>
	);
};
