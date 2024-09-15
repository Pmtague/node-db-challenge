
exports.up = function(knex) {
	return knex.schema
		.createTable('projects', tbl => {
			tbl.increments();
			tbl.string('project_name').notNullable();
			tbl.string('description', 512);
			tbl.boolean('complete').defaultTo(false);
		})
		.createTable('resources', tbl => {
			tbl.increments();
			tbl.string('resource_name').notNullable();
			tbl.string('description', 512);
		})
		.createTable('project_resources', tbl => {
			tbl
				.integer('project_id')
				.unsigned()
				.references('id')
				.inTable('projects')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl
				.integer('resource_id')
				.unsigned()
				.references('id')
				.inTable('resources')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.primary(['project_id', 'resource_id']);
		})
		.createTable('tasks', tbl => {
			tbl.increments();
			tbl
				.integer('project_id')
				.unsigned()
				.references('id')
				.inTable('projects')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.string('description', 512).notNullable();
			tbl.string('notes')
			tbl.boolean('completed').defaultTo(false);
		})
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists('tasks')
		.dropTableIfExists('project_resources')
		.dropTableIfExists('resources')
		.dropTableIfExists('projects')
};
