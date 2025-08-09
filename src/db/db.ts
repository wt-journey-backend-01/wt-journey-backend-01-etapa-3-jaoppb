import knex from 'knex';
import knexConfig from '../knexfile';
import pg from 'pg';

const nodeEnv = process.env.NODE_ENV || 'development';
const config = knexConfig[nodeEnv];

const db = knex(config);

pg.types.setTypeParser(pg.types.builtins.DATE, (value: string) => {
	const date = new Date(value);
	if (isNaN(date.getTime())) {
		throw new Error(`Invalid date: ${value}`);
	}
	return date.toISOString().split('T', 1)[0];
});

export default db;
