const BASE_URL = "http://localhost:3000/users";

class UserAPI {
    async getProfile() {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/profile`, {
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
        const res = await fetch(`${BASE_URL}/update`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(userData)
        });

        if (!res.ok) {
            throw new Error("Update profile failed");
        }

        return res.json();
    }
}

export default new UserAPI();
