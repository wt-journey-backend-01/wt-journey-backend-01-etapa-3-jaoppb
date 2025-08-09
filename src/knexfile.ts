import { config } from 'dotenv';
import { Knex } from 'knex';

config();

const configs: Record<string, Knex.Config> = {
	development: {
		client: 'pg',
		connection: {
			host: '127.0.0.1',
			port: 5432,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
		},
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds',
		},
	},
	ci: {
		client: 'pg',
		connection: {
			host: 'postgres',
			port: 5432,
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
		},
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds',
		},
	},
};

export default configs;
