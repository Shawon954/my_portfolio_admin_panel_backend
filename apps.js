const express = require('express');
const DataBase_Connection = require('./DataBase/database.js');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello World');
});


// All Routes

const LoginRouter = require('./routes/login/login_router.js');
const HomeTitleRoutes = require('./routes/home_title_routes/home_title.js');
const SocialRoutes = require('./routes/social_content/social_content.js');

app.use('/api/v1/login', LoginRouter);

// Home Title Routes
app.use('/api/v1/update-home-title',HomeTitleRoutes);
app.use('/api/v1/get-home-title',HomeTitleRoutes);

// Social Contact Routes
app.use('/api/v1/get-social-contacts',SocialRoutes);
app.use('/api/v1/create-social-contact',SocialRoutes);
app.use('/api/v1/delete-social-contact',SocialRoutes);





app.listen(port, () => {
  console.log(`Local Server running on port:${port}`);
  DataBase_Connection();
});