import { useState } from "react";
import AuthAPI from "../services/auth.service"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await AuthAPI.login(email,password);
    console.log(data);
    localStorage.setItem("token", data.token);
    alert("Logged in!");
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
