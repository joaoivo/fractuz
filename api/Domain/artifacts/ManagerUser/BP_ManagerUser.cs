using Fractuz.Domain.Users.Entities;
using Fractuz.Domain.Users.DataAccess;

namespace Fractuz.Domain.Users.BussinesPlan;
public static class BP_ManagerUser{

	public static List<EN_ManagerUser>? Login(IConfiguration config,string? particMail=null,string? particPass=null){
		return (List<EN_ManagerUser>?)DA_ManagerUser.Login(config,particMail,particPass);
	}
	public static List<EN_ManagerUser>? Select(IConfiguration config, Guid? guid=null,string? particName=null,string? particMail=null
		,Boolean? isAdm =null, String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		int? totalRowCount=null;
		int? seachRowCount=null;
		int? searchPageCount=null;
		string? query = null;

		return (List<EN_ManagerUser>?)DA_ManagerUser.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query , ref pageNumber , ref pageRowCount, columnsOrderBy
		,guid, particName, particMail	,isAdm );
	}
	public static List<EN_ManagerUser>? Select(IConfiguration config,out int? totalRowCount, out int? seachRowCount, out int? searchPageCount, out string? query
		,Guid? guid=null,string? particName=null,string? particMail=null
		,Boolean? isAdm =null, String? columnsOrderBy=null, int? pageNumber = null, int? pageRowCount=null ){

		List<EN_ManagerUser>? managerUser_lst = (List<EN_ManagerUser>?)DA_ManagerUser.Select(config,out totalRowCount, out seachRowCount, out searchPageCount, out query, ref pageNumber , ref pageRowCount, columnsOrderBy
			,guid, particName, particMail,isAdm );
		return managerUser_lst;
	}

	public static EN_Return Insert(IConfiguration config,EN_ManagerUser ManagerUser,EN_ManagerUser userAuthor){
		return DA_ManagerUser.Insert(config,ManagerUser,userAuthor);
	}
	public static EN_Return Update(IConfiguration config,EN_ManagerUser ManagerUser,EN_ManagerUser userAuthor){
		return DA_ManagerUser.Update(config,ManagerUser,userAuthor);
	}
	public static EN_Return Delete(IConfiguration config,Guid SystemIDX,EN_ManagerUser userAuthor){
		return DA_ManagerUser.Delete(config,SystemIDX, userAuthor);
	}
}
