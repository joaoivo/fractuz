using System.Data;
using Dapper;
using Fractuz.Domain.AppDataBase.Entities;
using Microsoft.Data.SqlClient;

namespace Fractuz.Domain.AppDataBase.DataAccess;
public static class DA_AppDataBase{
	public static IEnumerable<EN_AppDataBase> Select(IConfiguration config, out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query, ref int? pageNumber, ref int? pageRowCount, String? columnsOrderBy=null
		,Guid? guid=null,Guid? application=null,string? databaseName=null	,int? buildOrder =null){

		IEnumerable<EN_AppDataBase> appDataBase_lst = new List<EN_AppDataBase>();
		DynamicParameters parameters = new DynamicParameters();
		parameters.Add("@pGuid"					, guid				, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pApplication"		, application		, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pDatabaseName"		, databaseName		, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pBuildOrder"			, buildOrder		, DbType.Int32		, ParameterDirection.Input);

		parameters.Add("@pColumnsOrderBy"	, columnsOrderBy	, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pPageNumber"			, pageNumber		, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@pPageRowCount"		, pageRowCount		, DbType.Int32		, ParameterDirection.Output);

		parameters.Add("@rTotalRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rSeachRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@pSearchPageCount"	, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rQuery"				, null				, DbType.String	, ParameterDirection.Output,4000);

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			appDataBase_lst = db.Query<EN_AppDataBase>("[dbo].[pr_AppDataBases_sel]",parameters);
		}

		pageNumber =0;
		pageRowCount=0;
		totalRowCount=0;
		seachRowCount=0;
		searchPageCount=0;
		query="";
		return appDataBase_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_AppDataBase AppDataBase){
		IEnumerable<EN_AppDataBase> appDataBase_lst = new List<EN_AppDataBase>();
		DynamicParameters parameters = new DynamicParameters();

		AppDataBase.SystemActive= AppDataBase.SystemActive==null?true:AppDataBase.SystemActive;

		parameters.Add("@pApplication"			, AppDataBase.Application			, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pDatabaseName"			, AppDataBase.DatabaseName			, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pBuildOrder"				, AppDataBase.BuildOrder			, DbType.Int32		, ParameterDirection.Input);

		parameters.Add("@pSystemActive"			, AppDataBase.SystemActive			, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pSystemCreationUser"	, AppDataBase.SystemCreationUser	, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rGuid"						, null									, DbType.Guid		, ParameterDirection.Output);
		parameters.Add("@rIsOK"						, null									, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null									, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null									, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null									, DbType.Int32		, ParameterDirection.Output);

		EN_Return appDataBase_return = new EN_Return();
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_AppDataBases_ins]",parameters);
			appDataBase_return.id = parameters.Get<Guid?>("@rGuid");
			appDataBase_return.description = parameters.Get<string>("@rProcessMessage");

			appDataBase_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Inserção efetuada com sucesso":"Erro na tentativa de inserção");
			appDataBase_return.code= parameters.Get<int>("@rProcessCode");
		}
		return appDataBase_return;
	}

	public static EN_Return Update(IConfiguration config,EN_AppDataBase AppDataBase){
		IEnumerable<EN_AppDataBase> appDataBase_lst = new List<EN_AppDataBase>();
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@rGuid"						, AppDataBase.SystemIDX					, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pApplication"			, AppDataBase.Application				, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pDatabaseName"			, AppDataBase.DatabaseName				, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pBuildOrder"				, AppDataBase.BuildOrder				, DbType.Int32		, ParameterDirection.Input);

		parameters.Add("@pSystemActive"			, AppDataBase.SystemActive				, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pSystemLastUpdateUser", AppDataBase.SystemLastUpdateUser	, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		EN_Return appDataBase_return = new EN_Return();
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_AppDataBases_upd]",parameters);
			appDataBase_return.description = parameters.Get<string>("@rProcessMessage");

			appDataBase_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Atualização efetuada com sucesso":"Erro na tentativa de atualização");
			appDataBase_return.code= parameters.Get<int>("@rProcessCode");
		}
		return appDataBase_return;
	}

	public static EN_Return Delete(IConfiguration config,Guid SystemIDX){
		IEnumerable<EN_AppDataBase> appDataBase_lst = new List<EN_AppDataBase>();
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@rGuid"						, SystemIDX									, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		EN_Return appDataBase_return = new EN_Return();
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_AppDataBases_del]",parameters);
			appDataBase_return.description = parameters.Get<string>("@rProcessMessage");

			appDataBase_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Exclusão efetuada com sucesso":"Erro na tentativa de Exclusão");
			appDataBase_return.code= parameters.Get<int>("@rProcessCode");
		}
		return appDataBase_return;
	}
}
