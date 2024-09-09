const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import the SignUp model
const SignUp = require("./model/signUpSchema");

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enables CORS for all routes
app.use(bodyParser.json()); // Parses incoming JSON requests

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://Chandan:Chandan123@cluster0.uvhr4v4.mongodb.net/HexaHome",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// POST API to create a new user
// POST API to create a new user
app.post("/api/signup", async (req, res) => {
  try {
    // Create the user
    const user = await SignUp.create(req.body);

    // Respond with the created user
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      res
        .status(400)
        .json({ error: `A user with this ${field} already exists.` });
    } else {
      // Handle other errors
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// GET API to fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await SignUp.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Start the server
app.listen(5000, () => console.log(`Server running on port ${5000}`));
