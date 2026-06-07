const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const authRoutes = require('./routes/auth.routes');
const testsRoutes = require('./routes/tests.routes');
const aiRoutes = require('./routes/ai.routes');
const linksRoutes = require('./routes/links.routes');
const errorHandler = require('./middlewares/error.middleware');
const dashboardRoutes = require('./routes/dashboard.routes');


const swaggerDocument = YAML.load(__dirname + '/../docs/swagger.yaml');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tests', testsRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/links', linksRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/dashboard', require('./routes/dashboard.routes'));



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// error handler (last)
app.use(errorHandler);

module.exports = app;
