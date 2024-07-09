using Fractuz.System.Errors.EndPoints;
using Fractuz.System.Errors.DataAccess;
using Fractuz.System.Defaults.EndPoint;
using Fractuz.Domain.Users.Entities;
using System.Text.Json;

namespace Fractuz.System.Errors.BussinesPlan;
public static class BP_Errors{
	public static IResult registerInnerExceptionAndTreat(IConfiguration config,
			string? appProcessDesc, Exception ex, EN_ManagerUser? user=null, HttpRequest? request = null){

		try{
			RequestData requestData = new RequestData(request);

			EN_Error error = new EN_Error{
				  AppProcessDesc=appProcessDesc
				, AppLanguage ="c#"
				, AppMessage=ex.Message
				, AppExceptionType = ex.GetType().ToString()
				, AppStackTrace = ex.StackTrace
				, PageURL = request==null?"": request.Path.Value
				, Request = JsonSerializer.Serialize(requestData)
				, AppUserID = user == null? null: user.SystemIDX
			};

			EN_Return resultIsert =Insert(config,error);

			return ApiRoutePressets.returnResults(
				new EN_Return{
					 isSuccess=false
					,isError=true
					,tittle="Erro no seguinte Processo: "+appProcessDesc
					,description=ex.Message
					,errorID = resultIsert.id
				}
				, appProcessDesc);
		}catch(Exception){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime não registrado",description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace}, appProcessDesc);
		}
	}
	public static List<EN_Error>? Select(IConfiguration config
		,Guid? guid=null,string? appProcessDesc=null,string? appLanguage=null,string? appMessage=null,Guid? appUserID=null,Guid? appID=null,Guid? prevErrorID=null,string? AppExceptionType=null
		,String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		int? totalRowCount=null;
		int? seachRowCount=null;
		int? searchPageCount=null;
		string? query = null;

		return (List<EN_Error>?)DA_Errors.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query , ref pageNumber , ref pageRowCount, columnsOrderBy
		,guid,appProcessDesc, appLanguage, appMessage	,appUserID,appID,prevErrorID,AppExceptionType );
	}
	public static List<EN_Error>? Select(IConfiguration config, out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query, ref int? pageNumber, ref int? pageRowCount, String? columnsOrderBy=null
		,Guid? guid=null,string? appProcessDesc=null,string? appLanguage=null,string? appMessage=null,Guid? appUserID=null,Guid? appID=null,Guid? prevErrorID=null,string? AppExceptionType=null){

		List<EN_Error>? error_lst = (List<EN_Error>?)DA_Errors.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query, ref pageNumber , ref pageRowCount, columnsOrderBy
			,guid,appProcessDesc, appLanguage, appMessage,appUserID,appID,prevErrorID,AppExceptionType );
		return error_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_Error error){
		return DA_Errors.Insert(config,error);
	}
	public static EN_Return Update(IConfiguration config,EN_Error error){
		return DA_Errors.Update(config,error);
	}
	public static EN_Return Delete(IConfiguration config,Guid SystemIDX){
		return DA_Errors.Delete(config,SystemIDX);
	}
}
