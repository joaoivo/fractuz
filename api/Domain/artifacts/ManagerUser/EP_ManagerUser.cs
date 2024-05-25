
using Fractuz.System.Defaults.EndPoint;

using Fractuz.Domain.Users.BussinesPlan;
using Fractuz.Domain.Users.Entities;

using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;

namespace Fractuz.Domain.Users.EndPoints;
public class EP_ManagerUser:IEndPoint{
	public EP_ManagerUser(IConfiguration config) : base(config){}
	public override string Route (){ return @"/Admin/User";}
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
			List<EN_ManagerUser>? managerUser_lst = BP_ManagerUser.Select(Config);
			return ApiRoutePressets.returnResults(new EN_Return{code=0,tittle="Pesquisa de Usuário", dataList = managerUser_lst});
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	public IResult UserAPI_Post([FromBody] EN_ManagerUser managerUser){
		try{
			return ApiRoutePressets.returnResults(BP_ManagerUser.Insert(Config,managerUser));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	public IResult UserAPI_Put([FromBody] EN_ManagerUser managerUser){
		try{
			return ApiRoutePressets.returnResults(BP_ManagerUser.Update(Config,managerUser));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}

	public IResult UserAPI_Delete([FromBody] Guid SystemIDX){
		try{
			return ApiRoutePressets.returnResults(BP_ManagerUser.Delete(Config,SystemIDX));
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
}
