const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Profile = require("../models/Profile");

// ---------------------- SIGNUP / REGISTER ----------------------
exports.register = async (req, res) => {
  const { name, email, age, password } = req.body;

  try {
    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 2️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3️⃣ Save user
    const newUser = new User({ name, email, age, password: hashedPassword });
    const savedUser = await newUser.save();

    // 4️⃣ Create Profile automatically
    const newProfile = new Profile({
      userId: savedUser._id,
      full_name: savedUser.name,
      email: savedUser.email,
      school: "",
      language: "English"
    });
    const savedProfile = await newProfile.save();

    // 5️⃣ Create JWT token
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 6️⃣ Return response
    res.status(201).json({
      message: "Signup successful",
      token,
      user: { id: savedUser._id, name: savedUser.name, email: savedUser.email },
      profile: savedProfile
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ message: err.message });
  }
};

// ---------------------- LOGIN ----------------------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // 3️⃣ Fetch Profile
    const profile = await Profile.findOne({ userId: user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    // 4️⃣ Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5️⃣ Return response
    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
      profile
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};
