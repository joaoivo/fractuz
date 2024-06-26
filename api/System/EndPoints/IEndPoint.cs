namespace Fractuz.System.Defaults.EndPoint;

using global::System.Net;
using Microsoft.AspNetCore.Http;
public abstract class IEndPoint{
	protected IConfiguration Config;
	public abstract string Route();
	public abstract List<apiMethodParam> Methods();
	public IEndPoint(IConfiguration config){
		Config = config;
	}
	public string? getHeaderStringValues(IHeaderDictionary headers, string key){
		if(headers.ContainsKey(key)){
			if(headers[key].Count() == 1){return WebUtility.UrlDecode(headers[key].ToString());}
			else{return WebUtility.UrlDecode(headers[key][0]?.ToString());}
		}
		return null;
	}
	public Guid? getHeaderGuidValues(IHeaderDictionary headers, string key){
		string? getHeaderVars = getHeaderStringValues(headers,key);
		if(Guid.TryParse(getHeaderVars, out Guid value)){return value;}
		return null;
	}
	public Int32? getHeaderIntValues(IHeaderDictionary headers, string key){
		string? getHeaderVars = getHeaderStringValues(headers,key);
		if(Int32.TryParse(getHeaderVars, out Int32 value)){return value;}
		return null;
	}
}


