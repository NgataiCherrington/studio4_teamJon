import { env } from "$env/dynamic/private";
import { fail } from "@sveltejs/kit";

const API_BASE_URL = "https://ngatai-introappdev-backend.onrender.com" || " http://localhost:3000";

export const actions = {
    register: async (event) => {
        const formData = await event.request.formData();
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const phoneNumber = formData.get("phoneNumber");
        const dob = formData.get("dob");
        const role = formData.get("role");
        const user = { firstName, lastName, email, password, confirmPassword, phoneNumber, dob, role };

        if (password !== confirmPassword) {
            return fail(400, {
                success: false,
                error: "Passwords do not match",
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                dob,
                role,
            });
        }

        // If password is less than 8 characters, return error
        if (password.length < 8) {
            return {
                success: false,
                error: "Password must be at least 8 characters long",
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                dob,
                role,
            }
        }
        	
        // If password does not contain at least one number, return error
        if (!/\d/.test(password)) {
            return {
                success: false,
                error: "Password must contain at least one number",
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                dob,
                role,
            }
        }

        // If password does not contain at least one special character, return error
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return {
                success: false,
                error: "Password must contain at least one special character",
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                dob,
                role,
            }
        }

        // If password does not contain at least one uppercase letter, return error
        if (!/[A-Z]/.test(password)) {
            return {
                success: false,
                error: "Password must contain at least one uppercase letter",
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                dob,
                role,
            }
        }

        // If password does not contain at least one lowercase letter, return error
        if (!/[a-z]/.test(password)) {
            return {
                success: false,
                error: "Password must contain at least one lowercase letter",
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                dob,
                role,
            }
        }
        try {
            console.log(`${API_BASE_URL}/api/auth/register`)
            const res = await event.fetch(`${API_BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
              });

            const data = await res.json();

            if(!res.ok) {
                return fail(409, {
                    success: false,
                    error: data.message,
                    errors: data.errors,
                    firstName,
                    lastName,
                    email,
                    password,
                    phoneNumber,
                    dob,
                    role,
                });
            }

            return { success: true, message: data.message };
        } catch(err) {
            return fail(500, {
                success: false,
                error: err.message,
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                dob,
                role,
            });
        }
    },
};