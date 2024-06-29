using Fractuz.System.Defaults.EndPoint;

using Fractuz.Domain.AppDataBase.BussinesPlan;
using Fractuz.Domain.AppDataBase.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Fractuz.Domain.Users.Entities;
using api.System.jwt;
using Fractuz.System.Errors.BussinesPlan;

namespace Fractuz.Domain.AppDataBase.EndPoints;
public class EP_AppDataBase:IEndPoint{
	public EP_AppDataBase(IConfiguration config) : base(config){}
	public override string Route (){ return @"/AppDataBase";}
	public override List<apiMethodParam> Methods(){
		return new List<apiMethodParam>{
			 new apiMethodParam{handle=AppDataBasesAPI_GetAdv	, httpMethods=new HttpMethod[]{HttpMethod.Get }, routeComplement="/adv/"}
			,new apiMethodParam{handle=AppDataBasesAPI_Get 		, httpMethods=new HttpMethod[]{HttpMethod.Get }}
			,new apiMethodParam{handle=AppDataBasesAPI_Post		, httpMethods=new HttpMethod[]{HttpMethod.Post}}
			,new apiMethodParam{handle=AppDataBasesAPI_Put		, httpMethods=new HttpMethod[]{HttpMethod.Put}}
			,new apiMethodParam{handle=AppDataBasesAPI_Delete	, httpMethods=new HttpMethod[]{HttpMethod.Delete},routeComplement="/{IDX}"}
		};
	}
	public IResult AppDataBasesAPI_GetAdv(HttpRequest request,[FromQuery] string? queryGuid=null,[FromQuery] string? queryApplication=null,[FromQuery] string? queryDatabaseName=null	,[FromQuery] string? queryBuildOrder =null){
		EN_ManagerUser userAuthor=null;
		try{
			userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			Guid? guid=null;
			Guid? application=null;
			string? databaseName=null;
			string? databaseDescription=null;
			int? buildOrder =null;

			List<EN_AppDataBase>? application_lst = BP_AppDataBase.Select(Config,guid, application, databaseName,databaseDescription	,buildOrder);
			return ApiRoutePressets.returnResults(new EN_Return{isSuccess=true,isError=false,tittle="Pesquisa de Usuário", dataList = application_lst, author = userAuthor});
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Pesquisa avançada de bases de dados",ex,userAuthor);
		}
	}

	[Authorize]
	public IResult AppDataBasesAPI_Get(HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{

			Guid? ApplicationIDX=getHeaderGuidValues(request.Headers,"Application");
			Guid? SystemIDX=getHeaderGuidValues(request.Headers,"SystemIDX");
			String? Name=getHeaderStringValues(request.Headers,"Name");
			String? Description=getHeaderStringValues(request.Headers,"Description");
			int? buildOrder=getHeaderIntValues(request.Headers,"buildOrder");

			String? columnsOrderBy=getHeaderStringValues(request.Headers,"columnsOrderBy");
			Int32? pageNumber = getHeaderIntValues(request.Headers,"pageNumber");
			Int32? pageRowCount=getHeaderIntValues(request.Headers,"pageRowCount");

			userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);

			List<EN_AppDataBase>? application_lst = BP_AppDataBase.Select(Config,SystemIDX,ApplicationIDX,Name,Description,buildOrder,columnsOrderBy,pageNumber,pageRowCount);
			return ApiRoutePressets.returnResults(new EN_Return{isSuccess=true,isError=false,tittle="Pesquisa de Usuário", dataList = application_lst, author = userAuthor});
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Pesquisa de bases de dados",ex,userAuthor);
		}
	}

	[Authorize]
	public IResult AppDataBasesAPI_Post([FromBody] EN_AppDataBase application,HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{
			userAuthor= JWTTokensManager.GetUserByBearerToken(request,Config);
			return ApiRoutePressets.returnResults(BP_AppDataBase.Insert(Config,application,userAuthor));
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Adição de bases de dados",ex,userAuthor);
		}
	}

	[Authorize]
	public IResult AppDataBasesAPI_Put([FromBody] EN_AppDataBase application,HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{
			userAuthor= JWTTokensManager.GetUserByBearerToken(request,Config);
			return ApiRoutePressets.returnResults(BP_AppDataBase.Update(Config,application,userAuthor));
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Alteração de bases de dados",ex,userAuthor);
		}
	}

	[Authorize]
	public IResult AppDataBasesAPI_Delete([FromRoute] string IDX,HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{
			Guid SystemIDX;
			userAuthor= JWTTokensManager.GetUserByBearerToken(request,Config);
			if(!Guid.TryParse(IDX, out SystemIDX)){throw new Exception("ID inválido");}
			return ApiRoutePressets.returnResults(BP_AppDataBase.Delete(Config,SystemIDX,JWTTokensManager.GetUserByBearerToken(request,Config)));
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Alteração de bases de dados",ex,userAuthor);
		}
	}
}
