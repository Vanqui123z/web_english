const BASE_URL = "http://localhost:3000/admin";
const BASE_URL_USER = "http://localhost:3000";
const token = localStorage.getItem('token');

class AuthAPI {
    async ListUsers() {
        const res = await fetch(`${BASE_URL}/users`, {
            method: "GET",
             headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        return res.json();
    }
    async updateUsers(id: string, status: any) {
        const res = await fetch(`${BASE_URL}/users/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
             headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },

        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        return res.json();
    }
    async getUserById(id: string ) {
        const res = await fetch(`${BASE_URL}/users/${id}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        });
        if (!res.ok) {
            throw new Error("Login failed");
        }

        return res.json();
    }
    async deleteUser(id: string) {
        const res = await fetch(`${BASE_URL}/users/${id}`, {
            method: "DELETE",
             headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },

        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        return res.json();
    }
    async ListCousres() {
        const res = await fetch(`${BASE_URL}/courses`, {
            method: "GET",
             headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        return res.json();
    }
    async ListTupdateCourses(id: string, body: any) {
        const res = await fetch(`${BASE_URL}/courses/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ body }),
             headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },

        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        return res.json();
    }


}

export default new AuthAPI();


