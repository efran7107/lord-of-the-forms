import { Component } from 'react';
import { ClassForm } from './ClassForm';
import { UserInformation } from '../types';
import { ProfileInformation } from '../ProfileInformation';
import { defaultInformation } from '../ts-functions/defaultInformation';
type State = { userInformation: UserInformation | null };

const defaultUser = defaultInformation;

export class ClassApp extends Component<Record<string, never>, State> {
	render() {
		return (
			<>
				<h2>Class</h2>
				<ProfileInformation
					userData={
						// toggle the following lines to change
						// null
						defaultUser
					}
				/>
				<ClassForm />
			</>
		);
	}
}
