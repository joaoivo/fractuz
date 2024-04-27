namespace Fractuz.Domain.Product.Entities;
public class EN_ManagerUser: EN_DefaultEntity{

	public string? ParticName {get; set;}=null;
	public string? ParticMail {get; set;}=null;
	public string? ParticPass {get; set;}=null;
	public bool? IsAdm {get; set;} =null;
}
