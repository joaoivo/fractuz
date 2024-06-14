import { StrictMode } from 'react';
import { systemConfig } from '../configs';

function StrictModeOn({children}) {
	return (
		<StrictMode>
			{children}
		</StrictMode>
	)
}
function StrictModeOff({children}) {
	return (
		{children}
	)
}

export const DevEnvAssist = ({children}) =>{
	if (systemConfig.environment.type === systemConfig.environment_types.prod) {
		return StrictModeOff({children});
	} else {
		return StrictModeOn({children});
	}
}