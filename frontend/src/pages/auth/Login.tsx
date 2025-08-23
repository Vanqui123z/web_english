import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../../services/auth.service"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    
    try {
      const data = await AuthAPI.login(email, password);
      
      if(data.status==="blocked"){ 
        setErrorMessage("Tài khoản đã bị khóa");
        return;
      }
      
      console.log(data);
      localStorage.setItem("token", data.token);
      alert("Đăng nhập thành công!");
      
      switch (data.role) {
        case "admin":
          navigate("/admin/users")
          break;
        case "tutor":
          navigate("/booking/student")
          break;
        case "student":
          navigate("/tutors")
          break;
        default:
          break;
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Email hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Đăng nhập</h2>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <input 
          className="form-control mb-2" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email"
          type="email"
          required
        />
        <input 
          type="password" 
          className="form-control mb-2" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Mật khẩu"
          required
        />
        <button className="btn btn-primary" type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
