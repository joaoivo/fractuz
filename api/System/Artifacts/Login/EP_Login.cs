
using api.System.jwt;
using Fractuz.Domain.Users.BussinesPlan;
using Fractuz.Domain.Users.Entities;
using Fractuz.System.Defaults.EndPoint;

namespace Fractuz.System.Login.EndPoints;
public class EP_Login:IEndPoint{
	public EP_Login(IConfiguration config) : base(config){}
	public override string Route (){ return @"/Login";}

	public override List<apiMethodParam> Methods(){
		return new List<apiMethodParam>{
			 new apiMethodParam{handle=SystemLogin_Get 	, httpMethods=new HttpMethod[]{HttpMethod.Get }}
		};
	}

	public IResult SystemLogin_Get(HttpRequest request){
		try{
			string particMail = request.Headers["mail"].ToString();
			string particPass = request.Headers["pass"].ToString();
			List<EN_ManagerUser>? managerUser_lst = BP_ManagerUser.Login(Config,particMail,particPass);
			if(managerUser_lst==null){return ApiRoutePressets.returnResults(new EN_Return{code=1,tittle="Login de Usuário",description="Sem resultado de login", dataList = {}});}
			if(managerUser_lst.Count!=1){
				if(managerUser_lst.Count<=0){return ApiRoutePressets.returnResults(new EN_Return{code=1,tittle="Login de Usuário",description="Email não encontrado", dataList = {}});}
				else{return ApiRoutePressets.returnResults(new EN_Return{code=1,tittle="Login de Usuário",description="Email não confuso", dataList = {}});}
			}
			return ApiRoutePressets.returnResults(new EN_Return{code=0,tittle="Pesquisa de Usuário", dataList = new List<Object>{
				new {
					 token=	JWTTokensManager.GenerateJWTToken(managerUser_lst[0],Config)
					,name=	managerUser_lst[0].ParticName
					,mail=	managerUser_lst[0].ParticMail
				}
			}});
		}catch(Exception ex){
			return ApiRoutePressets.returnResults(new EN_Return{code=99, tittle="Erro de Runtime", description="Comando não executado: "+ex.Message + " em \n " +ex.StackTrace});
		}
	}
}
