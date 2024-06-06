import { StrictMode } from 'react';
import { config, environment_types } from "./Constants";

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
	if (config.environment.type === environment_types.prod) {
		return StrictModeOff({children});
	} else {
		return StrictModeOn({children});
	}
}