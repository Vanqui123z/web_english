const BASE_URL = `${import.meta.env.VITE_API_URL}/booking`;
const token = localStorage.getItem("token")

class BookingAPI {
    async create(tutorId:string, date:Date) {
        const res = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" ,   "Authorization": `Bearer ${token}`},
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
            headers: { "Content-Type": "application/json" ,    "Authorization": `Bearer ${token}`},

        });

        if (!res.ok) {
            throw new Error("get booking student failed");
        }

        return res.json();
        
    }
    async getByTutor() {
        const res = await fetch(`${BASE_URL}/courses`, {
            method: "GET",
            headers: { "Content-Type": "application/json" ,   "Authorization": `Bearer ${token}`},

        });

        if (!res.ok) {
            throw new Error("get booking tutor failed");
        }

        return res.json();
        
    }
    async updateStatus(bookingId: string, status: string) {
        const res = await fetch(`${BASE_URL}/status/${bookingId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ status }),
        });
        if (!res.ok) {
            throw new Error("Update booking status failed");
        }
        return res.json();
    }
}
export default new BookingAPI;