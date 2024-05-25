using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Fractuz.Domain.Users.Entities;
using Microsoft.IdentityModel.Tokens;

namespace api.System.jwt;

public static class JWTTokensManager{
	public static string  GenerateJWTToken(EN_ManagerUser user,IConfiguration config) {
		var claims = new List<Claim> {
			 new Claim(ClaimTypes.NameIdentifier, user.SystemIDX.ToString())
			,new Claim(ClaimTypes.Name, user.ParticName??"")
			,new Claim(ClaimTypes.Email, user.ParticMail??"")
			,new Claim("IsAdm", user.IsAdm==null?"0":(user.IsAdm==true?"1":"0"))
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
}
