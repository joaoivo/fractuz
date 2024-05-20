using Fractuz.System.Defaults.EndPoint;

using Fractuz.Domain.AppDbTable.BussinesPlan;
using Fractuz.Domain.AppDbTable.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Fractuz.Domain.AppDbTable.EndPoints;
public class EP_AppDbTable:IEndPoint{
	public EP_AppDbTable(IConfiguration config) : base(config){}
	public override string Route (){ return @"/AppDbTables";}
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
			List<EN_AppDbTable>? application_lst = BP_AppDbTable.Select(Config);
			return ApiRoutePressets.returnResults(new EN_Return{code=0,tittle="Pesquisa de Usuário", dataList = application_lst});
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
	public IResult UserAPI_Post([FromBody] EN_AppDbTable application){
		try{
			return ApiRoutePressets.returnResults(BP_AppDbTable.Insert(Config,application));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
	public IResult UserAPI_Put([FromBody] EN_AppDbTable application){
		try{
			return ApiRoutePressets.returnResults(BP_AppDbTable.Update(Config,application));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
	public IResult UserAPI_Delete([FromBody] Guid SystemIDX){
		try{
			return ApiRoutePressets.returnResults(BP_AppDbTable.Delete(Config,SystemIDX));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
}
