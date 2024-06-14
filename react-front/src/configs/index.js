import { systemConfigGeneral , environment_types } from "../system/Constants";
import { apiConfigFracuz_Dev, apiConfigFracuz_Stag, apiConfigFracuz_Prod } from "../configs/api";

export const systemConfig ={
	...systemConfigGeneral
	,environment_types: environment_types
}

switch(systemConfig.environment.type){
	case(systemConfig.environment_types.prod):{
		systemConfig["urls"] = apiConfigFracuz_Prod;
		break;
	}
	case(systemConfig.environment_types.stag):{
		systemConfig["urls"] = apiConfigFracuz_Stag;
		break;
	}
	default:{
		systemConfig["urls"] = apiConfigFracuz_Dev;
		break;
	}
}