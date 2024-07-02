using Fractuz.System.Defaults.EndPoint;

using Fractuz.Domain.AppDbTables.BussinesPlan;
using Fractuz.Domain.AppDbTables.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Fractuz.Domain.Users.Entities;
using api.System.jwt;
using Fractuz.System.Errors.BussinesPlan;

namespace Fractuz.Domain.AppDbTables.EndPoints;
public class EP_AppDbTable:IEndPoint{
	public EP_AppDbTable(IConfiguration config) : base(config){}
	public override string Route (){ return @"/AppDbTable";}
	public override List<apiMethodParam> Methods(){
		return new List<apiMethodParam>{
			 new apiMethodParam{handle=AppDbTableAPI_Get 	, httpMethods=new HttpMethod[]{HttpMethod.Get }}
			,new apiMethodParam{handle=AppDbTableAPI_Post	, httpMethods=new HttpMethod[]{HttpMethod.Post}}
			,new apiMethodParam{handle=AppDbTableAPI_Put		, httpMethods=new HttpMethod[]{HttpMethod.Put}}
			,new apiMethodParam{handle=AppDbTableAPI_Delete	, httpMethods=new HttpMethod[]{HttpMethod.Delete},routeComplement="/{IDX}"}
		};
	}

	[Authorize]
	public IResult AppDbTableAPI_Get(HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{
			userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			List<EN_AppDbTable>? application_lst = BP_AppDbTable.Select(Config);
			return ApiRoutePressets.returnResults(new EN_Return{isSuccess=true,isError=false,tittle="Pesquisa de Usuário", dataList = application_lst, author = userAuthor});
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Pesquisa de Tabelas",ex,userAuthor,request);
		}
	}

	[Authorize]
	public IResult AppDbTableAPI_Post([FromBody] EN_AppDbTable application,HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{
			userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			return ApiRoutePressets.returnResults(BP_AppDbTable.Insert(Config,application,userAuthor));
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Adição de Tabelas",ex,userAuthor,request);
		}
	}

	[Authorize]
	public IResult AppDbTableAPI_Put([FromBody] EN_AppDbTable application,HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{
			userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			return ApiRoutePressets.returnResults(BP_AppDbTable.Update(Config,application,userAuthor));
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Alteração de Tabelas",ex,userAuthor,request);
		}
	}

	[Authorize]
	public IResult AppDbTableAPI_Delete([FromRoute] string IDX,HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{
			userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			Guid SystemIDX;
			if(!Guid.TryParse(IDX, out SystemIDX)){throw new Exception("ID inválido");}
			return ApiRoutePressets.returnResults(BP_AppDbTable.Delete(Config,SystemIDX,userAuthor));
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Exclusão de Tabelas",ex,userAuthor,request);
		}
	}
}
