import { allCities } from './all-cities';

export function isEmailValid(emailAddress: string) {
	// eslint-disable-next-line no-useless-escape
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return !!emailAddress.match(regex);
}

const hasNumberOrNonAlfa = (name: string): boolean => {
	return /\d/.test(name) === false && /^[a-zA-Z0-9]+$/.test(name) === true ? false : true;
};

export const isNameValid = (name: string): boolean => {
	return hasNumberOrNonAlfa(name) == false && name.length >= 2;
};

export const isValidCity = (city: string): boolean => {
	return allCities.find((validCity) => validCity === city) === undefined ? false : true;
};
