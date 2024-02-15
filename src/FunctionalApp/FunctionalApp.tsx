import { useState } from 'react';
import { ProfileInformation } from '../ProfileInformation';
import { FunctionalForm } from './FunctionalForm';
import { UserInformation } from '../types';

export const FunctionalApp = () => {
	const [userInfo, setUserInfo] = useState<UserInformation | null>(null);

	return (
		<>
			<h2>Functional</h2>
			<ProfileInformation userData={userInfo} />
			<FunctionalForm handleUserInfo={(userInfo) => setUserInfo(userInfo)} />
		</>
	);
};
