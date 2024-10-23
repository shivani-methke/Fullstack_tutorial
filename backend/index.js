const express = require("express");
const data = require("./data");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express(); //creates a instance of express. // App is used to handle requests and responses,routing server configuration.
const port = 3000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const movieRoutes = require("./routes/movieRoutes");
// this is a route handler. It is a function that is executed when a request is made to the specified path.

// MODELS FOLDER= > DEFINE THE DATABSE SCHEMA

// CONTROLLERS = > CONTAINS THE LOGIC FOR THE ROUTES

// ROUTES => CONTAINS THE ROUTES AND CONNECT THEM TO APPROPRIATE CONTROLLER FUNCTIONS.

// MIDDLEWARE => MIDDLEWAR are the function the request before it reaches the route handler.
app.use(cors()); //middleware function
app.use(bodyParser.json());

//this is a route handler. It us a function that is executed when a request is made to the specified path.
app.get("/", (req, res) => {
  res.send("please switch to /api/data to get the data");
  // res.send(data)
});

//Routes are defined using app.get() method. It takes two argument, the path and the route handler.
// app.get("/users", (req, res) => {
//   res.send(data);
// });

//get request for a specific user

// app.get("/users/:userId", (req, res) => {
//   //This :id is a route parameter. It is a placeholder for the actual value that will be passes in the request.// this is a dynamic routes [it will be change] wo alga alga chnge hota rhta hay

//   const id = req.params.userId; //This is how you access the route parameter in express.
//   console.log(id);
//   // res.status(200).send(data[id -7]);
//   const user = data.find((user) => user.id == id); //find the user with the specified id.
//   console.log(user);
//   res.status(200).send(user); //send the user as response.
// });

app.get("/users/:userName", (req, res) => {
  // this :id is a route parameter. It is a placeholder for the actual value that will be passed in the request. Dynamic route
  const userName = req.params.userName; // this is how you access the route parameter in express.
  console.log(userName, "user   name");
  const user = data.find((user) => user.first_name === userName); // find the user with the specified id.
  console.log(user, " user");
  res.status(200).send(user); // send the user as response.
});

app.post("/users", (req, res) => {
  // res.send("post request to the homepage");
  const newUser = req.body;
  console.log(newUser);
  // const id = data.length;
  // console.log(id);    //only number will increase

  const modififiedUser = { ...newUser, id: data.length + 1 }; //unqiue id //id will change in number
  console.log(modififiedUser);
  data.push(modififiedUser);
  res.status(201).send(modififiedUser);
});

app.put("/users/:userId", (req, res) => {
  const id = req.params.userId; // Get the user ID from the route parameter
  const updatedUser = req.body; // Get the updated data from the request body

  const userIndex = data.findIndex((user) => user.id == id); // Find the index of the user in the data array
  if (userIndex !== -1) {
    data[userIndex] = { ...data[userIndex], ...updatedUser }; // Update the user data
    //
    //     id: 1,
    //     email: "george.bluth@reqres.in",
    //     first_name: "George",
    //     last_name: "Bluth",
    //     avatar: "https://reqres.in/img/faces/1-image.jpg",
    //    "email": "asdasdasdasth@reqres.in",
    // "first_name": "Shivasnhj",
    // "last_name": "Shivansh",
    // "avatar": "https://reqres.in/img/faces/1-image.jpg"

    res.status(200).send(data[userIndex]); // Send the updated user as a response
  } else {
    res.status(404).send({ message: "User not found" }); // If user not found, send 404
  }
});

app.delete("/users/:userId", (req, res) => {
  const id = req.params.userId; // Get the user ID from the route parameter

  const userIndex = data.findIndex((user) => user.id == id); // Find the index of the user in the data array

  // if id = 2 to user index will be 1 it will be -1 if only the user is not present in the data array else it will be the index of the user in the data array

  if (userIndex !== -1) {
    const deletedUser = data.splice(userIndex, 1); // Remove the user from the array
    res.status(200).send(deletedUser); // Send the deleted user as a response
  } else {
    res.status(404).send({ message: "User not found" }); // If user not found, send 404
  }
});

