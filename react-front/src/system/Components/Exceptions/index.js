class ExceptionDefault extends Error {
	constructor(mensagem) {
		super(mensagem);
		this.name = this.constructor.name;
		this.data = { mensagem };
		this.stack = this.constructor.stack;
	}
}

export class ExceptionSystemDefault extends ExceptionDefault {
	constructor(mensagem) {
		super(mensagem);
		this.name = this.constructor.name;
		this.data = { mensagem };
		this.stack = this.constructor.stack;
	}
}

export class ExceptionApplicationDefault extends ExceptionDefault {
	constructor(mensagem) {
		super(mensagem);
		this.name = this.constructor.name;
		this.data = { mensagem };
		this.stack = this.constructor.stack;
	}
}

export class ExceptionUserDefault extends ExceptionDefault {
	constructor(mensagem,objects) {
		super(mensagem);
		this.name = this.constructor.name;
		this.data = { mensagem };
		this.stack = this.constructor.stack;
		this.objects = objects;
	}
}