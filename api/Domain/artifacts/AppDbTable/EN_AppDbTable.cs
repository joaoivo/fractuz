namespace Fractuz.Domain.AppDbTable.Entities;
public class EN_AppDbTable: EN_DefaultEntity{
	public Guid? TableDatabase {get; set;}=null;
	public int? TableBuiltOrder {get; set;}=null;
	public string? TableName {get; set;}=null;
	public string? TableDescription {get; set;}=null;
	public string? FieldPrefix {get; set;}=null;
	public bool TableHistory {get; set;}=false;
}
