
using Fractuz.System.Defaults.EndPoint;

using Fractuz.Domain.Users.BussinesPlan;
using Fractuz.Domain.Users.Entities;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using api.System.jwt;
using Fractuz.System.Errors.BussinesPlan;

namespace Fractuz.Domain.Users.EndPoints;
public class EP_ManagerUser:IEndPoint{
	public EP_ManagerUser(IConfiguration config) : base(config){}
	public override string Route (){ return @"/Admin/User";}
	public override List<apiMethodParam> Methods(){
		return new List<apiMethodParam>{
			 new apiMethodParam{handle=UserAPI_Get 	, httpMethods=new HttpMethod[]{HttpMethod.Get }}
			,new apiMethodParam{handle=UserAPI_Post	, httpMethods=new HttpMethod[]{HttpMethod.Post}}
			,new apiMethodParam{handle=UserAPI_Put		, httpMethods=new HttpMethod[]{HttpMethod.Put}}
			,new apiMethodParam{handle=UserAPI_Delete	, httpMethods=new HttpMethod[]{HttpMethod.Delete},routeComplement="/{IDX}"}
		};
	}

	[Authorize]
	public IResult UserAPI_Get(HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{
			userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			List<EN_ManagerUser>? managerUser_lst = BP_ManagerUser.Select(Config);
			return ApiRoutePressets.returnResults( new EN_Return{isSuccess=true,isError=false, tittle="Pesquisa de Usuário", dataList = managerUser_lst, author = userAuthor});
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Pesquisa de Usuários",ex,userAuthor,request);
		}
	}

	[Authorize]
	public IResult UserAPI_Post([FromBody] EN_ManagerUser managerUser,HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{
			userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			return ApiRoutePressets.returnResults(BP_ManagerUser.Insert(Config,managerUser,userAuthor));
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Adição de Usuários",ex,userAuthor,request);
		}
	}

	[Authorize]
	public IResult UserAPI_Put([FromBody] EN_ManagerUser managerUser,HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{
			userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			return ApiRoutePressets.returnResults(BP_ManagerUser.Update(Config,managerUser,userAuthor));
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Atualização de Usuários",ex,userAuthor,request);
		}
	}

	[Authorize]
	public IResult UserAPI_Delete([FromRoute] string IDX,HttpRequest request){
		EN_ManagerUser userAuthor=null;
		try{
			userAuthor = JWTTokensManager.GetUserByBearerToken(request,Config);
			Guid SystemIDX;
			if(!Guid.TryParse(IDX, out SystemIDX)){throw new Exception("ID inválido");}
			return ApiRoutePressets.returnResults(BP_ManagerUser.Delete(Config,SystemIDX,userAuthor));
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Exclusão de Usuários",ex,userAuthor,request);
		}
	}
}
