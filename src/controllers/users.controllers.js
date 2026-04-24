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