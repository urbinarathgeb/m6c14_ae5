import * as service from '../services/services.js';

export const getUsers = (req, res) => {
	const users = service.getData();

	if (!users || users.length === 0) return res.status(404).json({message: 'No hay usuarios'});

	res.status(200).json({
		message: 'Usuarios encontrados',
		total: users.length,
		data: users
	})
};

export const getUserById = (req, res) => {
	const {id} = req.params;
	const users = service.getData();
	const user = users.find(user => user.id === parseInt(id));

	if (!user) return res.status(404).json({message: 'Usuario no encontrado'});

	const {name, lastname} = user;

	res.status(200).json({
		message: `Usuario encontrado: ${name} ${lastname}`,
		id: user.id,
		data: user
	});
}

export const createUser = (req, res) => {
	const user = req.body;
	console.log(user)
	const users = service.getData();
	const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
	const requiredFields = ['name', 'lastname', 'mail', 'active', 'role'];

	const missingFields = requiredFields.filter(field => {
		return user[field] === undefined || user[field] === null || user[field] === '';
	});

	if (missingFields.length > 0) {
		return res.status(400).json({
			message: 'Faltan campos obligatorios',
			missing: missingFields,
			error_details: `Los siguientes campos son requeridos: '${missingFields.join(' | ')}'`
		});
	}

	const {name, lastname} = user;

	const newUser = {
		id: newId,
		...user
	};

	users.push(newUser);
	service.setData(users);

	res.status(201).json({
		message: `Usuario creado: ${name} ${lastname}`,
		id: newUser.id,
		data: newUser
	})
}