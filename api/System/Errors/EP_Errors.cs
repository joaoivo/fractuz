
using Fractuz.System.Defaults.EndPoint;
using Fractuz.Domain.Users.Entities;
using Fractuz.System.Errors.BussinesPlan;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using api.System.jwt;

namespace Fractuz.System.Errors.EndPoints;
public class EP_Errors:IEndPoint{
	public EP_Errors(IConfiguration config) : base(config){}
	public override string Route (){ return @"/System/Error";}
	public override List<apiMethodParam> Methods(){
		return new List<apiMethodParam>{
			 new apiMethodParam{handle=Error_Get 	, httpMethods=new HttpMethod[]{HttpMethod.Get }}
			,new apiMethodParam{handle=Error_Post	, httpMethods=new HttpMethod[]{HttpMethod.Post}}
			,new apiMethodParam{handle=Error_Put	, httpMethods=new HttpMethod[]{HttpMethod.Put}}
			,new apiMethodParam{handle=Error_Delete, httpMethods=new HttpMethod[]{HttpMethod.Delete},routeComplement="/{IDX}"}
		};
	}


	[Authorize]
	public IResult Error_Get(HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{
			userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);

			Guid? SystemIDX			=getHeaderGuidValues(request.Headers,"SystemIDX");
			string? appProcessDesc	=getHeaderStringValues(request.Headers,"appProcessDesc");
			string? appLanguage		=getHeaderStringValues(request.Headers,"appLanguage");
			string? appMessage		=getHeaderStringValues(request.Headers,"appMessage");
			Guid? appUserID			=getHeaderGuidValues(request.Headers,"appUserID");
			Guid? appID					=getHeaderGuidValues(request.Headers,"appID");
			Guid? prevErrorID			=getHeaderGuidValues(request.Headers,"prevErrorID");
			string? AppExceptionType=getHeaderStringValues(request.Headers,"AppExceptionType");

			String? columnsOrderBy=getHeaderStringValues(request.Headers,"columnsOrderBy");
			Int32? pageNumber = getHeaderIntValues(request.Headers,"pageNumber");
			Int32? pageRowCount=getHeaderIntValues(request.Headers,"pageRowCount");

			List<EN_Error>? error_lst = BP_Errors.Select(Config,SystemIDX,appProcessDesc,appLanguage, appMessage, appUserID,appID,prevErrorID,
				columnsOrderBy,AppExceptionType,pageNumber,pageRowCount);
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=true,isError=false, tittle="Pesquisa de Usuário", dataList = error_lst});
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Pesquisa de Erros",ex,userAuthor,request);
		}
	}

	// inserir erros não precisa de autorização
	public IResult Error_Post([FromBody] EN_Error error,HttpRequest request){
		try{
			return ApiRoutePressets.returnResults(BP_Errors.Insert(Config,error));
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Pesquisa de Erros",ex,null,request);
		}
	}

	[Authorize]
	public IResult Error_Put([FromBody] EN_Error error,HttpRequest request){

		EN_ManagerUser userAuthor=null;
		try{
			userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);

			return ApiRoutePressets.returnResults(BP_Errors.Update(Config,error));
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Alteração de Erros",ex,userAuthor,request);
		}
	}

	[Authorize]
	public IResult Error_Delete([FromRoute] string IDX,HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{
			userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			Guid SystemIDX;
			if(!Guid.TryParse(IDX, out SystemIDX)){throw new Exception("ID inválido");}
			return ApiRoutePressets.returnResults(BP_Errors.Delete(Config,SystemIDX));
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Alteração de Erros",ex,userAuthor,request);
		}
	}
}
