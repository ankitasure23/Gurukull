import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import Home from "../../../assets/home.png";
import Lesson from "../../../assets/lesson.png";
import Quiz from "../../../assets/quiz.png";
import Dashboard from "../../../assets/dashboard.png";
import Settings from "../../../assets/settings.png";
import Login from "../../../assets/login.png";
import Signup from "../../../assets/signup.png";
import Language from "../../../assets/language.png";
import Pragya from "../../../assets/Pragya.png";
import Profile from "../../../assets/Profile.png";

// ✅ import API functions
import { signupUser, loginUser } from "../../api/userApi";

function NavBar() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  // Navigation handlers
  const handleLessonClick = () => navigate("/subject-selection");
  const handleProfileClick = () => navigate("/my-profile");

  // Handle Signup
  const handleSignup = async () => {
    try {
      const res = await signupUser(signupData);
      console.log("Signup Response:", res);
      alert(res.message || "Signup done ✅");
      setShowSignup(false); // close modal
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      const res = await loginUser(loginData);
      console.log("Login Response:", res);
      if (res.user) {
        alert("Login successful ✅");
        setShowLogin(false); // close modal
      } else {
        alert(res.message || "Login failed ❌");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const lang = [
    { label: "English", onClick: () => alert("English selected") },
    { label: "Bengali", onClick: () => alert("Bengali selected") },
    { label: "Hindi", onClick: () => alert("Hindi selected") },
  ];

  return (
    <>
      <nav className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-row">
            <img className="w-36" src={Pragya} alt="Pragya Logo" />
            <h2
              className="font-bold text-4xl justify-center text-center pt-7"
              style={{ color: "#2C1F4A" }}
            >
              Pragya
            </h2>
          </div>
          <div className="flex gap-6">
            <Button name="Home" icon={Home} />
            <Button name="Lesson" icon={Lesson} onClick={handleLessonClick} />
            <Button name="Quiz" icon={Quiz} />
            <Button name="Dashboard" icon={Dashboard} />
            <Button name="Settings" icon={Settings} />
            <Button name="Language" dropDownMenu={lang} icon={Language} />
            <Button name="Login" icon={Login} onClick={() => setShowLogin(true)} />
            <Button name="Signup" icon={Signup} onClick={() => setShowSignup(true)} />
            <Button name="My Profile" icon={Profile} onClick={handleProfileClick} />
          </div>
        </div>
      </nav>

      {/* ✅ Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="border w-full p-2 mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="border w-full p-2 mb-3"
            />
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Login
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className="mt-2 text-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ✅ Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-xl font-bold mb-4">Signup</h2>
            <input
              type="text"
              placeholder="Name"
              value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
              className="border w-full p-2 mb-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              className="border w-full p-2 mb-3"
            />
            <input
              type="number"
              placeholder="Age"
              value={signupData.age}
              onChange={(e) => setSignupData({ ...signupData, age: e.target.value })}
              className="border w-full p-2 mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              className="border w-full p-2 mb-3"
            />
            <button
              onClick={handleSignup}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              Signup
            </button>
            <button
              onClick={() => setShowSignup(false)}
              className="mt-2 text-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
