import z from 'zod';
import AgentSchema from './agent';

export enum CaseStatus {
	OPEN = 'aberto',
	CLOSED = 'solucionado',
}

const caseId = z.int().meta({
	description: 'Unique identifier for the case',
	example: 1,
});

const titulo = z.string().min(2).max(100).meta({
	description: 'Title of the case',
	example: 'Case Title',
});

const descricao = z.string().min(10).max(1000).meta({
	description: 'Description of the case',
	example: 'Detailed description of the case',
});

const status = z.enum(Object.values(CaseStatus)).meta({
	description: 'Status of the case',
	example: 'aberto',
});

const CaseSchema = z
	.object({
		id: caseId,
		titulo,
		descricao,
		status,
		agente_id: AgentSchema.shape.id,
	})
	.meta({
		id: 'Case',
		description: 'Schema for a case in the system',
		example: {
			id: 1,
			titulo: 'Case Title',
			descricao: 'Detailed description of the case',
			status: 'aberto',
			agente_id: 1,
		},
	})
	.strict();

export default CaseSchema;
export type Case = z.infer<typeof CaseSchema>;
