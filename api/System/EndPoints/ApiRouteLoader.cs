using System.Linq;
namespace Fractuz.System.Defaults.EndPoint;

public static class ApiRouteLoader{
	public static void LoadAPI(WebApplication app,IEndPoint endPoint){
		Console.WriteLine("Procedimento de carregar api");
		if(!APiRouteRulesValidator.valtidateAPI(app,endPoint)) {return;}

		//app.MapMethods(EP_Product.Route,new [] {HttpMethods.Get.ToString()},EP_Product.getProduct);
		foreach(apiMethodParam apiEndPoint in endPoint.Methods()){
			if(apiEndPoint.handle==null){continue;}
			Console.WriteLine("Mapeando EndPoint: "+endPoint.Route()+(apiEndPoint.routeComplement==null?"":apiEndPoint.routeComplement)+ "  ("+String.Join(", ", apiEndPoint.httpMethodsStringList)+")");
			app.MapMethods(endPoint.Route()+(apiEndPoint.routeComplement==null?"":apiEndPoint.routeComplement),apiEndPoint.httpMethodsStringList,apiEndPoint.handle);
		}
	}
}
