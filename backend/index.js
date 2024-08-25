const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");

//Deployment
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res, next) => {
    res.send("API RUNNING SUCCESSFULLY");
  });
}

// Middleware to parse JSON requests
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// GET and POST endpoint
app
  .route("/bfhl")
  .get((req, res) => {
    // GET method: return a predefined operation code
    res.status(200).json({
      operation_code: "1",
    });
  })
  .post((req, res) => {
    // POST method: handle JSON input and return processed data
    try {
      const inputData = req.body.data;

      if (!Array.isArray(inputData)) {
        throw new Error("Invalid input. 'data' should be a list.");
      }

      const numbers = [];
      const alphabets = [];
      let highestLowercase = null;

      // Process each item in the data array
      inputData.forEach((item) => {
        if (/^\d+$/.test(item)) {
          numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
          alphabets.push(item);
          if (
            /[a-z]/.test(item) &&
            (highestLowercase === null || item > highestLowercase)
          ) {
            highestLowercase = item;
          }
        }
      });

      // Prepare the response
      const response = {
        is_success: true,
        user_id: "haraiharan_a_06102003",
        email: "hariharananbalagan@gmail.com",
        roll_number: "21BKT0038",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
      };

      res.status(200).send(response);
    } catch (error) {
      // Exception handling
      res.status(400).json({
        is_success: false,
        message: error.message,
      });
    }
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
