
using Fractuz.System.Defaults.EndPoint;
using Fractuz.Domain.Users.Entities;
using Fractuz.Domain.ContextDb;

using Microsoft.AspNetCore.Mvc;
namespace Fractuz.Domain.Users.EndPoints;
public class EP_ManagerUser:IEndPoint{
	public string Route (){ return @"/Admin/Users";}
	public List<apiMethodParam> Methods(){
		return new List<apiMethodParam>{
			 new apiMethodParam{handle=UserAPI_Get , httpMethods=new HttpMethod[]{HttpMethod.Get }}
			,new apiMethodParam{handle=UserAPI_Post, httpMethods=new HttpMethod[]{HttpMethod.Post}}
		};
	}

	public static IResult UserAPI_Get([FromBody] dynamic requestBody,HttpContext httpContext, ApplicationDbContext context){
		try{
			return ApiRoutePressets.returnResults(new EN_Return());
		}catch(Exception ex){
			return ApiRoutePressets.returnResults( new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
	public static IResult UserAPI_Post([FromBody] dynamic requestBody,HttpContext httpContext, ApplicationDbContext context){
		return Results.Ok("requestPostBody");
	}
}
