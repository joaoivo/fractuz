using System.Data;
using Dapper;
using Fractuz.Domain.AppDbTables.Entities;
using Fractuz.Domain.Users.Entities;
using Microsoft.Data.SqlClient;

namespace Fractuz.Domain.AppDbTables.DataAccess;
public static class DA_AppDbTable{
	public static IEnumerable<EN_AppDbTable> Select(IConfiguration config, out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query, ref int? pageNumber, ref int? pageRowCount, String? columnsOrderBy=null
		,Guid? guid=null,Guid? tableDatabase=null,string? tableName=null
		,Boolean? isAdm =null){

		IEnumerable<EN_AppDbTable> appDbTable_lst = new List<EN_AppDbTable>();
		DynamicParameters parameters = new DynamicParameters();
		parameters.Add("@pGuid"					, guid				, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pTableDatabase"		, tableDatabase	, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pTableName"			, tableName			, DbType.String	, ParameterDirection.Input,050);

		parameters.Add("@pColumnsOrderBy"	, columnsOrderBy	, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pPageNumber"			, pageNumber		, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@pPageRowCount"		, pageRowCount		, DbType.Int32		, ParameterDirection.Output);

		parameters.Add("@rTotalRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rSeachRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@pSearchPageCount"	, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rQuery"				, null				, DbType.String	, ParameterDirection.Output,4000);

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			appDbTable_lst = db.Query<EN_AppDbTable>("[dbo].[pr_AppDbTables_sel]",parameters);
		}

		pageNumber =0;
		pageRowCount=0;
		totalRowCount=0;
		seachRowCount=0;
		searchPageCount=0;
		query="";
		return appDbTable_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_AppDbTable AppDbTable,EN_ManagerUser userAuthor){
		EN_Return appDbTable_return = new EN_Return();
		IEnumerable<EN_AppDbTable> appDbTable_lst = new List<EN_AppDbTable>();
		DynamicParameters parameters = new DynamicParameters();

		AppDbTable.SystemActive= AppDbTable.SystemActive==null?true:AppDbTable.SystemActive;

		parameters.Add("@pTableDatabase"			, AppDbTable.TableDatabase			, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pTableBuiltOrder"		, AppDbTable.TableBuiltOrder		, DbType.Int32		, ParameterDirection.Input);
		parameters.Add("@pTableName"				, AppDbTable.TableName				, DbType.String	, ParameterDirection.Input,050);
		parameters.Add("@pTableDescription"		, AppDbTable.TableDescription		, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pFieldPrefix"			, AppDbTable.FieldPrefix			, DbType.String	, ParameterDirection.Input,010);
		parameters.Add("@pTableHistory"			, AppDbTable.TableHistory			, DbType.Boolean	, ParameterDirection.Input);

		parameters.Add("@pSystemActive"			, AppDbTable.SystemActive			, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pSystemCreationUser"	, AppDbTable.SystemCreationUser	, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rGuid"						, null									, DbType.Guid		, ParameterDirection.Output);
		parameters.Add("@rIsOK"						, null									, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null									, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null									, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null									, DbType.Int32		, ParameterDirection.Output);

		appDbTable_return.authorName = userAuthor.SystemCreationUserName;
		appDbTable_return.authorMail = userAuthor.SystemCreationUserMail;

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_AppDbTables_ins]",parameters);
			appDbTable_return.id = parameters.Get<Guid?>("@rGuid");
			appDbTable_return.description = parameters.Get<string>("@rProcessMessage");

			appDbTable_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Inserção efetuada com sucesso":"Erro na tentativa de inserção");
			appDbTable_return.code= parameters.Get<int>("@rProcessCode");
		}
		return appDbTable_return;
	}

	public static EN_Return Update(IConfiguration config,EN_AppDbTable AppDbTable,EN_ManagerUser userAuthor){
		EN_Return appDbTable_return = new EN_Return();
		IEnumerable<EN_AppDbTable> appDbTable_lst = new List<EN_AppDbTable>();
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@pGuid"						, AppDbTable.SystemActive			, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pTableDatabase"			, AppDbTable.TableDatabase			, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pTableBuiltOrder"		, AppDbTable.TableBuiltOrder		, DbType.Int32		, ParameterDirection.Input);
		parameters.Add("@pTableName"				, AppDbTable.TableName				, DbType.String	, ParameterDirection.Input,050);
		parameters.Add("@pTableDescription"		, AppDbTable.TableDescription		, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pFieldPrefix"			, AppDbTable.FieldPrefix			, DbType.String	, ParameterDirection.Input,010);
		parameters.Add("@pTableHistory"			, AppDbTable.TableHistory			, DbType.Boolean	, ParameterDirection.Input);

		parameters.Add("@pSystemActive"			, AppDbTable.SystemActive				, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pSystemLastUpdateUser", AppDbTable.SystemLastUpdateUser	, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		appDbTable_return.authorName = userAuthor.SystemCreationUserName;
		appDbTable_return.authorMail = userAuthor.SystemCreationUserMail;

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_AppDbTables_upd]",parameters);
			appDbTable_return.description = parameters.Get<string>("@rProcessMessage");

			appDbTable_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Atualização efetuada com sucesso":"Erro na tentativa de atualização");
			appDbTable_return.code= parameters.Get<int>("@rProcessCode");
		}
		return appDbTable_return;
	}

	public static EN_Return Delete(IConfiguration config,Guid SystemIDX,EN_ManagerUser userAuthor){
		EN_Return appDbTable_return = new EN_Return();
		IEnumerable<EN_AppDbTable> appDbTable_lst = new List<EN_AppDbTable>();
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@rGuid"						, SystemIDX									, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		appDbTable_return.authorName = userAuthor.SystemCreationUserName;
		appDbTable_return.authorMail = userAuthor.SystemCreationUserMail;

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_AppDbTables_del]",parameters);
			appDbTable_return.description = parameters.Get<string>("@rProcessMessage");

			appDbTable_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Exclusão efetuada com sucesso":"Erro na tentativa de Exclusão");
			appDbTable_return.code= parameters.Get<int>("@rProcessCode");
		}
		return appDbTable_return;
	}
}
