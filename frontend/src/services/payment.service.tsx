const BASE_URL = `${import.meta.env.VITE_API_URL}/payments`;
const BASE_URL_ME = `${import.meta.env.VITE_API_URL}/users/profile`;
const token = localStorage.getItem('token');

class AuthAPI {
    async checkout(amount:number, packageId:string, tutorId:string) {
        const res = await fetch(`${BASE_URL}/${tutorId}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
            body: JSON.stringify({ amount, packageId }),
        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        return res.json();
    }
    
    async me() {
        const res = await fetch(`${BASE_URL_ME}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        return res.json();
    }
    
}

export default new AuthAPI();


