using Fractuz.System.Defaults.EndPoint;

using Fractuz.Domain.AppDbTableFields.BussinesPlan;
using Fractuz.Domain.AppDbTableFields.Entities;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Fractuz.Domain.AppDbTableFields.EndPoints;
public class EP_AppDbTableField:IEndPoint{
	public EP_AppDbTableField(IConfiguration config) : base(config){}
	public override string Route (){ return @"/AppDbTableField";}
	public override List<apiMethodParam> Methods(){
		return new List<apiMethodParam>{
			 new apiMethodParam{handle=AppDbTableFieldAPI_Get 	, httpMethods=new HttpMethod[]{HttpMethod.Get }}
			,new apiMethodParam{handle=AppDbTableFieldAPI_Post	, httpMethods=new HttpMethod[]{HttpMethod.Post}}
			,new apiMethodParam{handle=AppDbTableFieldAPI_Put		, httpMethods=new HttpMethod[]{HttpMethod.Put}}
			,new apiMethodParam{handle=AppDbTableFieldAPI_Delete	, httpMethods=new HttpMethod[]{HttpMethod.Delete}}
		};
	}

	[Authorize]
	public IResult AppDbTableFieldAPI_Get([FromBody] dynamic? requestBody=null){
		try{
			List<EN_AppDbTableField>? application_lst = BP_AppDbTableField.Select(Config);
			return ApiRoutePressets.returnResults(new EN_Return{code=0,tittle="Pesquisa de Usuário", dataList = application_lst});
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult AppDbTableFieldAPI_Post([FromBody] EN_AppDbTableField application){
		try{
			return ApiRoutePressets.returnResults(BP_AppDbTableField.Insert(Config,application));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult AppDbTableFieldAPI_Put([FromBody] EN_AppDbTableField application){
		try{
			return ApiRoutePressets.returnResults(BP_AppDbTableField.Update(Config,application));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	[Authorize]
	public IResult AppDbTableFieldAPI_Delete([FromBody] Guid SystemIDX){
		try{
			return ApiRoutePressets.returnResults(BP_AppDbTableField.Delete(Config,SystemIDX));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
}