// MONGO DB STARTS HERE

//MONGOOSE=> It is a library that helps to connect to the MongoDB database and perform operations on the database.(OBM=> Object Data Modelling)

//SCHEMA => It is a blueprint of the database.It define the structure of the database.

//MODEL => It is a constructor function that takes the schema and creates  an Instance of the document.

mongoose
  .connect(
    "mongodb+srv://shivanimethke:shivanimethke@cluster0.xmr9n.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true, //to aviod deprecated warning
      useUnifiedTopology: true, //to enable new connection management engine
    }
  )
  .then(() => {
    console.log("connect to the database");
  })
  .catch((error) => {
    console.log("connection to failed", error);
  });

//SCHEMA => It is a blueprint of the database.It define the structure of the database.

// const moviesSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId, //mongo db will automatically create an id for the document.  // object id is a data type in mongodb that is used that is used to store the unique identifier of the document.
//   title: String,
//   director: String,
//   genre: [String],
//   year: Number,
// });

//MODEL => It is a constructor function that takes the schema and creates  an Instance of the document.
// It represents the collection in the database.COMPILER VERSION OF SCHEMA

// const Movies = mongoose.model("Movies", moviesSchema); // Movies is the name of the collection in the database.

// app.get("/movies",(req, res) => {
//   try {
//     Movies.find()
//       .limit(10)
//       .then((result) => {
//         //using limit to get only 10 documents from the database.
//         res.status(200).send(result);
//       });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// } );

// app.get("/movies", );  //getting everything from the database.

//It is a Pagination ApI
//It is used to fetch the data from the database in pagination Manner
// app.get("/api/movies", );

// const moviesSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId, //mongo db will automatically create an id for the document.  // object id is a data type in mongodb that is used that is used to store the unique identifier of the document.
//   title: String,
//   director: [String],
//   genre: String,
//   year: Number,
// });

// app.post("/movies", );

//SEARCH API FOR MOVIES

// app.get("/movies/search", );

// app.put("/movies/:id",);

// app.delete("/movies/:id", );

//Hashing =>  plain text into a random string of characters. fixed length k string.

// Authentication is like a door key. When you use the right key (like your password), the door unlocks, and you can enter.

// Authorization is what rooms you can go into after you’ve opened the door. For example, you might be allowed into the living room (your email inbox) but not the safe (admin settings).

// Example:

// Authentication: You use the key (password) to unlock the door (login to your account).
// Authorization: Once inside, you can only go into certain rooms (access certain features).

app.use("/", authenticateToken, movieRoutes);

const users = [
  {
    email: "shivanimethke@23.in",
    password: "$2b$12$ML4ntbNwIR2RKOJEb/YPyutdEqqCrE7PRIuaBdxyRsYecElkpWAz.",
  },
  {
    email: "shivanimethke@23.in",
    password: "$2b$12$lqGmX1yw5tTvAGTqcxATHeZ/t4VaktjT9i.4Kfjdy3.0qrBT.6UnG",
  },
  {
    email: "shivanimethke@12.in",
    password: "$2b$12$Q5PYHRQgEN13kB4Fw1aqM.jv8VTgu7xKXUJ1dCaATYPQhTbQ/5JwS",
  },
];
// algo =  unique => 122,kis time, vlaue base pe character ko ascii code m shuffle karo
//Hashing =>  plain text into a random string of characters. fixed length k string.


const secretkey = "mysecretkey"

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12); // 12 is the number of rounds of hashing that will be applied to the password.

  users.push({
    email: email,
    password: hashedPassword,
  });
  res.status(200).send(users);
});

