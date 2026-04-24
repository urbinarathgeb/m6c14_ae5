import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dataPath = path.join(__dirname, '../data/data.json');


export const readFile = () => fs.readFileSync(dataPath, 'utf-8');