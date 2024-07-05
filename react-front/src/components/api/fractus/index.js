import { ExceptionSystemApiDefault}	from '../../../system/Components/Api';

export class ExceptionSystemApiFractuz extends ExceptionSystemApiDefault {
	constructor(mensagem) {
		super(mensagem);
		this.name = this.constructor.name;
		this.data = { mensagem };
	}
}

export const apiFractuzEndPoint={
	 login: "/Login"
	,adminUsers:"/Admin/User"
	,application:"/Application"
	,appDataBase:"/AppDataBase"
	,appDbTable:"/AppDbTable"
	,appDbTableField:"/AppDbTableField"
	,SystemError:"/System/Error"
}