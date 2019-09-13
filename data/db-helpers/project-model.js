const db = require('../../data/db-config.js');

module.exports = {
	findProjects,
	findResources,
	findTasks,
	addProject,
	addResource,
	addTask,
	findProjectById
};

function findProjects() {
	return db('projects');
};

function findProjectById(id) {
	return db('projects')
			.where({ id })
			.first();
};

function findResources() {
	return db('resources');
};

function findTasks() {
	return db('projects as p')
			.join('tasks as t', 't.project_id', 'p.id')
			.where({ project_id: id })
			.select('p.project_name', 'p.description', 't.task_name', 't.description', 't.notes', 't.completed')
};

function addProject(project) {
	return db('projects')
		.insert(project)
};

function addResource(resource) {
	return db('resources')
		.insert(resource)
};

function addTask(task) {
	return db('tasks')
		.insert(task)
};