using System.Data;
using Dapper;
using Fractuz.Domain.AppDbTable.Entities;
using Microsoft.Data.SqlClient;

namespace Fractuz.Domain.AppDbTable.DataAccess;
public static class DA_AppDbTable{
	public static IEnumerable<EN_AppDbTable> Select(IConfiguration config, out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query, ref int? pageNumber, ref int? pageRowCount, String? columnsOrderBy=null
		,Guid? guid=null,string? particName=null,string? particMail=null
		,Boolean? isAdm =null){

		IEnumerable<EN_AppDbTable> route_lst = new List<EN_AppDbTable>();
		DynamicParameters parameters = new DynamicParameters();
		parameters.Add("@pGuid"					, guid				, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pParticName"			, particName		, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pParticMail"			, particMail		, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pIsAdm"				, isAdm				, DbType.Boolean	, ParameterDirection.Input);

		parameters.Add("@pColumnsOrderBy"	, columnsOrderBy	, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pPageNumber"			, pageNumber		, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@pPageRowCount"		, pageRowCount		, DbType.Int32		, ParameterDirection.Output);

		parameters.Add("@rTotalRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rSeachRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@pSearchPageCount"	, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rQuery"				, null				, DbType.String	, ParameterDirection.Output,4000);

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			route_lst = db.Query<EN_AppDbTable>("[dbo].[pr_AppDbTables_sel]",parameters);
		}

		pageNumber =0;
		pageRowCount=0;
		totalRowCount=0;
		seachRowCount=0;
		searchPageCount=0;
		query="";
		return route_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_AppDbTable AppDbTable){
		IEnumerable<EN_AppDbTable> route_lst = new List<EN_AppDbTable>();
		DynamicParameters parameters = new DynamicParameters();

		AppDbTable.SystemActive= AppDbTable.SystemActive==null?true:AppDbTable.SystemActive;

/*
		parameters.Add("@pParticName"				, AppDbTable.ParticName			, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pParticMail"				, AppDbTable.ParticMail			, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pParticPass"				, AppDbTable.ParticPass			, DbType.String	, ParameterDirection.Input,300);
		parameters.Add("@pIsAdm"					, AppDbTable.IsAdm					, DbType.Boolean	, ParameterDirection.Input);
*/
		parameters.Add("@pSystemActive"			, AppDbTable.SystemActive			, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pSystemCreationUser"	, AppDbTable.SystemCreationUser	, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rGuid"						, null									, DbType.Guid		, ParameterDirection.Output);
		parameters.Add("@rIsOK"						, null									, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null									, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null									, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null									, DbType.Int32		, ParameterDirection.Output);

		EN_Return route_return = new EN_Return();
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_AppDbTables_ins]",parameters);
			route_return.id = parameters.Get<Guid?>("@rGuid");
			route_return.description = parameters.Get<string>("@rProcessMessage");

			route_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Inserção efetuada com sucesso":"Erro na tentativa de inserção");
			route_return.code= parameters.Get<int>("@rProcessCode");
		}
		return route_return;
	}

	public static EN_Return Update(IConfiguration config,EN_AppDbTable AppDbTable){
		IEnumerable<EN_AppDbTable> route_lst = new List<EN_AppDbTable>();
		DynamicParameters parameters = new DynamicParameters();
/*
		parameters.Add("@rGuid"						, AppDbTable.SystemIDX					, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pParticName"				, AppDbTable.ParticName				, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pParticMail"				, AppDbTable.ParticMail				, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pParticPass"				, AppDbTable.ParticPass				, DbType.String	, ParameterDirection.Input,300);
		parameters.Add("@pIsAdm"					, AppDbTable.IsAdm						, DbType.Boolean	, ParameterDirection.Input);
*/
		parameters.Add("@pSystemActive"			, AppDbTable.SystemActive				, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pSystemLastUpdateUser", AppDbTable.SystemLastUpdateUser	, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		EN_Return route_return = new EN_Return();
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_AppDbTables_upd]",parameters);
			route_return.description = parameters.Get<string>("@rProcessMessage");

			route_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Atualização efetuada com sucesso":"Erro na tentativa de atualização");
			route_return.code= parameters.Get<int>("@rProcessCode");
		}
		return route_return;
	}

	public static EN_Return Delete(IConfiguration config,Guid SystemIDX){
		IEnumerable<EN_AppDbTable> route_lst = new List<EN_AppDbTable>();
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@rGuid"						, SystemIDX									, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		EN_Return route_return = new EN_Return();
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_AppDbTables_del]",parameters);
			route_return.description = parameters.Get<string>("@rProcessMessage");

			route_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Exclusão efetuada com sucesso":"Erro na tentativa de Exclusão");
			route_return.code= parameters.Get<int>("@rProcessCode");
		}
		return route_return;
	}
}
