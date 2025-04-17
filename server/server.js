const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const app = express();
const PORT = 5000;
const SECRET_KEY = "amul";

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//when the tourist user will update the deatail about there travel

const TravelDataSchema = new mongoose.Schema({

  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
  contactNumber: { type: String, required: true },
});

const TravelData = mongoose.model("TravelData", TravelDataSchema);
module.exports = TravelData;

// routes/tourist.js or travel.js

app.post("/submit-travel", async (req, res) => {
  try {
    const { vehicleType,vehicleNumber, source, destination, date, seatsAvailable, contactNumber } = req.body;

    const travelEntry = new TravelData({
      vehicleType,
      vehicleNumber,
      source,
      destination,
      date,
      seatsAvailable,
      contactNumber,
    });

    await travelEntry.save();
    res.status(201).json({ message: "Travel data submitted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting travel data." });
  }
});

app.get('/touristbookings',async(req,res)=>{
  const Touristuser = await TravelData.find();
  res.json(Touristuser);

})






//tourist role server

// models/TouristOwner.js

const TouristOwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Z]{2}[0-9]{2}-?[A-Z0-9]{0,2}[0-9]{4,7}$/

  },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
});

const TouristOwner = mongoose.model("TouristOwner", TouristOwnerSchema);

//get the user

app.get('/touristreg',async(req,res)=>{
  const Touristuser = await TouristOwner.find();
  res.json(Touristuser);

})

app.put('/touristreg/:id',(req,res)=>{
  const id = req.params.id;
  TouristOwner.findByIdAndUpdate({_id:id},{
      name:req.body.UserName,
      status:req.body.Status
  })
  .then((result)=>{
    res.json(result)
  })
  .catch((err)=>{
      res.json(err)
  })
})

app.get('/touristreg/:id',(req,res)=>{
  const id=req.params.id
  TouristOwner.findById({_id:id})
.then((result)=>{
  res.json(result)
})

.catch(err => res.json(err))
})
//server side 

// Inside your server.js or routes/tourist.js


app.post("/tourist/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      licenseNumber,
    } = req.body;

    // Check if already exists
    const existingUser = await TouristOwner.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const existingLicense = await TouristOwner.findOne({ licenseNumber });
    if (existingLicense) {
      return res.status(400).json({ message: "License number already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newTourist = new TouristOwner({
      name,
      email,
      password: hashedPassword,
      licenseNumber,
    });

    await newTourist.save();

    res.status(201).json({
      message: "Registration successful! Awaiting admin approval.",
    });
  } catch (error) {
    console.error("Tourist Register Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});


//tourist login server 
app.post("/tourist/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if tourist exists
    const user = await TouristOwner.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check approval status
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.status === "rejected") {
      return res.status(403).json({ message: "Your account has been rejected by admin." });
    }
    if (user.status !== "approved") {
      return res.status(401).json({ message: "Account not approved yet" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: "tourist" },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      role: "tourist",
      status: user.status
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});




// User Schema


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },  // Ensure username is required
  email: { type: String, required: true, unique: true },  // Email should be unique
  password: { type: String, required: true },  // Password should be required
  role: { type: String, default: "user" } // Restrict role values
});

const User = mongoose.model("adminuser", UserSchema);

//register server
app.get('/reg',async(req,res)=>{
  const reguser = await User.find();
  res.json(reguser);

})

app.put('/reg/:id',(req,res)=>{
  const id = req.params.id;
  User.findByIdAndUpdate({_id:id},{
      username:req.body.userName,
      role:req.body.role
  })
  .then((result)=>{
    res.json(result)
  })
  .catch((err)=>{
      res.json(err)
  })
})

app.get('/reg/:id',(req,res)=>{
  const id=req.params.id
  User.findById({_id:id})
.then((result)=>{
  res.json(result)
})

.catch(err => res.json(err))
})

//booking tikecter server
app.get("/allbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server Error" });
  }
});



// Product Schema
const ProductSchema = new mongoose.Schema({
 
  source: { type: String, required: true, trim: true },
  destination: { type: String, required: true, trim: true },
  availableDates: [{ type: String }],
  time: { type: String, required: true },

  availableSeat: [{ type: String }],
  busType: { type: String },
});
const Product = mongoose.model("subibus", ProductSchema);
module.exports = Product;


//Costomer of booking
const bookingSchema = new mongoose.Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true },
  busType: { type: String, required: true },
  seats: [
    {
      seat: String,
      name: String,
      age: String,
      sex: String
    }
  ]
});

const Booking = mongoose.model("Booking_for_amul_bus", bookingSchema);
module.exports = Booking;

app.post("/bookinguser", async (req, res) => {
  const { source, destination, date, busType, seats } = req.body;

  try {
    await Booking.create({
      source,
      destination,
      date,
      busType,
      seats
    });
    res.status(201).json({ message: "Booking Success" });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Error in booking" });
  }
});

// Register User
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user (default role is "user" unless specified as "admin")
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role:"user", // Default to "user" if no role is provided
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});


// Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Attempt:", { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User Not Found!");
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password Incorrect!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      SECRET_KEY,  // Make sure this is defined
      { expiresIn: "1h" }
    );

    console.log("Login Successful! Token:", token);
    res.json({ token, role: user.role });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
};

// Get All Products (Public)
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add Product (Admin Only)
app.post("/products", verifyToken, async (req, res) => {
  if (req.role !== "admin") return res.status(403).json({ message: "Access denied" });
  const { source, destination, availableDates, time, availableSeat,busType} = req.body;
  const newProduct = new Product({ source, destination, availableDates,time,availableSeat,busType });
  await newProduct.save();
  res.json(newProduct);
});

// Update Product (Admin Only)
app.put("/products/:id", verifyToken, async (req, res) => {
  if (req.role !== "admin") return res.status(403).json({ message: "Access denied" });

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProduct);
});

// Delete Product (Admin Only)
app.delete("/products/:id", verifyToken, async (req, res) => {
  if (req.role !== "admin") return res.status(403).json({ message: "Access denied" });

  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted successfully" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
