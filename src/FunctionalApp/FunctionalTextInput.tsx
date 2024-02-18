import { ErrorMessage } from '../ErrorMessage';
import { TextInputProps } from '../types';
import { isEmailValid, isValidCity } from '../utils/validations';

export const FunctionalTextInput = ({ inputProps, label, errorMessage, submitted }: { inputProps: TextInputProps; label: string; errorMessage: string; submitted: boolean }) => {
	const { value } = inputProps;
	const strVal = value?.toString();
	return (
		<>
			<div className='input-wrap'>
				<label htmlFor=''>{label}</label>
				<input
					type='text'
					{...inputProps}
				/>
			</div>
			<ErrorMessage
				message={errorMessage}
				show={
					submitted &&
					(((label === 'First Name' || label === 'Last Name') && (strVal ? strVal.length < 2 : true)) ||
						(label === 'Email' && (strVal ? (isEmailValid(strVal) === false ? true : false) : true)) ||
						(label === 'City' && (strVal ? (isValidCity(strVal) === false ? true : false) : true)))
				}
			/>
		</>
	);
};
