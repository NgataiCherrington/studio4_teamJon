import { env } from "$env/dynamic/private";
import { error, json } from "@sveltejs/kit";

const API_BASE_URL =
  "https://ngatai-introappdev-backend.onrender.com" || "http://localhost:3000";

export const load = async ({ fetch }) => {
  try {
    console.log("Fetching users from:", API_BASE_URL);

    const res = await fetch(`${API_BASE_URL}/api/users`);

    console.log("Response status:", res.status);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const users = await res.json();

    return {
      users,
      user: null,
      error: null,
    };
  } catch (err) {
    return {
      users: { data: { data: [] } },
      error: err.message,
    };
  }
};

export const actions = {
  delete: async ({ request, fetch, cookies }) => {
    const token = cookies.get("token");

    const formData = await request.formData();
    const id = formData.get("id");

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },
  update: async ({ request, fetch, cookies }) => {
    const token = cookies.get("token");

    const formData = await request.formData();
    const id = formData.get("id");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const user = { firstName, lastName };
    console.log(user);

    try {
      console.log("here")
      const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      console.log("here2")
      const data = await res.json();
      console.log("here3")
      console.log("Data: ", data)

      if (!res.ok) {
        return fail(409, {
          error: data.message,
          errors: data.errors,
          firstName,
          lastName,
        });
      }

      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },
};
