import { fail, redirect } from "@sveltejs/kit";

const API_BASE_URL =
  "https://ngatai-introappdev-backend.onrender.com" || "http://localhost:3000";

export const actions = {
  logout: async ({ cookies, fetch }) => {
    const token = cookies.get("token");

    if (token) {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    cookies.delete("token", { path: "/" });
    throw redirect(303, "/");
  },
};
