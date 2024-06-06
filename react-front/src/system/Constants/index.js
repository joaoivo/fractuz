/// General
export const environment_types= {
	 prod:3
	,stag:2
	,dev :1
}

/// environment config
const prod = {
	urls: {
		 PUBLIC_API_URL: "http://localhost:5096"
	}
	,environment:{
		type:environment_types.prod
	}
};
const dev = {
	urls: {
		PUBLIC_API_URL: "http://localhost:5096"
	}
	,environment:{
		type:environment_types.dev
	}
};
const staging = {
	urls: {
		PUBLIC_API_URL: "http://localhost:5096"
	}
	,environment:{
		type:environment_types.stag
	}
};

export const config = 
	process.env.NODE_ENV === "development" ? dev :
	process.env.NODE_ENV === "test" 			? staging :
	process.env.NODE_ENV === "production" 	? prod :
	null;