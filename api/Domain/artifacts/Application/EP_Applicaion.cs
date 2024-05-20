using Fractuz.System.Defaults.EndPoint;

using Microsoft.AspNetCore.Mvc;
using Fractuz.Domain.Applications.Entities;
using Fractuz.Domain.Applications.BussinesPlan;

namespace Fractuz.Domain.Applications.EndPoints;
public class EP_Application:IEndPoint{
	public EP_Application(IConfiguration config) : base(config){}
	public override string Route (){ return @"/Applications";}
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
			List<EN_Application>? application_lst = BP_Application.Select(Config);
			return ApiRoutePressets.returnResults(new EN_Return{code=0,tittle="Pesquisa de Usuário", dataList = application_lst});
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
	public IResult UserAPI_Post([FromBody] EN_Application application){
		try{
			return ApiRoutePressets.returnResults(BP_Application.Insert(Config,application));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
	public IResult UserAPI_Put([FromBody] EN_Application application){
		try{
			return ApiRoutePressets.returnResults(BP_Application.Update(Config,application));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
	public IResult UserAPI_Delete([FromBody] Guid SystemIDX){
		try{
			return ApiRoutePressets.returnResults(BP_Application.Delete(Config,SystemIDX));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
}
