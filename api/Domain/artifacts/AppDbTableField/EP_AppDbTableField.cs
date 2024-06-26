using Fractuz.System.Defaults.EndPoint;

using Fractuz.Domain.AppDbTableFields.BussinesPlan;
using Fractuz.Domain.AppDbTableFields.Entities;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using api.System.jwt;
using Fractuz.Domain.Users.Entities;

namespace Fractuz.Domain.AppDbTableFields.EndPoints;
public class EP_AppDbTableField:IEndPoint{
	public EP_AppDbTableField(IConfiguration config) : base(config){}
	public override string Route (){ return @"/AppDbTableField";}
	public override List<apiMethodParam> Methods(){
		return new List<apiMethodParam>{
			 new apiMethodParam{handle=AppDbTableFieldAPI_Get 	, httpMethods=new HttpMethod[]{HttpMethod.Get }}
			,new apiMethodParam{handle=AppDbTableFieldAPI_Post	, httpMethods=new HttpMethod[]{HttpMethod.Post}}
			,new apiMethodParam{handle=AppDbTableFieldAPI_Put		, httpMethods=new HttpMethod[]{HttpMethod.Put}}
			,new apiMethodParam{handle=AppDbTableFieldAPI_Delete	, httpMethods=new HttpMethod[]{HttpMethod.Delete},routeComplement="/{IDX}"}
		};
	}

	[Authorize]
	public IResult AppDbTableFieldAPI_Get(HttpRequest request){
		try{
			EN_ManagerUser userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			List<EN_AppDbTableField>? application_lst = BP_AppDbTableField.Select(Config);
			return ApiRoutePressets.returnResults(new EN_Return{isSuccess=true,isError=false,tittle="Pesquisa de Usuário", dataList = application_lst, author = userAuthor});
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true,tittle="Erro de Runtime",description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult AppDbTableFieldAPI_Post([FromBody] EN_AppDbTableField application,HttpRequest request){
		try{
			return ApiRoutePressets.returnResults(BP_AppDbTableField.Insert(Config,application,JWTTokensManager.GetUserByBearerToken(request,Config)));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult AppDbTableFieldAPI_Put([FromBody] EN_AppDbTableField application,HttpRequest request){
		try{
			return ApiRoutePressets.returnResults(BP_AppDbTableField.Update(Config,application,JWTTokensManager.GetUserByBearerToken(request,Config)));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult AppDbTableFieldAPI_Delete([FromRoute] string IDX,HttpRequest request){
		try{
			Guid SystemIDX;
			if(!Guid.TryParse(IDX, out SystemIDX)){throw new Exception("ID inválido");}
			return ApiRoutePressets.returnResults(BP_AppDbTableField.Delete(Config,SystemIDX,JWTTokensManager.GetUserByBearerToken(request,Config)));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime",description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
}
