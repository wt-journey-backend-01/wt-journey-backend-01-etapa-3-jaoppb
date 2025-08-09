export class InvalidIDError extends Error {
	constructor(entity: string, id: number) {
		super(`Invalid ${entity} ID format: ${id}`);
		this.name = 'InvalidIDError';
	}
}
