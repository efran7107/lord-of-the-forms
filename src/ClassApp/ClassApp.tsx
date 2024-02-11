import { Component } from 'react';
import { ClassForm } from './ClassForm';
import { UserInformation } from '../types';
import { ProfileInformation } from '../ProfileInformation';
import { defaultInformation } from '../ts-functions/defaultInformation';
type State = { userInformation: UserInformation | null };

export class ClassApp extends Component<Record<string, never>, State> {
	state: State = {
		userInformation: defaultInformation,
	};
	render() {
		const { userInformation } = this.state;
		return (
			<>
				<h2>Class</h2>
				<ProfileInformation userData={userInformation} />
				<ClassForm />
			</>
		);
	}
}
