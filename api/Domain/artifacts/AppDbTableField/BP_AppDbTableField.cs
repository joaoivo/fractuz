using Fractuz.Domain.AppDbTableFields.Entities;
using Fractuz.Domain.AppDbTableFields.DataAccess;
using Microsoft.CodeAnalysis;
using Fractuz.Domain.Users.Entities;

namespace Fractuz.Domain.AppDbTableFields.BussinesPlan;
public static class BP_AppDbTableField{
	public static List<EN_AppDbTableField>? Select(IConfiguration config
		,Guid? guid=null ,Guid? fieldTable=null,string? fieldName=null,string? fieldDescription =null
		,String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		int? totalRowCount=null;
		int? seachRowCount=null;
		int? searchPageCount=null;
		string? query = null;

		return (List<EN_AppDbTableField>?)DA_AppDbTableField.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query , ref pageNumber , ref pageRowCount, columnsOrderBy
		,guid, fieldTable, fieldName	,fieldDescription );
	}
	public static List<EN_AppDbTableField>? Select(IConfiguration config,out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query
		,Guid? guid=null ,Guid? fieldTable=null,string? fieldName=null,string? fieldDescription =null
		,Boolean? isAdm =null
		,String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		List<EN_AppDbTableField>? appDbTableField_lst = (List<EN_AppDbTableField>?)DA_AppDbTableField.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query, ref pageNumber , ref pageRowCount, columnsOrderBy
			,guid, fieldTable, fieldName,fieldDescription );
		return appDbTableField_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_AppDbTableField AppDbTableField,EN_ManagerUser userAuthor){
		return DA_AppDbTableField.Insert(config,AppDbTableField,userAuthor);
	}
	public static EN_Return Update(IConfiguration config,EN_AppDbTableField AppDbTableField,EN_ManagerUser userAuthor){
		return DA_AppDbTableField.Update(config,AppDbTableField,userAuthor);
	}
	public static EN_Return Delete(IConfiguration config,Guid SystemIDX,EN_ManagerUser userAuthor){
		return DA_AppDbTableField.Delete(config,SystemIDX,userAuthor);
	}
}
