namespace Fractuz.System.Defaults.EndPoint;
public static class APiRouteRulesValidator{
	public static bool valtidateAPI(WebApplication app,IEndPoint endPoint){
		if(endPoint==null){
			Console.WriteLine("Nenhuma rota carregada! Objeto [endPoint] não instanciado");
			return false;
		}
		if(app==null){
			Console.WriteLine("Nenhuma rota carregada de "+endPoint.ToString()+"! Objeto [app] não instanciado");
			return false;
		}

		List<string> messagesError_list = new List<string>();
		if(string.IsNullOrWhiteSpace(endPoint.Route())){messagesError_list.Add("Nenhuma rota raiz configurada");}
		if(endPoint.Methods()==null){messagesError_list.Add("Não há Rotas de API listadas.Lista Nula");}
		else if(endPoint.Methods().Count<=0){messagesError_list.Add("Não há Rotas de API listadas em ");}
		else{foreach(apiMethodParam api in endPoint.Methods()){
			List<string> messagesAPIError_list = api.getInvalidProps();
			if(messagesAPIError_list.Count>0){
				messagesError_list.Add("API de "+endPoint.ToString()+" methods("+String.Join(",",api.httpMethodsStringList)+") com o(s) seguinte(s) problema(s):");
				messagesError_list.AddRange(messagesAPIError_list);}
			}
		}

		if(messagesError_list.Count>0){
			Console.WriteLine(messagesError_list.Count.ToString()+" problema(s) encontrados em "+endPoint.ToString()+":");
			foreach(string message in messagesError_list){Console.WriteLine(message);}
			return false;
		}
		return true;
	}
}
