const express = require('express');
const helmet = require('helmet');

const Project = require('./data/db-helpers/project-model.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/projects', (req, res) => {
	Project.findProjects()
		.then(projects => {
			let projArr = projects.map(project => {
				return { ...project, complete: project.complete === 1 ? true : false }
			})
			res.status(200).json(projArr)
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Could not retrieve projects' })
		})
})

server.post('/api/projects', (req, res) => {
	const projectData = req.body;

	Project.addProject(projectData)
		.then(project => {
			res.status(201).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Could not create new project' })
		})
})

server.get('/api/projects/:id', (req, res) => {
	const id = req.params.id;

	Project.findProjectById(id)
	.then(project => {
		console.log(project)
		let boolean =  {...project, complete: project.complete === 1 ? true : false} 
		res.status(200).json(boolean)
	})
	.catch(err => {
		console.log(err);
	    	res.status(500).json({ error: 'Could not find project with that ID' });
	});
    });

server.get('/api/resources', (req, res) => {
	Project.findResources()
		.then(resources => {
			res.status(200).json(resources)
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Could not retrieve resources' })
		});
});

server.post('/api/resources', (req, res) => {
	const resourceData = req.body;

	Project.addResource(resourceData)
		.then(resource => {
			res.status(201).json(resource);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Could not create resource' });
		});
});
server.get('/api/projects/:id/tasks', (req, res) => {
	const { id } = req.params;

	Project.findTasks(id)
		.then(tasks => {
			if(tasks.length) {
				let taskArr = tasks.map(task => {
					return { ...task, completed: task.completed === 1 ? true : false }
				})
				res.status(200).json(taskArr);
			} else {
				res.status(404).json({ message: 'Could not find tasks for this project' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Could not retrieve tasks' });
		});
});

server.post('/api/projects/:id/tasks', (req, res) => {
	const taskData = req.body;
	const { id } = req.params;

	Project.findProjectById(id)
		.then(project => {
			if (project) {
				Project.addTask(taskData, id)
					.then(task => {
						res.status(201).json(task);
					})
			} else {
				res.status(404).json({ error: 'Could not find project with that ID' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Could not add task' });
		});
});



module.exports = server;