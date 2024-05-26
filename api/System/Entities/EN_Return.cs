using Fractuz.Domain.Users.Entities;

public class EN_Return{
	public Guid? id {get; set;}= null ;
	public string? authorName {get; set;} = null;
	public string? authorMail {get; set;} = null;
	public int? code {get; set;} = null;
	public string? tittle {get; set;} = null;
	public string? description {get; set;} = null;
	public DateTime? timeStamp {get; set;} = DateTime.Now;
	public IEnumerable<object>? dataList {get; set;} =null;
	public EN_ManagerUser author{
		set{
			this.authorName = value.ParticName;
			this.authorMail = value.ParticMail;
		}
	}
}
