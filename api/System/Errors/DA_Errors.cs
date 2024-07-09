using Fractuz.System.Errors.EndPoints;
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Fractuz.System.Errors.DataAccess;

public static class DA_Errors{
	public static IEnumerable<EN_Error> Select(IConfiguration config, out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query, ref int? pageNumber, ref int? pageRowCount, String? columnsOrderBy=null
		,Guid? guid=null,string? appProcessDesc=null,string? appLanguage=null,string? appMessage=null,Guid? appUserID=null,Guid? appID=null,Guid? prevErrorID=null
		,string? AppExceptionType =null){

		IEnumerable<EN_Error> managerUser_lst = new List<EN_Error>();
		DynamicParameters parameters = new DynamicParameters();
		parameters.Add("@pGuid"					, guid				, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pAppProcessDesc"	, appProcessDesc	, DbType.String	, ParameterDirection.Input,200);
		parameters.Add("@pAppExceptionType"	, AppExceptionType, DbType.String	, ParameterDirection.Input,100);
		parameters.Add("@pAppLanguage"		, appLanguage		, DbType.String	, ParameterDirection.Input,10);
		parameters.Add("@pAppMessage"			, appMessage		, DbType.String	, ParameterDirection.Input,400);

		parameters.Add("@pAppUserID"			, appUserID			, DbType.Guid	, ParameterDirection.Input);
		parameters.Add("@pAppID"				, appID				, DbType.Guid	, ParameterDirection.Input);
		parameters.Add("@pPrevErrorID"		, prevErrorID		, DbType.Guid	, ParameterDirection.Input);

		parameters.Add("@pColumnsOrderBy"	, columnsOrderBy	, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pPageNumber"			, pageNumber		, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@pPageRowCount"		, pageRowCount		, DbType.Int32		, ParameterDirection.Output);

		parameters.Add("@rTotalRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rSeachRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@pSearchPageCount"	, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rQuery"				, null				, DbType.String	, ParameterDirection.Output,4000);

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			managerUser_lst = db.Query<EN_Error>("[dbo].[pr_SystemErrors_sel]",parameters);
		}

		pageNumber =0;
		pageRowCount=0;
		totalRowCount=0;
		seachRowCount=0;
		searchPageCount=0;
		query="";
		return managerUser_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_Error error){
		EN_Return managerUser_return = new EN_Return();
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@pAppLanguage"		, error.AppLanguage		, DbType.String	, ParameterDirection.Input,10);
		parameters.Add("@pAppProcessDesc"	, error.AppProcessDesc	, DbType.String	, ParameterDirection.Input,200);
		parameters.Add("@pAppExceptionType"	, error.AppExceptionType, DbType.String	, ParameterDirection.Input,100);
		parameters.Add("@pAppMessage"			, error.AppMessage		, DbType.String	, ParameterDirection.Input,400);
		parameters.Add("@pAppStackTrace"		, error.AppStackTrace	, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pRequest"				, error.Request			, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pSystemCreationDt"	, error.SystemCreationDt, DbType.DateTime	, ParameterDirection.Input);

		parameters.Add("@pAppUserID"			, error.AppUserID			, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pAppID"				, error.AppID				, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pPrevErrorID"		, error.PrevErrorID		, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@pPageURL"				, error.PageURL			, DbType.String	, ParameterDirection.Input,200);
		parameters.Add("@pExtraData"			, error.ExtraData			, DbType.String	, ParameterDirection.Input,4000);

		parameters.Add("@rGuid"						, null									, DbType.Guid		, ParameterDirection.Output);
		parameters.Add("@rIsOK"						, null									, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null									, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null									, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null									, DbType.Int32		, ParameterDirection.Output);

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_SystemErrors_ins]",parameters);
			managerUser_return.id = parameters.Get<Guid?>("@rGuid");
			managerUser_return.description = parameters.Get<string>("@rProcessMessage");

			managerUser_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Inserção efetuada com sucesso":"Erro na tentativa de inserção");
		}
		return managerUser_return;
	}


	public static EN_Return Update(IConfiguration config,EN_Error error){
		EN_Return managerUser_return = new EN_Return();
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@pGuid"					, error.SystemIDX			, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pAppProcessDesc"	, error.AppProcessDesc	, DbType.String	, ParameterDirection.Input,200);
		parameters.Add("@pAppExceptionType"	, error.AppExceptionType, DbType.String	, ParameterDirection.Input,100);
		parameters.Add("@pAppLanguage"		, error.AppLanguage		, DbType.String	, ParameterDirection.Input,10);
		parameters.Add("@pAppMessage"			, error.AppMessage		, DbType.String	, ParameterDirection.Input,400);
		parameters.Add("@pAppStackTrace"		, error.AppStackTrace	, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pRequest"				, error.Request			, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pSystemCreationDt"	, error.SystemCreationDt, DbType.DateTime	, ParameterDirection.Input);

		parameters.Add("@pAppUserID"			, error.AppUserID			, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pAppID"				, error.AppID				, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pPrevErrorID"		, error.PrevErrorID		, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@pPageURL"				, error.PageURL			, DbType.String	, ParameterDirection.Input,200);
		parameters.Add("@pExtraData"			, error.ExtraData			, DbType.String	, ParameterDirection.Input,4000);

		parameters.Add("@rGuid"						, null									, DbType.Guid		, ParameterDirection.Output);
		parameters.Add("@rIsOK"						, null									, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null									, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null									, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null									, DbType.Int32		, ParameterDirection.Output);

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_SystemErrors_ins]",parameters);
			managerUser_return.id = parameters.Get<Guid?>("@rGuid");
			managerUser_return.description = parameters.Get<string>("@rProcessMessage");

			managerUser_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Inserção efetuada com sucesso":"Erro na tentativa de inserção");
		}
		return managerUser_return;
	}

	public static EN_Return Delete(IConfiguration config,Guid SystemIDX){
		DynamicParameters parameters = new DynamicParameters();
		EN_Return managerUser_return = new EN_Return();

		parameters.Add("@rGuid"						, SystemIDX							, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null								, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null								, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null								, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null								, DbType.Int32		, ParameterDirection.Output);

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_SystemErrors_del]",parameters);
			managerUser_return.description = parameters.Get<string>("@rProcessMessage");

			managerUser_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Exclusão efetuada com sucesso":"Erro na tentativa de Exclusão");
		}
		return managerUser_return;
	}
}
