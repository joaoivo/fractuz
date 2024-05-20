using Fractuz.Domain.AppDbTable.DataAccess;
using Microsoft.CodeAnalysis;
using Fractuz.Domain.AppDbTable.Entities;

namespace Fractuz.Domain.AppDbTable.BussinesPlan;
public static class BP_AppDbTable{
	public static List<EN_AppDbTable>? Select(IConfiguration config, Guid? guid=null,string? particName=null,string? particMail=null
		,Boolean? isAdm =null, String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		int? totalRowCount=null;
		int? seachRowCount=null;
		int? searchPageCount=null;
		string? query = null;

		return (List<EN_AppDbTable>?)DA_AppDbTable.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query , ref pageNumber , ref pageRowCount, columnsOrderBy
		,guid, particName, particMail	,isAdm );
	}
	public static List<EN_AppDbTable>? Select(IConfiguration config,out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query
		,Guid? guid=null,string? particName=null,string? particMail=null
		,Boolean? isAdm =null, String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		List<EN_AppDbTable>? route_lst = (List<EN_AppDbTable>?)DA_AppDbTable.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query, ref pageNumber , ref pageRowCount, columnsOrderBy
			,guid, particName, particMail,isAdm );
		return route_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_AppDbTable AppDbTable){
		return DA_AppDbTable.Insert(config,AppDbTable);
	}
	public static EN_Return Update(IConfiguration config,EN_AppDbTable AppDbTable){
		return DA_AppDbTable.Update(config,AppDbTable);
	}
	public static EN_Return Delete(IConfiguration config,Guid SystemIDX){
		return DA_AppDbTable.Delete(config,SystemIDX);
	}
}
