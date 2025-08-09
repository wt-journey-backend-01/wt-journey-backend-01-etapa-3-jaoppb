export class NotFoundError extends Error {
	constructor(entity: string, id: number) {
		super(`${entity} with ID ${id} not found`);
		this.name = 'NotFoundError';
	}
}
