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
			,new apiMethodParam{handle=ApplicationAPI_Delete	, httpMethods=new HttpMethod[]{HttpMethod.Delete}}
		};
	}
	[Authorize]
	public IResult ApplicationAPI_Get(HttpRequest request){
		try{

			Guid? guid=getHeaderGuidValues(request.Headers,"guid");
			String? name=getHeaderStringValues(request.Headers,"name");
			String? description=getHeaderStringValues(request.Headers,"description");

			String? columnsOrderBy=getHeaderStringValues(request.Headers,"columnsOrderBy");
			Int32? pageNumber = getHeaderIntValues(request.Headers,"pageNumber");
			Int32? pageRowCount=getHeaderIntValues(request.Headers,"pageRowCount");

			EN_ManagerUser userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			List<EN_Application>? application_lst = BP_Application.Select(Config,guid, name, description, columnsOrderBy, pageNumber, pageRowCount);
			return ApiRoutePressets.returnResults(new EN_Return{code=0,tittle="Pesquisa de Aplicações", dataList = application_lst, author = userAuthor});
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
	[Authorize]
	public IResult ApplicationAPI_Post([FromBody] EN_Application application,HttpRequest request){
		try{
			return ApiRoutePressets.returnResults(BP_Application.Insert(Config,application,JWTTokensManager.GetUserByBearerToken(request,Config)));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult ApplicationAPI_Put([FromBody] EN_Application application,HttpRequest request){
		try{
			return ApiRoutePressets.returnResults(BP_Application.Update(Config,application,JWTTokensManager.GetUserByBearerToken(request,Config)));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult ApplicationAPI_Delete(HttpRequest request){
		try{
			Guid? guid=getHeaderGuidValues(request.Headers,"guid");
			return ApiRoutePressets.returnResults(BP_Application.Delete(Config,guid,JWTTokensManager.GetUserByBearerToken(request,Config)));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
}
