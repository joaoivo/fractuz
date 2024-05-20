
namespace Fractuz.Domain.AppDataBase.Entities;
public class EN_AppDataBase: EN_DefaultEntity{
	public Guid? Application {get; set;}=null;
	public string? DatabaseName {get; set;}=null;
	public int? BuildOrder {get; set;}=null;
}
