const BASE_URL = "http://localhost:3000/auth";

class AuthAPI {
  async login(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Login failed");
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
}

export default new AuthAPI();
