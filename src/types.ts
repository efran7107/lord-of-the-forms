import { ComponentProps } from 'react';

export type UserInformation = {
	firstName: string;
	lastName: string;
	email: string;
	city: string;
	phone: string;
};

export type TextInputProps = ComponentProps<'input'>;
