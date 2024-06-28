
using Fractuz.System.Defaults.EndPoint;

using Fractuz.System.Errors.BussinesPlan;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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
		try{
			List<EN_Error>? error_lst = BP_Errors.Select(Config);
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=true,isError=false, tittle="Pesquisa de Usuário", dataList = error_lst});
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime"		, description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult Error_Post([FromBody] EN_Error error,HttpRequest request){
		try{
			return ApiRoutePressets.returnResults(BP_Errors.Insert(Config,error));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult Error_Put([FromBody] EN_Error error,HttpRequest request){
		try{
			return ApiRoutePressets.returnResults(BP_Errors.Update(Config,error));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true,tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult Error_Delete([FromRoute] string IDX,HttpRequest request){
		try{
			Guid SystemIDX;
			if(!Guid.TryParse(IDX, out SystemIDX)){throw new Exception("ID inválido");}
			return ApiRoutePressets.returnResults(BP_Errors.Delete(Config,SystemIDX));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=false,isError=true, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
}
