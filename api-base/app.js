// Imports the express module, which is a web development framework within nodejs
const express = require('express');

// Configures express to use JSON, which we will need for the API
const app = express();
app.use(express.json());

// Defines a port variable, in this case it is 3000
const PORT = process.env.PORT || 3000;

// Prints out if server is listening 
app.listen(PORT, () => {
    console.log("Server listening on PORT: ", PORT);
    console.log("Here's the link for it: ")
    console.log("http://localhost:3000/status");
})

// We can use this to see if our API is running
app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };

    response.send(status);
});