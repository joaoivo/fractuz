using Fractuz.System.Errors.EndPoints;
using Fractuz.System.Errors.DataAccess;

namespace Fractuz.System.Errors.BussinesPlan;
public static class BP_Errors{

	public static List<EN_Error>? Select(IConfiguration config
		,Guid? guid=null,string? appLanguage=null,string? appMessage=null,Guid? appUserID=null,Guid? appID=null,Guid? prevErrorID=null
		,String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		int? totalRowCount=null;
		int? seachRowCount=null;
		int? searchPageCount=null;
		string? query = null;

		return (List<EN_Error>?)DA_Errors.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query , ref pageNumber , ref pageRowCount, columnsOrderBy
		,guid, appLanguage, appMessage	,appUserID,appID,prevErrorID );
	}
	public static List<EN_Error>? Select(IConfiguration config, out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query, ref int? pageNumber, ref int? pageRowCount, String? columnsOrderBy=null
		,Guid? guid=null,string? appLanguage=null,string? appMessage=null,Guid? appUserID=null,Guid? appID=null,Guid? prevErrorID=null){

		List<EN_Error>? managerUser_lst = (List<EN_Error>?)DA_Errors.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query, ref pageNumber , ref pageRowCount, columnsOrderBy
			,guid, appLanguage, appMessage,appUserID,appID,prevErrorID );
		return managerUser_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_Error ManagerUser){
		return DA_Errors.Insert(config,ManagerUser);
	}
	public static EN_Return Update(IConfiguration config,EN_Error ManagerUser){
		return DA_Errors.Update(config,ManagerUser);
	}
	public static EN_Return Delete(IConfiguration config,Guid SystemIDX){
		return DA_Errors.Delete(config,SystemIDX);
	}
}
