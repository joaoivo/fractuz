var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => new {
	 Name="nome do produto"
	,description="descrição"
	,price=10.00
});
app.MapPost("/",()=>"post");
app.MapPut("/",()=>"post");
app.MapDelete("/",()=>"post");
app.MapGet("/header",(HttpResponse response)=>
	response.Headers.Add("[nome do response]","[valor do response]"));

app.Run();
