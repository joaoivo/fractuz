using Fractuz.Domain.Users.EndPoints;
using Fractuz.System.Defaults.EndPoint;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>{
    options.AddDefaultPolicy(builder =>    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

WebApplication app = builder.Build();
if(app.Environment.IsDevelopment()){
	Console.WriteLine("ATENÇÃO! Sistema rodando em Configuração Desenvolvimento");
}else{
	Console.WriteLine("Não é Configuração de Desenvolvimento");
}
ApiRoutePressets.LoadAPI(app,new EP_ManagerUser(builder.Configuration));

app.Run();
