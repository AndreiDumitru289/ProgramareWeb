const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  'http://localhost:5173',
  'https://dashboard-xxxx.vercel.app',
];

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
  })
);

async function connectToDatabase() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/dashboard';

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log('Conectat la MongoDB');
  } catch (error) {
    console.error('Eroare la conectarea MongoDB:', error.message);
    throw error;
  }
}

async function seedProjects() {
  const total = await Project.countDocuments();

  if (total > 0) {
    return;
  }

  await Project.insertMany([
    {
      title: 'Dashboard React',
      tech: 'React, Vite, CSS',
      done: true,
    },
    {
      title: 'API Express',
      tech: 'Node.js, Express, REST',
      done: false,
    },
    {
      title: 'Integrare MongoDB',
      tech: 'MongoDB, Mongoose',
      done: false,
    },
  ]);
}

app.get('/', function (req, res) {
  res.json({ message: 'Serverul functioneaza!' });
});

app.get('/api/projects', async function (req, res) {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Nu s-au putut prelua proiectele.' });
  }
});

app.get('/api/projects/:id', async function (req, res) {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404).json({ message: 'Proiectul nu a fost gasit.' });
      return;
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Eroare la cautarea proiectului.' });
  }
});

app.get('/api/stats', async function (req, res) {
  try {
    const total = await Project.countDocuments();
    const done = await Project.countDocuments({ done: true });
    const inProgress = total - done;

    res.json({ total, done, inProgress });
  } catch (error) {
    res.status(500).json({ message: 'Nu s-au putut calcula statisticile.' });
  }
});

app.post('/api/projects', async function (req, res) {
  try {
    const project = new Project({
      title: req.body.title,
      tech: req.body.tech,
      done: req.body.done,
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: 'Date invalide pentru proiect.' });
  }
});

app.delete('/api/projects/:id', async function (req, res) {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      res.status(404).json({ message: 'Proiectul nu a fost gasit.' });
      return;
    }

    res.json({ message: 'Proiect sters cu succes.' });
  } catch (error) {
    res.status(500).json({ message: 'Nu s-a putut sterge proiectul.' });
  }
});

app.put('/api/projects/:id', async function (req, res) {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      res.status(404).json({ message: 'Proiectul nu a fost gasit.' });
      return;
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: 'Nu s-a putut actualiza proiectul.' });
  }
});

connectToDatabase().then(function () {
  seedProjects()
    .then(function () {
      app.listen(PORT, function () {
        console.log('Serverul ruleaza pe portul ' + PORT);
      });
    })
    .catch(function (error) {
      console.error('Eroare la initializarea proiectelor demo:', error.message);
      process.exit(1);
    });
});
