
using api.System.jwt;
using Fractuz.Domain.Users.BussinesPlan;
using Fractuz.Domain.Users.Entities;
using Fractuz.System.Defaults.EndPoint;
using Fractuz.System.Errors.BussinesPlan;

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
			string particMail = getHeaderStringValues(request.Headers,"mail");
			string particPass = getHeaderStringValues(request.Headers,"pass");
			List<EN_ManagerUser>? managerUser_lst = BP_ManagerUser.Login(Config,particMail,particPass);
			if(managerUser_lst==null){return ApiRoutePressets.returnResults(new EN_Return{isSuccess=false,isError=false,tittle="Login de Usuário",description="Sem resultado de login", dataList = {}});}
			if(managerUser_lst.Count!=1){
				if(managerUser_lst.Count<=0){return ApiRoutePressets.returnResults(new EN_Return{isSuccess=false,isError=false,tittle="Login de Usuário",description="Email não encontrado", dataList = {}});}
				else{return ApiRoutePressets.returnResults(new EN_Return{isSuccess=false,isError=false,tittle="Login de Usuário",description="Cadastro de Email confuso", dataList = {}});}
			}
			return ApiRoutePressets.returnResults(new EN_Return{isSuccess=true,isError=false,tittle="Pesquisa de Usuário", dataList = new List<Object>{
				new {
					 token	=	JWTTokensManager.GenerateJWTToken(managerUser_lst[0],Config)
					,name		=	managerUser_lst[0].ParticName
					,mail		=	managerUser_lst[0].ParticMail
					,userID 	=	managerUser_lst[0].SystemIDX
				}
			}});
		}catch(Exception ex){
			return BP_Errors.registerInnerExceptionAndTreat(Config,"Login de Usuário",ex,null,request);
		}
	}
}
