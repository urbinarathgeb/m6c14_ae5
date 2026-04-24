import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data/data.json');

export const getData = () => {
	const data = fs.readFileSync(dataPath, 'utf-8');
	return JSON.parse(data);
}

export const setData = (data) => {
	fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

export const deleteData = () => {
	fs.unlink(dataPath, (err) => {
		if (err) {
			return console.error(chalk.bgRed('Ha ocurrido un error'), chalk.red(err));
		}
		console.log(chalk.green('Data eliminada correctamente.'));
	})
}