
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
		return Results.Ok("requestGetBody");
	}
	public static IResult UserAPI_Post([FromBody] dynamic requestBody,HttpContext httpContext, ApplicationDbContext context){
		return Results.Ok("requestPostBody");
	}
}
