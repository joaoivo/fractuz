using Fractuz.System.Defaults.EndPoint;

using Fractuz.Domain.AppDbTables.BussinesPlan;
using Fractuz.Domain.AppDbTables.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Fractuz.Domain.Users.Entities;
using api.System.jwt;

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
		try{
			EN_ManagerUser userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			List<EN_AppDbTable>? application_lst = BP_AppDbTable.Select(Config);
			return ApiRoutePressets.returnResults(new EN_Return{isSuccess=true,isError=false,tittle="Pesquisa de Usuário", dataList = application_lst, author = userAuthor});
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime",description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult AppDbTableAPI_Post([FromBody] EN_AppDbTable application,HttpRequest request){
		try{
			return ApiRoutePressets.returnResults(BP_AppDbTable.Insert(Config,application,JWTTokensManager.GetUserByBearerToken(request,Config)));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime",description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult AppDbTableAPI_Put([FromBody] EN_AppDbTable application,HttpRequest request){
		try{
			return ApiRoutePressets.returnResults(BP_AppDbTable.Update(Config,application,JWTTokensManager.GetUserByBearerToken(request,Config)));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime",description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult AppDbTableAPI_Delete([FromRoute] string IDX,HttpRequest request){
		try{
			Guid SystemIDX;
			if(!Guid.TryParse(IDX, out SystemIDX)){throw new Exception("ID inválido");}
			return ApiRoutePressets.returnResults(BP_AppDbTable.Delete(Config,SystemIDX,JWTTokensManager.GetUserByBearerToken(request,Config)));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime",description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
}
