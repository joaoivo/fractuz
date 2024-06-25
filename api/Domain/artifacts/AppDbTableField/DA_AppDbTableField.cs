using System.Data;
using Dapper;
using Fractuz.Domain.AppDbTableFields.Entities;
using Fractuz.Domain.Users.Entities;
using Microsoft.Data.SqlClient;

namespace Fractuz.Domain.AppDbTableFields.DataAccess;
public static class DA_AppDbTableField{
	public static IEnumerable<EN_AppDbTableField> Select(IConfiguration config, out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query, ref int? pageNumber, ref int? pageRowCount, String? columnsOrderBy=null
		,Guid? guid=null,Guid? fieldTable=null,string? fieldName=null
		,string? fieldDescription =null){

		IEnumerable<EN_AppDbTableField> appDbTableField_lst = new List<EN_AppDbTableField>();
		DynamicParameters parameters = new DynamicParameters();
		parameters.Add("@pGuid"					, guid				, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@pFieldTable"			, fieldTable		, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pFieldName"			, fieldName			, DbType.String	, ParameterDirection.Input,100);
		parameters.Add("@pFieldDescription"	, fieldDescription, DbType.String	, ParameterDirection.Input,100);

		parameters.Add("@pColumnsOrderBy"	, columnsOrderBy	, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pPageNumber"			, pageNumber		, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@pPageRowCount"		, pageRowCount		, DbType.Int32		, ParameterDirection.Output);

		parameters.Add("@rTotalRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rSeachRowCount"		, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@pSearchPageCount"	, null				, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rQuery"				, null				, DbType.String	, ParameterDirection.Output,4000);

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			appDbTableField_lst = db.Query<EN_AppDbTableField>("[dbo].[pr_AppDbTableFields_sel]",parameters);
		}

