using Fractuz.System.Defaults.EndPoint;

using Microsoft.AspNetCore.Mvc;
using Fractuz.Domain.Applications.Entities;
using Fractuz.Domain.Applications.BussinesPlan;
using Microsoft.AspNetCore.Authorization;
using Fractuz.Domain.Users.Entities;
using api.System.jwt;

namespace Fractuz.Domain.Applications.EndPoints;
public class EP_Application:IEndPoint{
	public EP_Application(IConfiguration config) : base(config){}
	public override string Route (){ return @"/Application";}
	public override List<apiMethodParam> Methods(){
		return new List<apiMethodParam>{
			 new apiMethodParam{handle=ApplicationAPI_Get 		, httpMethods=new HttpMethod[]{HttpMethod.Get }}
			,new apiMethodParam{handle=ApplicationAPI_Post		, httpMethods=new HttpMethod[]{HttpMethod.Post}}
			,new apiMethodParam{handle=ApplicationAPI_Put		, httpMethods=new HttpMethod[]{HttpMethod.Put}}
			,new apiMethodParam{handle=ApplicationAPI_Delete	, httpMethods=new HttpMethod[]{HttpMethod.Delete},routeComplement="/{IDX}"}
		};
	}
	[Authorize]
	public IResult ApplicationAPI_Get(HttpRequest request){
		try{

			Guid? SystemIDX=getHeaderGuidValues(request.Headers,"SystemIDX");
			String? Name=getHeaderStringValues(request.Headers,"Name");
			String? Description=getHeaderStringValues(request.Headers,"Description");

			String? columnsOrderBy=getHeaderStringValues(request.Headers,"columnsOrderBy");
			Int32? pageNumber = getHeaderIntValues(request.Headers,"pageNumber");
			Int32? pageRowCount=getHeaderIntValues(request.Headers,"pageRowCount");

			EN_ManagerUser userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			List<EN_Application>? application_lst = BP_Application.Select(Config,SystemIDX, Name, Description, columnsOrderBy, pageNumber, pageRowCount);
			return ApiRoutePressets.returnResults(new EN_Return{isSuccess=true,isError=false,tittle="Pesquisa de Aplicações", dataList = application_lst, author = userAuthor});
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
	[Authorize]
	public IResult ApplicationAPI_Post([FromBody] EN_Application application,HttpRequest request){
		try{
			return ApiRoutePressets.returnResults(BP_Application.Insert(Config,application,JWTTokensManager.GetUserByBearerToken(request,Config)));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult ApplicationAPI_Put([FromBody] EN_Application application,HttpRequest request){
		try{
			return ApiRoutePressets.returnResults(BP_Application.Update(Config,application,JWTTokensManager.GetUserByBearerToken(request,Config)));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime",description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult ApplicationAPI_Delete([FromRoute] string IDX,HttpRequest request){
		try{
			Guid SystemIDX;
			if(!Guid.TryParse(IDX, out SystemIDX)){throw new Exception("ID inválido");}
			return ApiRoutePressets.returnResults(BP_Application.Delete(Config,SystemIDX,JWTTokensManager.GetUserByBearerToken(request,Config)));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime",description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
}
