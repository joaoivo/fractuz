using System.Linq;
using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
namespace Fractuz.System.Defaults.EndPoint;

public static class ApiRoutePressets{
	public static void LoadAPI(WebApplication app,IEndPoint endPoint){
		Console.WriteLine("Procedimento de carregar api");
		if(!APiRouteRulesValidator.valtidateAPI(app,endPoint)) {return;}

		//app.MapMethods(EP_Product.Route,new [] {HttpMethods.Get.ToString()},EP_Product.getProduct);
		foreach(apiMethodParam apiEndPoint in endPoint.Methods()){
			if(apiEndPoint.handle==null){continue;}
			Console.Write("Mapeando EndPoint: "+endPoint.Route()+(apiEndPoint.routeComplement==null?"":apiEndPoint.routeComplement)+ "  ("+String.Join(", ", apiEndPoint.httpMethodsStringList)+")");
			app.MapMethods(endPoint.Route()+(apiEndPoint.routeComplement==null?"":apiEndPoint.routeComplement)
				,apiEndPoint.httpMethodsStringList
				,apiEndPoint.handle);
			Console.WriteLine(" -OK");
		}
	}

	public static IResult returnResults(EN_Return result_en, string operation=""){

		if(result_en==null){
			return Results.BadRequest("Operação não efetuada: "+operation);
		}else if(result_en.isError==null?false:result_en.isError==true){
			return Results.Problem(result_en.description,null,500,result_en.tittle,null,new Dictionary<string,object?>(){ {"errorId",result_en.errorID} });
		}else{
			JsonSerializerOptions jsonOptions =new JsonSerializerOptions { WriteIndented = true, IgnoreReadOnlyFields =true, AllowTrailingCommas =false };
			string data = JsonSerializer.Serialize<EN_Return>(result_en,jsonOptions);
			return Results.Ok(JsonObject.Parse(data));
		}
	}
}
