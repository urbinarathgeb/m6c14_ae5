import * as service from '../services/services.js';

export const getUsers = (req, res) => {
	try {
		const users = service.getData();

		if (!users || users.length === 0) return res.status(404).json({message: 'No hay usuarios'});

		res.status(200).json({
			message: 'Usuarios encontrados',
			total: users.length,
			data: users
		})
	} catch (error) {
		res.status(500).json({message: 'Error al obtener usuarios', error: error.message});
	}
};

export const getUserById = (req, res) => {
	try {
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
	} catch (error) {
		res.status(500).json({message: 'Error al obtener el usuario', error: error.message});
	}
}

export const createUser = (req, res) => {
	try {
		const user = req.body;
		const users = service.getData();

		const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
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
	} catch (error) {
		res.status(500).json({message: 'Error al crear el usuario', error: error.message});
	}
}

export const deleteUserById = (req, res) => {
	try {
		const {id} = req.params;

		const users = service.getData();
		const userIndex = users.findIndex(user => user.id === parseInt(id));

		if (userIndex === -1) return res.status(404).json({message: 'Usuario no encontrado'});

		const userToDelete = users[userIndex];
		const {name, lastname} = userToDelete;
		users.splice(userIndex, 1);
		service.setData(users);

		res.status(200).json({
			message: `Usuario eliminado: ${name} ${lastname}`,
			id: userToDelete.id,
			data: userToDelete
		});
	} catch (error) {
		res.status(500).json({message: 'Error al eliminar el usuario', error: error.message});
	}
};

export const updateUserById = (req, res) => {
	try {
		const {id} = req.params;
		const userUpdates = req.body;

		const users = service.getData();
		const userIndex = users.findIndex(user => user.id === parseInt(id));

		if (userIndex === -1) return res.status(404).json({message: 'Usuario no encontrado'});

		const userToUpdate = users[userIndex];

		const updatedUser = {
			...userToUpdate,
			...userUpdates,
			id: parseInt(id)
		};

		users[userIndex] = updatedUser;
		service.setData(users);

		res.status(200).json({
			message: `Usuario actualizado: ${updatedUser.name} ${updatedUser.lastname}`,
			'old-data': userToUpdate,
			'new-data': updatedUser
		});
	} catch (error) {
		res.status(500).json({message: 'Error al actualizar el usuario', error: error.message});
	}
}