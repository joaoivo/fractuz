
namespace Fractuz.Domain.AppDataBases.Entities;
public class EN_AppDataBases: EN_DefaultEntity{
	public Guid? Application {get; set;}=null;
	public string? DatabaseName {get; set;}=null;
	public int? BuildOrder {get; set;}=null;
}
