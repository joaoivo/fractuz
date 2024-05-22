using Fractuz.Domain.AppDataBase.DataAccess;
using Fractuz.Domain.AppDataBase.Entities;

namespace Fractuz.Domain.AppDataBase.BussinesPlan;
public static class BP_AppDataBase{
	public static List<EN_AppDataBase>? Select(IConfiguration config
		, Guid? guid=null,Guid? application=null,string? databaseName=null	,int? buildOrder =null
		, String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		int? totalRowCount=null;
		int? seachRowCount=null;
		int? searchPageCount=null;
		string? query = null;

		return (List<EN_AppDataBase>?)DA_AppDataBase.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query , ref pageNumber , ref pageRowCount, columnsOrderBy
		,guid, application, databaseName	,buildOrder );
	}
	public static List<EN_AppDataBase>? Select(IConfiguration config,out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query
		, Guid? guid=null,Guid? application=null,string? databaseName=null	,int? buildOrder =null
		,Boolean? isAdm =null, String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		List<EN_AppDataBase>? route_lst = (List<EN_AppDataBase>?)DA_AppDataBase.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query, ref pageNumber , ref pageRowCount, columnsOrderBy
			,guid, application, databaseName	,buildOrder );
		return route_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_AppDataBase AppDataBase){
		return DA_AppDataBase.Insert(config,AppDataBase);
	}
	public static EN_Return Update(IConfiguration config,EN_AppDataBase AppDataBase){
		return DA_AppDataBase.Update(config,AppDataBase);
	}
	public static EN_Return Delete(IConfiguration config,Guid SystemIDX){
		return DA_AppDataBase.Delete(config,SystemIDX);
	}
}
