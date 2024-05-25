using Fractuz.System.Defaults.EndPoint;

using Fractuz.Domain.AppDataBase.BussinesPlan;
using Fractuz.Domain.AppDataBase.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Fractuz.Domain.AppDataBase.EndPoints;
public class EP_AppDataBase:IEndPoint{
	public EP_AppDataBase(IConfiguration config) : base(config){}
	public override string Route (){ return @"/AppDataBase";}
	public override List<apiMethodParam> Methods(){
		return new List<apiMethodParam>{
			 new apiMethodParam{handle=AppDataBasesAPI_GetAdv	, httpMethods=new HttpMethod[]{HttpMethod.Get }, routeComplement="/adv/"}
			,new apiMethodParam{handle=AppDataBasesAPI_Get 		, httpMethods=new HttpMethod[]{HttpMethod.Get }, routeComplement="/{guid}"}
			,new apiMethodParam{handle=AppDataBasesAPI_Post		, httpMethods=new HttpMethod[]{HttpMethod.Post}}
			,new apiMethodParam{handle=AppDataBasesAPI_Put		, httpMethods=new HttpMethod[]{HttpMethod.Put}}
			,new apiMethodParam{handle=AppDataBasesAPI_Delete	, httpMethods=new HttpMethod[]{HttpMethod.Delete}}
		};
	}
	public IResult AppDataBasesAPI_GetAdv([FromQuery] string? queryGuid=null,[FromQuery] string? queryApplication=null,[FromQuery] string? queryDatabaseName=null	,[FromQuery] string? queryBuildOrder =null){
		try{
			Guid? guid=null;
			Guid? application=null;
			string? databaseName=null;
			int? buildOrder =null;

			List<EN_AppDataBase>? application_lst = BP_AppDataBase.Select(Config,guid, application, databaseName	,buildOrder);
			return ApiRoutePressets.returnResults(new EN_Return{code=0,tittle="Pesquisa de Usuário", dataList = application_lst});
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult AppDataBasesAPI_Get([FromRoute] Guid guid){
		try{
			List<EN_AppDataBase>? application_lst = BP_AppDataBase.Select(Config,guid);
			return ApiRoutePressets.returnResults(new EN_Return{code=0,tittle="Pesquisa de Usuário", dataList = application_lst});
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult AppDataBasesAPI_Post([FromBody] EN_AppDataBase application){
		try{
			return ApiRoutePressets.returnResults(BP_AppDataBase.Insert(Config,application));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult AppDataBasesAPI_Put([FromBody] EN_AppDataBase application){
		try{
			return ApiRoutePressets.returnResults(BP_AppDataBase.Update(Config,application));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult AppDataBasesAPI_Delete([FromBody] Guid SystemIDX){
		try{
			return ApiRoutePressets.returnResults(BP_AppDataBase.Delete(Config,SystemIDX));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
}
