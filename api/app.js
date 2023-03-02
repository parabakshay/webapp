import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import routes from './routes/index.js';
// import authmiddleware from './middlewares/auth.middleware.js';

const app = express();

app.use(cors());

 // Parse json
app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

// create "middleware"
app.use(morgan('combined'));

// Security middleware
// Helmet
app.use(helmet());
// hpp
app.use(hpp());

// app.use(authmiddleware);

app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handling MulterError: Unexpected field
    res.status(400).send('Bad Request: Invalid form-data');
  } else {
    next(err);
  }
});

export default app;
