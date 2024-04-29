using System.Reflection.Metadata;

public class apiMethodParam{
	public HttpMethod[]? httpMethods {get; set;}=null;
	public List<string> httpMethodsStringList{
		get{
			List<string> httpMethodString_lst = new List<string>();
			if(this.httpMethods !=null && this.httpMethods.Count()>0){
				foreach(HttpMethod httpMethod in this.httpMethods){
					if(httpMethod==null){continue;}
					httpMethodString_lst.Add(httpMethod.ToString());
				}
			}

			return httpMethodString_lst;
		}
	}
	public Delegate? handle {get; set;}=null;
	public string? routeComplement=null;
	public List<string> getInvalidProps(){
		List<string> messagesError_list = new List<string>();
		List<string> allowedChars_list = new List<string>{"abcefghijklmnopqrstuvwxyz0123456789/_-=?%&"};

		if(this.handle==null){messagesError_list.Add("Não há método atribuído a este EndPoint");}
		if(this.httpMethods==null){messagesError_list.Add("Não há método HTTPS atribuído a este EndPoint");}

		return messagesError_list;
	}
}
