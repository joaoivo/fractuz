using Fractuz.Domain.AppDbTables.DataAccess;
using Microsoft.CodeAnalysis;
using Fractuz.Domain.AppDbTables.Entities;
using Fractuz.Domain.Users.Entities;

namespace Fractuz.Domain.AppDbTables.BussinesPlan;
public static class BP_AppDbTable{
	public static List<EN_AppDbTable>? Select(IConfiguration config
		,Guid? guid=null,Guid? tableDatabase=null,string? tableName=null
		,String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		int? totalRowCount=null;
		int? seachRowCount=null;
		int? searchPageCount=null;
		string? query = null;

		return (List<EN_AppDbTable>?)DA_AppDbTable.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query , ref pageNumber , ref pageRowCount, columnsOrderBy
		,guid, tableDatabase, tableName);
	}
	public static List<EN_AppDbTable>? Select(IConfiguration config,out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query
		,Guid? guid=null,Guid? tableDatabase=null,string? tableName=null
		, String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		List<EN_AppDbTable>? appDbTable_lst = (List<EN_AppDbTable>?)DA_AppDbTable.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query, ref pageNumber , ref pageRowCount, columnsOrderBy
			,guid, tableDatabase, tableName );
		return appDbTable_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_AppDbTable AppDbTable,EN_ManagerUser userAuthor){
		return DA_AppDbTable.Insert(config,AppDbTable,userAuthor);
	}
	public static EN_Return Update(IConfiguration config,EN_AppDbTable AppDbTable,EN_ManagerUser userAuthor){
		return DA_AppDbTable.Update(config,AppDbTable,userAuthor);
	}
	public static EN_Return Delete(IConfiguration config,Guid SystemIDX,EN_ManagerUser userAuthor){
		return DA_AppDbTable.Delete(config,SystemIDX,userAuthor);
	}
}
