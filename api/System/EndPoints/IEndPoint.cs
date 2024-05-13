namespace Fractuz.System.Defaults.EndPoint;
using Microsoft.AspNetCore.Http;
public abstract class IEndPoint{
	protected IConfiguration Config;
	public abstract string Route();
	public abstract List<apiMethodParam> Methods();
	public IEndPoint(IConfiguration config){
		Config = config;
	}
}


