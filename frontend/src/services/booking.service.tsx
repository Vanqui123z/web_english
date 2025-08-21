const BASE_URL = "http://localhost:3000/booking";
const token = localStorage.getItem("token")


class BookingAPI {
    async create(tutorId:string, date:Date) {
        const res = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" ,  Authorization: "Bearer "+ token},
            body: JSON.stringify({ tutorId,date  }),
        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        return res.json();
    }
    async getByStudent() {
        const res = await fetch(`${BASE_URL}/student`, {
            method: "GET",
            headers: { "Content-Type": "application/json" ,  Authorization: "Bearer "+ token},

        });

        if (!res.ok) {
            throw new Error("get booking student failed");
        }

        return res.json();
        
    }
    async getByTutor() {
        const res = await fetch(`${BASE_URL}/tutor`, {
            method: "GET",
            headers: { "Content-Type": "application/json" ,  Authorization: "Bearer "+ token},

        });

        if (!res.ok) {
            throw new Error("get booking tutor failed");
        }

        return res.json();
        
    }
}
export default new BookingAPI;