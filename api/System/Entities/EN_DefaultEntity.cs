public class EN_DefaultEntity{
	public Guid SystemIDX {get; set;}
	public bool SystemActive {get; set;} =true;
	public DateTime SystemCreationDt {get; set;}=DateTime.Now;
	public Guid SystemCreationUser {get; set;}
	public DateTime? SystemLastUpdateDt {get; set;}=null;
	public Guid? SystemLastUpdateUser  {get; set;}=null;
}