		pageNumber =0;
		pageRowCount=0;
		totalRowCount=0;
		seachRowCount=0;
		searchPageCount=0;
		query="";
		return appDbTableField_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_AppDbTableField AppDbTableField,EN_ManagerUser userAuthor){
		EN_Return appDbTableField_return = new EN_Return();
		IEnumerable<EN_AppDbTableField> appDbTableField_lst = new List<EN_AppDbTableField>();
		DynamicParameters parameters = new DynamicParameters();

		AppDbTableField.SystemActive= AppDbTableField.SystemActive==null?true:AppDbTableField.SystemActive;

		parameters.Add("@pFieldTable"					, AppDbTableField.FieldTable					, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pFieldName"					, AppDbTableField.FieldName					, DbType.String	, ParameterDirection.Input,100);
		parameters.Add("@pFieldDescription"			, AppDbTableField.FieldDescription			, DbType.String	, ParameterDirection.Input,100);
		parameters.Add("@pFieldDbDataType"			, AppDbTableField.FieldDbDataType			, DbType.String	, ParameterDirection.Input,010);
		parameters.Add("@pFieldDbDataSize"			, AppDbTableField.FieldDbDataSize			, DbType.Int32		, ParameterDirection.Input);
		parameters.Add("@pFieldDbDataSizeDecimel"	, AppDbTableField.FieldDbDataSizeDecimel	, DbType.Int32		, ParameterDirection.Input);
		parameters.Add("@pIsPrimaryKey"				, AppDbTableField.IsPrimaryKey				, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pIsAllowNull"				, AppDbTableField.IsAllowNull					, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pIsUnique"					, AppDbTableField.IsUnique						, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pFieldDefaultValue"		, AppDbTableField.FieldDefaultValue			, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pConstraintField"			, AppDbTableField.ConstraintField			, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pAppDataType"				, AppDbTableField.AppDataType					, DbType.String	, ParameterDirection.Input,003);
		parameters.Add("@pAppDataNickname"			, AppDbTableField.AppDataNickname			, DbType.String	, ParameterDirection.Input,200);

		parameters.Add("@pSystemActive"			, AppDbTableField.SystemActive			, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pSystemCreationUser"	, AppDbTableField.SystemCreationUser	, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rGuid"						, null									, DbType.Guid		, ParameterDirection.Output);
		parameters.Add("@rIsOK"						, null									, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null									, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null									, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null									, DbType.Int32		, ParameterDirection.Output);

		appDbTableField_return.authorName = userAuthor.SystemCreationUserName;
		appDbTableField_return.authorMail = userAuthor.SystemCreationUserMail;

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_AppDbTableFields_ins]",parameters);
			appDbTableField_return.id = parameters.Get<Guid?>("@rGuid");
			appDbTableField_return.description = parameters.Get<string>("@rProcessMessage");

			appDbTableField_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Inserção efetuada com sucesso":"Erro na tentativa de inserção");
		}
		return appDbTableField_return;
	}

	public static EN_Return Update(IConfiguration config,EN_AppDbTableField AppDbTableField,EN_ManagerUser userAuthor){
		EN_Return appDbTableField_return = new EN_Return();
		IEnumerable<EN_AppDbTableField> appDbTableField_lst = new List<EN_AppDbTableField>();
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@rGuid"						, AppDbTableField.SystemIDX					, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pFieldTable"					, AppDbTableField.FieldTable					, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pFieldName"					, AppDbTableField.FieldName					, DbType.String	, ParameterDirection.Input,100);
		parameters.Add("@pFieldDescription"			, AppDbTableField.FieldDescription			, DbType.String	, ParameterDirection.Input,100);
		parameters.Add("@pFieldDbDataType"			, AppDbTableField.FieldDbDataType			, DbType.String	, ParameterDirection.Input,010);
		parameters.Add("@pFieldDbDataSize"			, AppDbTableField.FieldDbDataSize			, DbType.Int32		, ParameterDirection.Input);
		parameters.Add("@pFieldDbDataSizeDecimel"	, AppDbTableField.FieldDbDataSizeDecimel	, DbType.Int32		, ParameterDirection.Input);
		parameters.Add("@pIsPrimaryKey"				, AppDbTableField.IsPrimaryKey				, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pIsAllowNull"				, AppDbTableField.IsAllowNull					, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pIsUnique"					, AppDbTableField.IsUnique						, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pFieldDefaultValue"		, AppDbTableField.FieldDefaultValue			, DbType.String	, ParameterDirection.Input,4000);
		parameters.Add("@pConstraintField"			, AppDbTableField.ConstraintField			, DbType.Guid		, ParameterDirection.Input);
		parameters.Add("@pAppDataType"				, AppDbTableField.AppDataType					, DbType.String	, ParameterDirection.Input,003);
		parameters.Add("@pAppDataNickname"			, AppDbTableField.AppDataNickname			, DbType.String	, ParameterDirection.Input,200);

		parameters.Add("@pSystemActive"			, AppDbTableField.SystemActive				, DbType.Boolean	, ParameterDirection.Input);
		parameters.Add("@pSystemLastUpdateUser", AppDbTableField.SystemLastUpdateUser	, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		appDbTableField_return.authorName = userAuthor.SystemCreationUserName;
		appDbTableField_return.authorMail = userAuthor.SystemCreationUserMail;

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_AppDbTableFields_upd]",parameters);
			appDbTableField_return.description = parameters.Get<string>("@rProcessMessage");

			appDbTableField_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Atualização efetuada com sucesso":"Erro na tentativa de atualização");
		}
		return appDbTableField_return;
	}

	public static EN_Return Delete(IConfiguration config,Guid SystemIDX,EN_ManagerUser userAuthor){
		EN_Return appDbTableField_return = new EN_Return();
		IEnumerable<EN_AppDbTableField> appDbTableField_lst = new List<EN_AppDbTableField>();
		DynamicParameters parameters = new DynamicParameters();

		parameters.Add("@rGuid"						, SystemIDX									, DbType.Guid		, ParameterDirection.Input);

		parameters.Add("@rIsOK"						, null										, DbType.Boolean	, ParameterDirection.Output);
		parameters.Add("@rRowsAffected"			, null										, DbType.Int32		, ParameterDirection.Output);
		parameters.Add("@rProcessMessage"		, null										, DbType.String	, ParameterDirection.Output,4000);
		parameters.Add("@rProcessCode"			, null										, DbType.Int32		, ParameterDirection.Output);

		appDbTableField_return.authorName = userAuthor.SystemCreationUserName;
		appDbTableField_return.authorMail = userAuthor.SystemCreationUserMail;

		using (SqlConnection db = new SqlConnection(config["Database:Default"])){
			db.Execute("[dbo].[pr_AppDbTableFields_del]",parameters);
			appDbTableField_return.description = parameters.Get<string>("@rProcessMessage");

			appDbTableField_return.tittle = (parameters.Get<Boolean>("@rIsOK")?"Exclusão efetuada com sucesso":"Erro na tentativa de Exclusão");
		}
		return appDbTableField_return;
	}
}
