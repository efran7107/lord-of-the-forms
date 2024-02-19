import { useRef } from 'react';
import { FunctionalTextInput } from './FunctionalTextInput';
import { makeRef } from '../ts-functions/functions';

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
				<div id='phone-input-wrap'>
					{phoneRefArr.map((ref) => (
						<input
							type='text'
							placeholder={makeRef(phoneRefArrLen[phoneRefArr.indexOf(ref)])}
							id={`phone-input-${phoneRefArr.indexOf(ref) + 1}`}
							maxLength={phoneRefArrLen[phoneRefArr.indexOf(ref)]}
							ref={ref}
							value={phoneArr[phoneRefArr.indexOf(ref)]}
						/>
					))}
				</div>
			</div>
		</>
	);
};
