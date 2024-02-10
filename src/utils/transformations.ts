export const capitalize = (name: string) => {
	return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const formatPhoneNumber = (phoneNumber: Array<string>): string => {
	return phoneNumber.join('-');
};
