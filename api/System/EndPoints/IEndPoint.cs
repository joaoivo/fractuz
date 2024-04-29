namespace Fractuz.System.Defaults.EndPoint;
using Microsoft.AspNetCore.Http;
public interface IEndPoint{
	public string Route();
	public List<apiMethodParam> Methods();
}


