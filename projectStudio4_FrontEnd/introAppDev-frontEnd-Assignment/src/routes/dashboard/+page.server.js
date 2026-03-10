import { error, fail, redirect } from "@sveltejs/kit";

const API_BASE_URL =   "https://ngatai-introappdev-backend.onrender.com" || "http://localhost:3000";

export const load = async ({ fetch, cookies }) => {
    try{
        const token = cookies.get("token");

        if(!token){
            throw redirect(303, '/login')
        }
        console.log("Fetching user details from:", API_BASE_URL);

        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Response status", res.status);
        if(!res.ok){
            throw redirect(303, '/login')
        }

        const userDetails = await res.json();

        return{
            user: userDetails,
            error: null,
        };
    } catch(err) {
        return{
            userDetails: null,
            error: err.message,
        }
    }
}
