const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Schema = mongoose.Schema;


const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/TalkTales', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new Schema({
  email: {
     type: String,
     required: true,
     unique: true, // Ensure each user has a unique email
     validate: {
       validator: function(v) {
         // Simple regex for email validation
         return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
       },
       message: props => `${props.value} is not a valid email address!`
     }
  },
  password: {
     type: String,
     required: true
  },
  username: {
     type: String,
     required: true,
     unique: true // Ensure each user has a unique username
  },
  phoneNumber: {
     type: String,
     required: true
  },
  dob: {
     type: Date, // Assuming you're converting the dob string to a Date object before saving
     required: true
  },
  identityQuestion: {
     type: String,
     required: true
  },
  identityAnswer: {
     type: String,
     required: true
  }
 });

const User = mongoose.model('users', userSchema);

app.use(bodyParser.json());

app.post('/api/signup', async (req, res) => {
  const { email, password, username, phoneNumber, dob, identityQuestion,identityAnswer} = req.body;
  
  const dobDate = new Date(dob);

  const newUser = new User({
     email,
     password,
     username,
     phoneNumber,
     dob: dobDate, // Save as Date object
     identityQuestion,
     identityAnswer,
  });
  
    try {
      await newUser.save(); // Use await with the save method
  
      res.json({ message: 'User data saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error saving user data' });
    }
  });

  app.post('/api/signin', async (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username and password match a user in your database
    const user = await User.findOne({ email: username, password: password });
  
    if (user) {
      // User is authenticated
      res.json({ message: 'Login successful' });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
