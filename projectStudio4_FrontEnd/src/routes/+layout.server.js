import { error, fail, redirect } from "@sveltejs/kit";

const API_BASE_URL =   "https://ngatai-introappdev-backend.onrender.com" || "http://localhost:3000";

export const load = async ({ fetch, cookies }) => {
    try{
        const token = cookies.get("token");

        if(!token){
            console.log("No token found, redirecting to login");
            return {
                user: null,
                error: "No authentication token found",
            };
        }

        console.log("Token found:", token.substring(0, 20) + "...");
        console.log("Fetching user details from:", API_BASE_URL);

        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Response status", res.status);
        if(!res.ok){
            const errorText = await res.text();
            console.error("Failed to fetch user details:", errorText);

            // Clear invalid token but do not redirect here
            cookies.delete("token", { path: "/" });
            return {
                user: null,
                error: "Failed to load user details",
            };
        }

        const userDetails = await res.json();
        console.log("User details fetched:", userDetails);

        return{
            loggedInUser: userDetails,
            error: null,
        };
    } catch(err) {
        console.error("Error fetching user details:", err);
        return{
            loggedInUser: null,
            error: err.message,
        }
    }
}
