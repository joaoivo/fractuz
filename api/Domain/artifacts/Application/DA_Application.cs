using System.Data;
using Dapper;
using Fractuz.Domain.Applications.Entities;
using Microsoft.Data.SqlClient;

namespace Fractuz.Domain.Applications.DataAccess;
public static class DA_Application{
	public static IEnumerable<EN_Application> Select(IConfiguration config, out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query, ref int? pageNumber, ref int? pageRowCount, String? columnsOrderBy=null
		,Guid? guid=null,string? name=null){

		IEnumerable<EN_Application> route_lst = new List<EN_Application>();
		DynamicParameters parameters = new DynamicParameters();
		parameters.Add("@pGuid"					, guid				, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pName"					, name				, DbType.String	, ParameterDirection.Input,200);

		parameters.Add("@pColumnsOrderBy"	, columnsOrderBy	, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pPageNumber"			, pageNumber		, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@pPageRowCount"		, pageRowCount		, DbType.Int32		, ParameterDirection.Output);

		parameters.Add("@rTotalRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rSeachRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@pSearchPageCount"	, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rQuery"				, null				, DbType.String	, ParameterDirection.Output,4000);

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			route_lst = db.Query<EN_Application>("[dbo].[pr_Applications_sel]",parameters);
		}

		pageNumber =0;
		pageRowCount=0;
		totalRowCount=0;
		seachRowCount=0;
		searchPageCount=0;
		query="";
		return route_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_Application Application){
		IEnumerable<EN_Application> route_lst = new List<EN_Application>();
		DynamicParameters parameters = new DynamicParameters();

		Application.SystemActive= Application.SystemActive==null?true:Application.SystemActive;

		parameters.Add("@pName"						, Application.Name					, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pDescription"			, Application.Description			, DbType.String	, ParameterDirection.Input,150);

		parameters.Add("@pSystemActive"			, Application.SystemActive			, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pSystemCreationUser"	, Application.SystemCreationUser	, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rGuid"						, null									, DbType.Guid		, ParameterDirection.Output);
		parameters.Add("@rIsOK"						, null									, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null									, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null									, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null									, DbType.Int32		, ParameterDirection.Output);

		EN_Return route_return = new EN_Return();
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_Applications_ins]",parameters);
			route_return.id = parameters.Get<Guid?>("@rGuid");
			route_return.description = parameters.Get<string>("@rProcessMessage");

			route_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Inserção efetuada com sucesso":"Erro na tentativa de inserção");
			route_return.code= parameters.Get<int>("@rProcessCode");
		}
		return route_return;
	}

	public static EN_Return Update(IConfiguration config,EN_Application Application){
		IEnumerable<EN_Application> route_lst = new List<EN_Application>();
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@rGuid"						, Application.SystemIDX					, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pName"						, Application.Name						, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pDescription"			, Application.Description				, DbType.String	, ParameterDirection.Input,150);

		parameters.Add("@pSystemActive"			, Application.SystemActive				, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pSystemLastUpdateUser", Application.SystemLastUpdateUser	, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		EN_Return route_return = new EN_Return();
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_Applications_upd]",parameters);
			route_return.description = parameters.Get<string>("@rProcessMessage");

			route_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Atualização efetuada com sucesso":"Erro na tentativa de atualização");
			route_return.code= parameters.Get<int>("@rProcessCode");
		}
		return route_return;
	}

	public static EN_Return Delete(IConfiguration config,Guid SystemIDX){
		IEnumerable<EN_Application> route_lst = new List<EN_Application>();
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@rGuid"						, SystemIDX									, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		EN_Return route_return = new EN_Return();
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_Applications_del]",parameters);
			route_return.description = parameters.Get<string>("@rProcessMessage");

			route_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Exclusão efetuada com sucesso":"Erro na tentativa de Exclusão");
			route_return.code= parameters.Get<int>("@rProcessCode");
		}
		return route_return;
	}
}
