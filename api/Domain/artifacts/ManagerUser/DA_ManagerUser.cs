using Fractuz.Domain.Users.Entities;
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Fractuz.Domain.Users.DataAccess;
public static class DA_ManagerUser{
	public static IEnumerable<EN_ManagerUser> Login(IConfiguration config,string? particMail=null,string? particPass=null){

		IEnumerable<EN_ManagerUser> managerUser_lst = new List<EN_ManagerUser>();
		DynamicParameters parameters = new DynamicParameters();
		parameters.Add("@pParticMail"			, particMail		, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pParticPass"			, particPass		, DbType.String	, ParameterDirection.Input,300);

		parameters.Add("@rProcessMessage"	, null				, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rQuery"				, null				, DbType.String	, ParameterDirection.Output,4000);

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			managerUser_lst = db.Query<EN_ManagerUser>("[dbo].[pr_ManagerUsers_loginTest]",parameters);
		}
		return managerUser_lst;
	}
	public static IEnumerable<EN_ManagerUser> Select(IConfiguration config, out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query, ref int? pageNumber, ref int? pageRowCount, String? columnsOrderBy=null
		,Guid? guid=null,string? particName=null,string? particMail=null
		,Boolean? isAdm =null){

		IEnumerable<EN_ManagerUser> managerUser_lst = new List<EN_ManagerUser>();
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
			managerUser_lst = db.Query<EN_ManagerUser>("[dbo].[pr_ManagerUsers_sel]",parameters);
		}

		pageNumber =0;
		pageRowCount=0;
		totalRowCount=0;
		seachRowCount=0;
		searchPageCount=0;
		query="";
		return managerUser_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_ManagerUser ManagerUser){
		DynamicParameters parameters = new DynamicParameters();
		ManagerUser.SystemActive= ManagerUser.SystemActive==null?true:ManagerUser.SystemActive;

		parameters.Add("@pParticName"				, ManagerUser.ParticName			, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pParticMail"				, ManagerUser.ParticMail			, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pParticPass"				, ManagerUser.ParticPass			, DbType.String	, ParameterDirection.Input,300);
		parameters.Add("@pIsAdm"					, ManagerUser.IsAdm					, DbType.Boolean	, ParameterDirection.Input);

		parameters.Add("@pSystemActive"			, ManagerUser.SystemActive			, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pSystemCreationUser"	, ManagerUser.SystemCreationUser	, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rGuid"						, null									, DbType.Guid		, ParameterDirection.Output);
		parameters.Add("@rIsOK"						, null									, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null									, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null									, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null									, DbType.Int32		, ParameterDirection.Output);

		EN_Return managerUser_return = new EN_Return();
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_ManagerUsers_ins]",parameters);
			managerUser_return.id = parameters.Get<Guid?>("@rGuid");
			managerUser_return.description = parameters.Get<string>("@rProcessMessage");

			managerUser_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Inserção efetuada com sucesso":"Erro na tentativa de inserção");
			managerUser_return.code= parameters.Get<int>("@rProcessCode");
		}
		return managerUser_return;
	}

	public static EN_Return Update(IConfiguration config,EN_ManagerUser ManagerUser){
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@rGuid"						, ManagerUser.SystemIDX					, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pParticName"				, ManagerUser.ParticName				, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pParticMail"				, ManagerUser.ParticMail				, DbType.String	, ParameterDirection.Input,150);
		parameters.Add("@pIsAdm"					, ManagerUser.IsAdm						, DbType.Boolean	, ParameterDirection.Input);

		parameters.Add("@pSystemActive"			, ManagerUser.SystemActive				, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pSystemLastUpdateUser", ManagerUser.SystemLastUpdateUser	, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		EN_Return managerUser_return = new EN_Return();
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_ManagerUsers_upd]",parameters);
			managerUser_return.description = parameters.Get<string>("@rProcessMessage");

			managerUser_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Atualização efetuada com sucesso":"Erro na tentativa de atualização");
			managerUser_return.code= parameters.Get<int>("@rProcessCode");
		}
		return managerUser_return;
	}

	public static EN_Return Delete(IConfiguration config,Guid SystemIDX){
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@rGuid"						, SystemIDX									, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		EN_Return managerUser_return = new EN_Return();
		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_ManagerUsers_del]",parameters);
			managerUser_return.description = parameters.Get<string>("@rProcessMessage");

			managerUser_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Exclusão efetuada com sucesso":"Erro na tentativa de Exclusão");
			managerUser_return.code= parameters.Get<int>("@rProcessCode");
		}
		return managerUser_return;
	}
}
