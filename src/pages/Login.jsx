import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      onLogin();
      navigate("/");
    } else {
      alert("Please enter valid credentials!");
    }
  };

  return (
    <div className="p-6 h-[60vh] bg-white shadow-md rounded-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full rounded-md mb-3"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full rounded-md mb-3"
        required
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white w-full py-2 rounded-md"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
