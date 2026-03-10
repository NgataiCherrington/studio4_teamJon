import { form } from "$app/server";
import { env } from "$env/dynamic/private";
import { error, fail } from "@sveltejs/kit";

const API_BASE_URL =
  "https://ngatai-introappdev-backend.onrender.com" || "http://localhost:3000";

export const load = async ({ fetch }) => {
  try {
    console.log("Fetching team from:", API_BASE_URL);

    const res = await fetch(`${API_BASE_URL}/api/teams`);

    console.log("Response status:", res.status);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const teams = await res.json();

    return {
      teams,
      error: null,
    };
  } catch (err) {
    return {
      teams: { data: { data: []} },
      error: err.message,
    };
  }
};

export const actions = {
  create: async ({ request, cookies }) => {
    const token = cookies.get("token");

    const formData = await request.formData();
    const userId = formData.get("userId");
    const teamName = formData.get("teamName");
    const team = { teamName, userId };

    try {
      const res = await fetch(`${API_BASE_URL}/api/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(team),
      });

      const data = await res.json();

      if (!res.ok) {
        return fail(409, {
          error: data.message,
          errors: data.errors,
          teamName,
        });
      }

      return {
        success: true,
        message: data.message,
      };
    } catch (err) {
      return fail(500, {
        success: false,
        error: err.message,
        teamName,
      });
    }
  },
  delete: async ({ request, fetch, cookies }) => {
    const token = cookies.get("token");

    const formData = await request.formData();
    const id = formData.get("id");

    try {
      const res = await fetch(`${API_BASE_URL}/api/teams/${id}`, {
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
};
