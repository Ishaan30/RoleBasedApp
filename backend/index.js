const express = require('express');
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const adminRouter = require('./routes/adminRoutes');
const superRouter = require('./routes/superadminRoutes');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv')
const bodyParser = require('body-parser');

dotenv.config()
require('./db/mongoose');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);
app.use(taskRouter);
app.use(adminRouter);
app.use(superRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});
