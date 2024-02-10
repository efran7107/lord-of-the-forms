import { RefObject } from 'react';

export const switchInput = (phoneRef: RefObject<HTMLInputElement>, refArr: RefObject<HTMLInputElement>[]) => {
	if (phoneRef.current?.value.length === phoneRef.current?.maxLength && refArr.indexOf(phoneRef) < refArr.length - 1) {
		refArr[refArr.indexOf(phoneRef) + 1].current?.focus();
	} else if (phoneRef.current?.value.length === 0 && refArr.indexOf(phoneRef) > 0) {
		refArr[refArr.indexOf(phoneRef) - 1].current?.focus();
	}
};

export const addToState = (phoneRef: RefObject<HTMLInputElement>): boolean => {
	return phoneRef.current?.value.length === phoneRef.current?.maxLength;
};
