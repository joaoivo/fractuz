using Fractuz.Domain.Users.Entities;
using Fractuz.Domain.Users.DataAccess;

namespace Fractuz.Domain.Users.BussinesPlan;
public static class BP_ManagerUser{
		public static List<EN_ManagerUser>? Select(IConfiguration configuration,Guid? guid=null,string? origin=null,string? destiny=null){
			List<EN_ManagerUser>? route_lst =  (List<EN_ManagerUser>?)DA_ManagerUser.Select(configuration,guid, origin, destiny);
			return route_lst;
		}
}
