using Fractuz.Domain.Users.Entities;

public class EN_DefaultEntity{
	public Guid? SystemIDX {get; set;}
	public bool? SystemActive {get; set;} =true;
	public DateTime? SystemCreationDt {get; set;}=DateTime.Now;
	public Guid? SystemCreationUser {get; set;}
	public String? SystemCreationUserName {get; set;}=null;
	public String? SystemCreationUserMail {get; set;}=null;
	public DateTime? SystemLastUpdateDt {get; set;}=null;
	public Guid? SystemLastUpdateUser  {get; set;}=null;
	public String? SystemLastUpdateUserName  {get; set;}=null;
	public String? SystemLastUpdateUserMail  {get; set;}=null;
}
