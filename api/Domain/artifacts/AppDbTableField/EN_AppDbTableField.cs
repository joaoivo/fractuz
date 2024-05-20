
namespace Fractuz.Domain.AppDbTableFields.Entities;
public class EN_AppDbTableField: EN_DefaultEntity{
	public Guid? FieldTable {get; set;}=null;
	public string? FieldName {get; set;}=null;
	public string? FieldDescription {get; set;}=null;
	public string? FieldDbDataType {get; set;}=null;
	public int? FieldDbDataSize {get; set;}=null;
	public int? FieldDbDataSizeDecimel {get; set;}=null;
	public bool IsPrimaryKey {get; set;}=false;
	public bool IsAllowNull {get; set;}=false;
	public bool IsUnique {get; set;}=false;
	public bool IsInsigned {get; set;}=false;
	public string? FieldDefaultValue {get; set;}=null;
	public Guid? ConstraintField {get; set;}=null;
	public string? AppDataType {get; set;}=null;
	public string? AppDataNickname {get; set;}=null;
}
