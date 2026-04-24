import * as service from '../services/services.js';

export const validateId = (req, res, next) => {
	const {id} = req.params;
	if (isNaN(parseInt(id))) {
		return res.status(400).json({message: 'El ID debe ser un número válido'});
	}
	next();
};

export const validateRequiredFields = (req, res, next) => {
	const user = req.body;
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
	next();
};

export const validateEmail = (req, res, next) => {
	const { mail } = req.body;
	const { id } = req.params;
	
	if (!mail) return next();

	// Validar formato
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(mail)) {
		return res.status(400).json({message: 'El formato del correo electrónico no es válido'});
	}

	// Validar unicidad
	const users = service.getData();
	const userExists = users.some(u => u.mail === mail && (!id || u.id !== parseInt(id)));

	if (userExists) {
		const msg = id 
			? 'El correo electrónico ya está registrado por otro usuario'
			: 'El correo electrónico ya está registrado';
		return res.status(400).json({message: msg});
	}

	next();
};

export const validateActive = (req, res, next) => {
	const { active } = req.body;
	
	if (active !== undefined && typeof active !== 'boolean') {
		return res.status(400).json({message: 'El campo "active" debe ser un valor booleano'});
	}
	next();
};