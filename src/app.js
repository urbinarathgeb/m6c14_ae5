import express from 'express';
import userRoutes from './routes/users.routes.js';
import chalk from 'chalk';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())


app.get('/', (req, res) => res.json({message: 'API funcionando'}));
app.use('/users', userRoutes)
app.listen(PORT, () => console.log(chalk.bgGreen.white.bold(`Server corriendo en el puerto ${PORT}`)));