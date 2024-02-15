import { UserInformation } from '../types';
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

export const isValidNumber = (numberSet: string): boolean => {
	return /^\d+$/.test(numberSet);
};

export const isAllValid = (userInfo: UserInformation): boolean => {
	const { firstName, lastName, email, city, phone } = userInfo;
	if (isNameValid(firstName) && isNameValid(lastName) && isEmailValid(email) && isValidCity(city) && isValidNumber(phone.split('-').join(''))) {
		return true;
	} else {
		return false;
	}
};
