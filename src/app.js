import express from 'express';
import userRoutes from './routes/users.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())


app.use('/users', userRoutes)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));