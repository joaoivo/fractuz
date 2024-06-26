using Fractuz.Domain.AppDataBase.DataAccess;
using Fractuz.Domain.AppDataBase.Entities;
using Fractuz.Domain.Users.Entities;

namespace Fractuz.Domain.AppDataBase.BussinesPlan;
public static class BP_AppDataBase{
	public static List<EN_AppDataBase>? Select(IConfiguration config
		, Guid? SystemIDX=null,Guid? ApplicationIDX=null,string? databaseName=null,string? databaseDescription=null		,int? buildOrder =null
		, String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		int? totalRowCount=null;
		int? seachRowCount=null;
		int? searchPageCount=null;
		string? query = null;

		return (List<EN_AppDataBase>?)DA_AppDataBase.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query , ref pageNumber , ref pageRowCount, columnsOrderBy
		,SystemIDX, ApplicationIDX, databaseName	,databaseDescription,buildOrder );
	}
	public static List<EN_AppDataBase>? Select(IConfiguration config,out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query
		, Guid? guid=null,Guid? application=null,string? databaseName=null	,string? databaseDescription=null	,int? buildOrder =null
		,Boolean? isAdm =null, String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		List<EN_AppDataBase>? appDataBase_lst = (List<EN_AppDataBase>?)DA_AppDataBase.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query, ref pageNumber , ref pageRowCount, columnsOrderBy
			,guid, application, databaseName,databaseDescription,buildOrder );
		return appDataBase_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_AppDataBase AppDataBase,EN_ManagerUser userAuthor){
		return DA_AppDataBase.Insert(config,AppDataBase,userAuthor);
	}
	public static EN_Return Update(IConfiguration config,EN_AppDataBase AppDataBase,EN_ManagerUser userAuthor){
		return DA_AppDataBase.Update(config,AppDataBase,userAuthor);
	}
	public static EN_Return Delete(IConfiguration config,Guid? SystemIDX,EN_ManagerUser userAuthor){
		return DA_AppDataBase.Delete(config,SystemIDX,userAuthor);
	}
}
