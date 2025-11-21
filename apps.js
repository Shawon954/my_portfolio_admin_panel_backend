const express = require('express');
const DataBase_Connection = require('./DataBase/database.js');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World'); 
});


// All Routes

const LoginRouter = require('./routes/login/login_router.js');
const HomeTitleRoutes = require('./routes/home_title_routes/home_title.js');
const SocialRoutes = require('./routes/social_content/social_content.js');
const ResumeRoutes = require('./routes/resume_routers/resume_routers.js');
const ProjectRouters = require('./routes/project_routes/project_routes.js');
const SkillsRouters = require('./routes/skills_routes/skills_routes.js');
const EducationRoutes = require('./routes/education_routes/education_routes.js');
const AboutMeRouter = require('./routes/about_me_router/about_me_router.js');
const AcivemenetRouters = require('./routes/acivement_routes/acivement_routes.js');


// Login Routes
app.use('/api/v1/login', LoginRouter);

// Home Title Routes
app.use('/api/v1/update-home-title',HomeTitleRoutes);
app.use('/api/v1/get-home-title',HomeTitleRoutes);

// Social Contact Routes
app.use('/api/v1/get-social-contacts',SocialRoutes);
app.use('/api/v1/create-social-contact',SocialRoutes);
app.use('/api/v1/delete-social-contact',SocialRoutes);

// Resume Routes
app.use('/api/v1/resume', ResumeRoutes);

// Project Routes
app.use('/api/v1/create-project',ProjectRouters);
app.use('/api/v1/get-projects',ProjectRouters);
app.use('/api/v1/update-project',ProjectRouters);
app.use('/api/v1/delete-project',ProjectRouters);

// Skills Routes
app.use('/api/v1/create-skill', SkillsRouters); 
app.use('/api/v1/get-skills', SkillsRouters);
app.use('/api/v1/delete-skill', SkillsRouters);

// Education Routes
app.use('/api/v1/create-education', EducationRoutes);
app.use('/api/v1/get-educations', EducationRoutes);
app.use('/api/v1/update-education', EducationRoutes);
app.use('/api/v1/delete-education', EducationRoutes);

// About Me Routes
app.use('/api/v1/update-about-me', AboutMeRouter);
app.use('/api/v1/get-about-me', AboutMeRouter); 

// Acivemenet Routes
app.use('/api/v1/create-acivemenets', AcivemenetRouters);
app.use('/api/v1/get-acivemenet', AcivemenetRouters);
app.use('/api/v1/delete-acivemenet', AcivemenetRouters);






app.listen(port, () => {
  console.log(`Local Server running on port:${port}`);
  DataBase_Connection();
});