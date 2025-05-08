const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // To load environment variables

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using environment variable for sensitive data
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Schema definition
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Form = mongoose.model('Form', formSchema);

// POST endpoint to save form data
app.post('/submit', async (req, res) => {
  try {
    const formData = new Form(req.body);
    await formData.save();
    res.status(200).send('Form data saved successfully');
  } catch (err) {
    console.error('Error saving form data: ', err);
    res.status(500).send('Error saving form data');
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
