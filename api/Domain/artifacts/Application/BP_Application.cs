using Fractuz.Domain.Applications.Entities;
using Fractuz.Domain.Applications.DataAccess;

namespace Fractuz.Domain.Applications.BussinesPlan;
public static class BP_Application{
	public static List<EN_Application>? Select(IConfiguration config, Guid? guid=null,string? particName=null,string? particMail=null
		,Boolean? isAdm =null, String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		int? totalRowCount=null;
		int? seachRowCount=null;
		int? searchPageCount=null;
		string? query = null;

		return (List<EN_Application>?)DA_Application.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query , ref pageNumber , ref pageRowCount, columnsOrderBy
		,guid, particName, particMail	,isAdm );
	}
	public static List<EN_Application>? Select(IConfiguration config,out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query
		,Guid? guid=null,string? particName=null,string? particMail=null
		,Boolean? isAdm =null, String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		List<EN_Application>? route_lst = (List<EN_Application>?)DA_Application.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query, ref pageNumber , ref pageRowCount, columnsOrderBy
			,guid, particName, particMail,isAdm );
		return route_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_Application Application){
		return DA_Application.Insert(config,Application);
	}
	public static EN_Return Update(IConfiguration config,EN_Application Application){
		return DA_Application.Update(config,Application);
	}
	public static EN_Return Delete(IConfiguration config,Guid SystemIDX){
		return DA_Application.Delete(config,SystemIDX);
	}
}