app.post("/hello", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

// LOGIN API              

app.post("/login", (req, res) => {
  const { email, password } = req.body; //extract the email and password from the request body

  const user = users.find((user) => user.email === email); //find the user with the specified email

  if (!user) {
    return res.status(404).send("user not found"); //if user not found, send 404
  }

  const isValidPassword = bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).send("Invalid password");
  }
  const token = jwt.sign({ email: user.email },secretkey,{ expiresIn: "1h" }); // create a JWT token with the user email and secret key. It will expire in 1 hour.
  res.status(200).json({
    token: token,
    message: "Login successful",
  });
});


function authenticateToken(req, res, next){
  const authHeader = req.header["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(authHeader, "authHeader");
  if (token == null) res.sendstatus(401); // throw unauthorized error if token is not present.
  
  jwt.verify(token, secretkey, (err, user) =>{
    if(err) return res.sendstatus(403);// throw forbidden error if token is invalid
    req.user = user;
    next();  //this passes the control to the next middleware or route handler.
  }) 
}


app.get("/users",authenticateToken,(req, res) => {
  res.send(data);
});


// jwt is a function jo ke hamara token create karney ke liya.
// JWT=> JSON WEB TOKE ,It stores information encoded as a json object. it is used to authenticate users and maintain a session.

// IT IS COMPOSED OF THREE PARTS

// 1.PAYLOAD => It contains the claims are statements about an entity (typically, the user) and additional data.[data]
// 2.HEADER => It contains the type of token and the hashing algorithum used to generate the signature.[algorithum]
// 3.SIGNATURE => It is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way. [three data mix then it will come from payload and] 

//HOW JWT WORKS? //authentication flow

//1. user authentication => user login => server verifies the user credentials => server generates a JWT and sends it to the user.

//2. Store jwt in client side => client stores the jwt in local stroage or session storage.

//3. send jwt in the header = >client sends the jwt in the header of the request to the server.

//4. verify jwt => server verifies the jwt and sends the response.

//ADVANTAGES OF jwt

// 1. compact => jwt is comapct and can be sent in the header of the request.

//2. self-contained => JWT contains all the information needed to verify the user. (user email, user id, secret key)

//3. secure => JWT  is signed using a secret key or public/private key pair . it ensures that the sender of the JWT is who it says it is.

//4. Stateless => JWT is stateless. It does not require the server to store the user session. It can be used to authenticate users across multiple services.
// (it si easier to scale the application)

//DISADVANTAGES OF jWT

// 1. JWT is vulnerable to CSRF attacks.(cross site Request forgery)=> It is a type of attack where the attacker tricks the user into performing an action on a website without their knowledge.

// 2.Token size =>  JWT can be large in size if it contains a lot of information. It can increase the size of the request and response.

// 3. JWT is not suitable for storing sensitive information => JWT is encoded not encrypted. It can be decoded by anyone who has access to the jwt.

// 4. JWT is not suitable for revoking access => once the jwt is issued, it cannto be revoked. If the JWT is compromised the attacker can accrss the user account until the jwt expires.

//EXAMPLE OF JWT => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c



// Two type storage 
// 1. local storage:- 
// 2. session storage:-


// MIDDLEWARE => MIDDLEWAR are the function the request before it reaches the route handler.
// (bodyparser, cors, Athentication). They use next() to pass the control to the next middleware or route Handler.

// next() => It is a function that is used to pass the control to the next middleware or route handler. 

// THIS API I WANT CALL IF THE USER IS AUTHENTICATED
// app.get("/users", (req, res) => {
//   res.send(data);
// });











//start the server and listen on the port
app.listen(port, () => {
  // console.log(`Example app listening at http://localhost:${port}`);
  // console.log(`server is running on port`,data);
});




// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbmltZXRoa2VAMTIuaW4iLCJpYXQiOjE3MjY2NTEzMDIsImV4cCI6MTcyNjY1NDkwMn0._ci82Zxl3oFnM45nsDc_xzy3gtwxz0z7XakY7rqgSHk

