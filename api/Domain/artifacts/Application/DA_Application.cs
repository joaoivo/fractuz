using System.Data;
using Dapper;
using Fractuz.Domain.Applications.Entities;
using Fractuz.Domain.Users.Entities;
using Microsoft.Data.SqlClient;

namespace Fractuz.Domain.Applications.DataAccess;
public static class DA_Application{
	public static IEnumerable<EN_Application> Select(IConfiguration config, out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query, ref int? pageNumber, ref int? pageRowCount, String? columnsOrderBy=null
		,Guid? guid=null,string? name=null,string? description=null){

		IEnumerable<EN_Application> application_lst = new List<EN_Application>();
		DynamicParameters parameters = new DynamicParameters();
		parameters.Add("@pGuid"					, guid				, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pName"					, name				, DbType.String	, ParameterDirection.Input,200);
		parameters.Add("@pDescription"		, description		, DbType.String	, ParameterDirection.Input,4000);

		parameters.Add("@pColumnsOrderBy"	, columnsOrderBy	, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pPageNumber"			, pageNumber		, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@pPageRowCount"		, pageRowCount		, DbType.Int32		, ParameterDirection.Output);

		parameters.Add("@rTotalRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rSeachRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rSearchPageCount"	, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rQuery"				, null				, DbType.String	, ParameterDirection.Output,4000);

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			application_lst = db.Query<EN_Application>("[dbo].[pr_Applications_sel]",parameters);
		}
//application_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Atualização efetuada com sucesso":"Erro na tentativa de atualização");
//
		pageNumber 		=parameters.Get<Int32?>("@pPageNumber");
		pageRowCount	=parameters.Get<Int32?>("@pPageRowCount");
		totalRowCount	=parameters.Get<Int32?>("@rTotalRowCount");
		seachRowCount	=parameters.Get<Int32?>("@rSeachRowCount");
		searchPageCount=parameters.Get<Int32?>("@rSearchPageCount");
		query				=parameters.Get<string?>("@rQuery");

		return application_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_Application Application,EN_ManagerUser userAuthor){
		EN_Return application_return = new EN_Return();
		IEnumerable<EN_Application> application_lst = new List<EN_Application>();
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

		application_return.authorName = userAuthor.SystemCreationUserName;
		application_return.authorMail = userAuthor.SystemCreationUserMail;

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_Applications_ins]",parameters);
			application_return.id = parameters.Get<Guid?>("@rGuid");
			application_return.description = parameters.Get<string>("@rProcessMessage");

			application_return.isSuccess = parameters.Get<Boolean>("@rIsOK");
			application_return.isError = !application_return.isSuccess;

			application_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Inserção efetuada com sucesso":"Erro na tentativa de inserção");
		}
		return application_return;
	}

	public static EN_Return Update(IConfiguration config,EN_Application Application,EN_ManagerUser userAuthor){
		EN_Return application_return = new EN_Return();
		IEnumerable<EN_Application> application_lst = new List<EN_Application>();
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@pGuid"						, Application.SystemIDX					, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pName"						, Application.Name						, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pDescription"			, Application.Description				, DbType.String	, ParameterDirection.Input,150);

		parameters.Add("@pSystemActive"			, Application.SystemActive				, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pSystemLastUpdateUser", Application.SystemLastUpdateUser	, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		application_return.authorName = userAuthor.SystemCreationUserName;
		application_return.authorMail = userAuthor.SystemCreationUserMail;
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_Applications_upd]",parameters);
			application_return.description = parameters.Get<string>("@rProcessMessage");

			application_return.isSuccess = parameters.Get<Boolean>("@rIsOK");
			application_return.isError = !application_return.isSuccess;

			application_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Atualização efetuada com sucesso":"Erro na tentativa de atualização");
		}
		return application_return;
	}

	public static EN_Return Delete(IConfiguration config,Guid? SystemIDX,EN_ManagerUser userAuthor){
		EN_Return application_return = new EN_Return();
		IEnumerable<EN_Application> application_lst = new List<EN_Application>();
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@pGuid"						, SystemIDX									, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		application_return.authorName = userAuthor.SystemCreationUserName;
		application_return.authorMail = userAuthor.SystemCreationUserMail;
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_Applications_del]",parameters);
			application_return.description = parameters.Get<string>("@rProcessMessage");

			application_return.isSuccess = parameters.Get<Boolean>("@rIsOK");
			application_return.isError = !application_return.isSuccess;

			application_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Exclusão efetuada com sucesso":"Erro na tentativa de Exclusão");
		}
		return application_return;
	}
}
