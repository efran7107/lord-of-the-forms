import { allCities } from './all-cities';
import { capitalize } from './transformations';

export function isEmailValid(emailAddress: string) {
	// eslint-disable-next-line no-useless-escape
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return !!emailAddress?.match(regex);
}

const hasNumberOrNonAlfa = (name: string): boolean => {
	return /\d/.test(name) === false && /^[a-zA-Z0-9]+$/.test(name) === true ? false : true;
};

export const isNameValid = (name: string): boolean => {
	return hasNumberOrNonAlfa(name) === false && name.length >= 2;
};

export const isValidCity = (city: string): boolean => {
	return allCities.find((validCity) => validCity === capitalize(city)) === undefined ? false : true;
};

export const isValidPhoneNumber = (phoneArr: Array<string>): boolean => {
	return /^\d+$/.test(phoneArr.join(''));
};

export const isAllValid = (firstName: string, lastName: string, email: string, city: string, phone: Array<string>): boolean => {
	return isNameValid(firstName) === true && isNameValid(lastName) === true && isEmailValid(email) === true && isValidCity(city) === true && isValidPhoneNumber(phone);
};
