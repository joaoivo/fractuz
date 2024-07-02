
using System.Xml.Serialization;

namespace Fractuz.System.Errors.EndPoints;
public class EN_Error{
	public Guid? SystemIDX {get; set;}=null;
	public string? AppProcessDesc {get; set;}=null;
	public string? AppLanguage {get; set;}=null;
	public string? AppMessage {get; set;}=null;
	public string? AppStackTrace {get; set;}=null;
	public Guid? AppID {get; set;}=null;
	public Guid? AppUserID {get; set;}=null;
	public Guid? PrevErrorID {get; set;}=null;
	public string? PageURL {get; set;}=null;
	public string? Request {get; set;}=null;
	public string? ExtraData {get; set;}=null;
	public DateTime? SystemCreationDt {get; set;}=DateTime.Now;
}

public class RequestData{
	public RequestData(){}
	public RequestData(HttpRequest request){
		Method = request.Method;
		Scheme = request.Scheme;
		Host = request.Host.Value;
		Path = request.Path;
		QueryString = request.QueryString.Value==null?"":request.QueryString.Value;
		Headers = request.Headers.ToDictionary(h => h.Key, h => h.Value.ToString());

		string body;
		using (var reader = new StreamReader(request.Body)){body = reader.ReadToEnd();}
		Body = body;
	}
	public string Method { get; set; }
	public string Scheme { get; set; }
	public string Host { get; set; }
	public string Path { get; set; }
	public string QueryString { get; set; }
	public Dictionary<string, string> Headers { get; set; }
	public string Body { get; set; }

	public string XMLSerialize {
		get {
			if(this==null){return "";}
			XmlSerializer xmlSerializer = new XmlSerializer(typeof(RequestData));
			using (var stringWriter = new StringWriter()){
				xmlSerializer.Serialize(stringWriter, this);
				var xml = stringWriter.ToString();
				return (xml);
			}
		}
	}
}
