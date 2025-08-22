import { useState } from "react";
import AuthAPI from "../services/auth.service";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await AuthAPI.register(name,email,password,role);
    alert("Registered successfully!");
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input className="form-control mb-2" value={name } onChange={(e)=>setName(e.target.value)} placeholder="Name"/>
        <input className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="form-control mb-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <select className="form-control mb-2" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
}

export default Register;
