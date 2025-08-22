import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../services/auth.service"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await AuthAPI.login(email, password);
    if(data.status==="blocked"){ return alert("tai khoan da bi khoa") }
    console.log(data);
    localStorage.setItem("token", data.token);
    alert("Logged in!");
    switch (data.role) {
      case "admin":
        navigate("/admin/users")
        break;
      case "tutor":
        navigate("/student")
        break;
      case "student":
        navigate("/tutors")
        break;

      default:
        break;
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="form-control mb-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
