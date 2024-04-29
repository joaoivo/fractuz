using Fractuz.Domain.ContextDb;
using Fractuz.Domain.Users.EndPoints;
using Fractuz.System.Defaults.EndPoint;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSqlServer<ApplicationDbContext>(builder.Configuration["Database:Default"]);
WebApplication app = builder.Build();
if(app.Environment.IsDevelopment()){
	Console.WriteLine("ATENÇÃO! Sistema rodando em Configuração Desenvolvimento");
}else{
	Console.WriteLine("Não é Configuração de Desenvolvimento");
}
ApiRouteLoader.LoadAPI(app,new EP_ManagerUser());

app.Run();
