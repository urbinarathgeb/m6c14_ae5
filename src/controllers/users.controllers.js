import * as service from '../services/services.js';

export const getUsers = (req, res) => {
	const users = JSON.parse(service.readFile())

	if (!users || users.length === 0) return res.status(404).json({message: 'No hay usuarios'});

	res.status(200).json({
		message: 'Usuarios encontrados',
		total: users.length,
		data: users
	})
};

export const getUserById = (req, res) => {
	const {id} = req.params;
	const users = JSON.parse(service.readFile())
	const user = users.find(user => user.id === parseInt(id));
	const {name, lastname} = user;

	if (!user) return res.status(404).json({message: 'Usuario no encontrado'});

	res.status(200).json({
		message: `Usuario encontrado: ${name} ${lastname}`,
		id: user.id,
		data: user
	});
}