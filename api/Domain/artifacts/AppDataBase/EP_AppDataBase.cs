using Fractuz.System.Defaults.EndPoint;

using Fractuz.Domain.AppDataBase.BussinesPlan;
using Fractuz.Domain.AppDataBase.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Fractuz.Domain.AppDataBase.EndPoints;
public class EP_AppDataBase:IEndPoint{
	public EP_AppDataBase(IConfiguration config) : base(config){}
	public override string Route (){ return @"/AppDataBases";}
	public override List<apiMethodParam> Methods(){
		return new List<apiMethodParam>{
			 new apiMethodParam{handle=UserAPI_Get 	, httpMethods=new HttpMethod[]{HttpMethod.Get }}
			,new apiMethodParam{handle=UserAPI_Post	, httpMethods=new HttpMethod[]{HttpMethod.Post}}
			,new apiMethodParam{handle=UserAPI_Put		, httpMethods=new HttpMethod[]{HttpMethod.Put}}
			,new apiMethodParam{handle=UserAPI_Delete	, httpMethods=new HttpMethod[]{HttpMethod.Delete}}
		};
	}

	public IResult UserAPI_Get([FromBody] dynamic? requestBody=null){
		try{
			List<EN_AppDataBase>? application_lst = BP_AppDataBase.Select(Config);
			return ApiRoutePressets.returnResults(new EN_Return{code=0,tittle="Pesquisa de Usuário", dataList = application_lst});
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
	public IResult UserAPI_Post([FromBody] EN_AppDataBase application){
		try{
			return ApiRoutePressets.returnResults(BP_AppDataBase.Insert(Config,application));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
	public IResult UserAPI_Put([FromBody] EN_AppDataBase application){
		try{
			return ApiRoutePressets.returnResults(BP_AppDataBase.Update(Config,application));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
	public IResult UserAPI_Delete([FromBody] Guid SystemIDX){
		try{
			return ApiRoutePressets.returnResults(BP_AppDataBase.Delete(Config,SystemIDX));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
}
