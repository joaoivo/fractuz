using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Fractuz.Domain.Users.Entities;
using Microsoft.IdentityModel.Tokens;
using Fractuz.System.Security;

namespace api.System.jwt;

public static class JWTTokensManager{
	public static string  GenerateJWTToken(EN_ManagerUser user,IConfiguration config) {
		string currentUTC =DateTime.UtcNow.ToString("yyyyMMddHHmmss");

		SimpleCrypto crypto = new SimpleCrypto(currentUTC,config);

		string userID = (user.SystemIDX??Guid.Empty).ToString();
		var claims = new List<Claim> {
			 new Claim(ClaimTypes.NameIdentifier, crypto.Encrypt(userID))
			,new Claim(ClaimTypes.Name, user.ParticName??"")
			,new Claim(ClaimTypes.Email, user.ParticMail??"")
			,new Claim("IsAdm", user.IsAdm==null?"0":(user.IsAdm==true?"1":"0"))
			,new Claim("DateTime", currentUTC)
		};

		JwtSecurityToken jwtToken = new JwtSecurityToken(
			claims: claims,
			notBefore: DateTime.UtcNow,
			expires: DateTime.UtcNow.AddHours(2),
			signingCredentials: new SigningCredentials(
				new SymmetricSecurityKey(
					Encoding.UTF8.GetBytes(config["ApplicationSettings:JWT_Secret"]??"")
				),
				SecurityAlgorithms.HmacSha256Signature)
			);
		return new JwtSecurityTokenHandler().WriteToken(jwtToken);
	}
	public static EN_ManagerUser GetUserByBearerToken(HttpRequest request,IConfiguration config){
		EN_ManagerUser user = new EN_ManagerUser();
		var authorizationHeader = request.Headers["Authorization"].FirstOrDefault();
		if (authorizationHeader != null && authorizationHeader.StartsWith("Bearer ")){
			var token = authorizationHeader.Substring("Bearer ".Length).Trim();
			var handler = new JwtSecurityTokenHandler();
			var jsonToken = handler.ReadToken(token) as JwtSecurityToken;
			if (jsonToken == null){ throw new JwtTokenInvalidException("json Token nulo"); }

			Guid guid;
			Int16 IsAdm;

			string currentUTC =(jsonToken.Payload["DateTime"] ?? "").ToString();
			//,new Claim("DateTime", currentUTC)
			SimpleCrypto crypto = new SimpleCrypto(currentUTC,config);
			string userIDDecrypted = crypto.Decrypt(jsonToken.Payload[ClaimTypes.NameIdentifier].ToString());

			if(Guid.TryParse( userIDDecrypted, out guid)){user.SystemIDX = guid;}
			if(Int16.TryParse( jsonToken.Payload["IsAdm"].ToString(), out IsAdm)){user.IsAdm = IsAdm==1;}
			user.ParticName = jsonToken.Payload[ClaimTypes.Name].ToString();
			user.ParticMail = jsonToken.Payload[ClaimTypes.Email].ToString();

			double expiryUnixTimestamp = Convert.ToDouble(jsonToken.Payload["exp"]);
			DateTimeOffset expiryDateTimeOffset = DateTimeOffset.FromUnixTimeSeconds(Convert.ToInt64(expiryUnixTimestamp));
			if(expiryDateTimeOffset.UtcDateTime < DateTime.UtcNow		){throw new JwtTokenLoadingErrorException("Prazo do bearer expirado.");}

			if(user.SystemIDX == null || user.SystemIDX == Guid.Empty){throw new JwtTokenLoadingErrorException("Sem um ID de usuário Válido");}
			if(user.IsAdm == null 												){throw new JwtTokenLoadingErrorException("Definição de Admin inválida");}
			if(string.IsNullOrWhiteSpace(user.ParticName) 				){throw new JwtTokenLoadingErrorException("Nome de usuário do bearer inválido");}
			if(string.IsNullOrWhiteSpace(user.ParticMail) 				){throw new JwtTokenLoadingErrorException("E-mail do bearer inválido");}

		}else{ throw new JwtTokenNotFoundException(); }
		return user;
	}
}

public class JwtTokenException : Exception{
	protected const string CNT_MESSAGEBASE = "Exceção na análise do Token JWT fornecido no cabeçalho de autorização. ";
	public JwtTokenException() : base(CNT_MESSAGEBASE){}
	public JwtTokenException(string message) : base(CNT_MESSAGEBASE + message){}
	public JwtTokenException(string message, Exception innerException) : base(CNT_MESSAGEBASE + message, innerException){}
}
public class JwtTokenNotFoundException : JwtTokenException{
	protected new const string CNT_MESSAGEBASE = "Token JWT não fornecido no cabeçalho de autorização. ";
	public JwtTokenNotFoundException() : base(CNT_MESSAGEBASE){}
	public JwtTokenNotFoundException(string message) : base(CNT_MESSAGEBASE+message){}
	public JwtTokenNotFoundException(string message, Exception innerException) : base(CNT_MESSAGEBASE + message, innerException){}
}
public class JwtTokenInvalidException : JwtTokenException{
	protected new const string CNT_MESSAGEBASE = "Token JWT fornecido no cabeçalho de autorização é inválido. ";
	public JwtTokenInvalidException() : base(CNT_MESSAGEBASE){}
	public JwtTokenInvalidException(string message) : base(CNT_MESSAGEBASE+message){}
	public JwtTokenInvalidException(string message, Exception innerException) : base(CNT_MESSAGEBASE+message, innerException){}
}
public class JwtTokenLoadingErrorException : JwtTokenException{
	protected new const string CNT_MESSAGEBASE = "Token JWT fornecido no cabeçalho de autorização não tem dados válidos. ";
	public JwtTokenLoadingErrorException() : base(CNT_MESSAGEBASE){}
	public JwtTokenLoadingErrorException(string message) : base(CNT_MESSAGEBASE+message){}
	public JwtTokenLoadingErrorException(string message, Exception innerException) : base(CNT_MESSAGEBASE+message, innerException){}
}
