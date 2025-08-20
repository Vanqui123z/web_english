const BASE_URL = "http://localhost:3000/tutors";

class TutorAPI {
    async getAll() {
        const res = await fetch(`${BASE_URL}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        return res.json();
    }
    async getById(id:string) {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        return res.json();
        
    }
}
export default new TutorAPI;