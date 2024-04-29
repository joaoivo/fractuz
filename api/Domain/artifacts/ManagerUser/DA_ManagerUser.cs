using Fractuz.Domain.Users.Entities;
using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Fractuz.Domain.Users.DataAccess;
public static class DA_ManagerUser{
		public static IEnumerable<EN_ManagerUser> Select(IConfiguration config,Guid? guid=null,string? origin=null,string? destiny=null){

			IEnumerable<EN_ManagerUser> route_lst = new List<EN_ManagerUser>();
			DynamicParameters parameters = new DynamicParameters();
			parameters.Add("@guid", guid, DbType.Guid, ParameterDirection.Input);
			parameters.Add("@origin", origin, DbType.String, ParameterDirection.Input);
			parameters.Add("@Destintion", destiny, DbType.String, ParameterDirection.Input);

			using (SqlConnection db = new SqlConnection(config["Database:Default"])){
				route_lst = db.Query<EN_ManagerUser>("[dbo].[pr_ManagerUsers_sel]",parameters);
			}
			return route_lst;
		}
}
