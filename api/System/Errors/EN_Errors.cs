
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
	public string? ExtraData {get; set;}=null;
}
