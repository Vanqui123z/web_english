const BASE_URL = "http://localhost:3000/tutors";

class TutorAPI {
    async getAll() {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        });

        if (!res.ok) {
            throw new Error("Get tutors failed");
        }

        return res.json();
    }
    async getAllTutorsCreated() {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/created`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        });

        if (!res.ok) {
            throw new Error("Get tutors created failed");
        }

        return res.json();
    }

    async getById(id: string) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        });

        if (!res.ok) {
            throw new Error("Get tutor failed");
        }

        return res.json();

    }

    async create(tutorData: any) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/create`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(tutorData)
        });

        if (!res.ok) {
            throw new Error("Create tutor failed");
        }

        return res.json();
    }

    async getMyProfile() {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/me`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
        });

        if (!res.ok) {
            throw new Error("Get tutor profile failed");
        }

        return res.json();
    }

    async updateProfile(tutorId: string, tutorData: any) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/${tutorId}/update`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(tutorData)
        });

        if (!res.ok) {
            throw new Error("Update tutor profile failed");
        }

        return res.json();
    }
}
export default new TutorAPI;