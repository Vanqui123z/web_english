const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

class AuthAPI {
  async login(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Email hoặc mật khẩu không đúng");
    }

    return res.json();
  }

  async register(name: string, email: string, password: string, role: string) {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (!res.ok) {
      throw new Error("Register failed");
    }

    return res.json();
  }

  async getProfile() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/me`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!res.ok) {
      throw new Error("Get profile failed");
    }

    return res.json();
  }

  async updateProfile(userData: any) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/me`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error("Update profile failed");
    }

    return res.json();
  }
}

export default new AuthAPI();
