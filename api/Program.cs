using System.Text;
using Fractuz.Domain.AppDataBase.EndPoints;
using Fractuz.Domain.AppDbTableFields.EndPoints;
using Fractuz.Domain.AppDbTables.EndPoints;
using Fractuz.Domain.Applications.EndPoints;
using Fractuz.Domain.Users.EndPoints;

using Fractuz.System.Defaults.EndPoint;
using Fractuz.System.Errors.EndPoints;
using Fractuz.System.Login.EndPoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.IdentityModel.Tokens;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);


builder.Services.AddAuthentication(cfg => {
	cfg.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	cfg.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
	cfg.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x => {
	x.RequireHttpsMetadata = false;
	x.SaveToken = false;
	x.TokenValidationParameters = new TokenValidationParameters {
		ValidateIssuerSigningKey = true,
		IssuerSigningKey = new SymmetricSecurityKey(
			Encoding.UTF8.GetBytes(builder.Configuration["ApplicationSettings:JWT_Secret"])
		),
		ValidateIssuer = false,
		ValidateAudience = false,
		ClockSkew = TimeSpan.Zero
   };
});
builder.Services.AddAuthorization();

builder.Services.AddCors(options =>{
	options.AddDefaultPolicy(builder =>{
		builder.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader();
	});
});

builder.Services.Configure<KestrelServerOptions>(options =>{
	options.AllowSynchronousIO = true;
});

builder.Services.Configure<IISServerOptions>(options =>{
	options.AllowSynchronousIO = true;
});

WebApplication app = builder.Build();
if(app.Environment.IsDevelopment()){
	Console.WriteLine("ATENÇÃO! Sistema rodando em Configuração Desenvolvimento");
}else{
	Console.WriteLine("Não é Configuração de Desenvolvimento");
}

app.UseCors();
ApiRoutePressets.LoadAPI(app,new EP_Login(builder.Configuration));
ApiRoutePressets.LoadAPI(app,new EP_ManagerUser(builder.Configuration));
ApiRoutePressets.LoadAPI(app,new EP_Application(builder.Configuration));
ApiRoutePressets.LoadAPI(app,new EP_AppDataBase(builder.Configuration));
ApiRoutePressets.LoadAPI(app,new EP_AppDbTable(builder.Configuration));
ApiRoutePressets.LoadAPI(app,new EP_AppDbTableField(builder.Configuration));
ApiRoutePressets.LoadAPI(app,new EP_Errors(builder.Configuration));

app.UseAuthentication();
app.UseAuthorization();

app.Run();
