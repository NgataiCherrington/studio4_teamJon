<script>
  import { onMount } from "svelte";

  let { data, form } = $props();
  let loggedInUser = data.loggedInUser || null;
  let teams = $state([]);
  let error = $state(null);
  let message = data?.teams?.message ?? "No teams";
  let errors = form?.errors;
  let tokenError = form?.error;

  const API_BASE_URL =
    "https://ngatai-introappdev-backend.onrender.com" ||
    "http://localhost:3000";

  onMount(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/teams`);
      const json = await res.json();
      
      teams = json.data.data; // Access the nested data.data array
    } catch (err) {
      error = err.message;
    }
  });
</script>

<div class="container mt-5">
  <div class="row g-4">
    <!-- LEFT SIDE: Create Team Form -->
    <div class="col-lg-4">
      <div class="p-4 border rounded shadow-sm h-100">
        <h2 class="text-center mb-4">Create a Team</h2>

        <form method="POST" action="?/create">
          <!-- <div class="mb-3">
            <label for="userId" class="form-label">User ID</label>
            <input
              type="text"
              id="userId"
              name="userId"
              class="form-control"
              value={form?.userId ?? ""}
              placeholder="Enter your user ID"
            
            />
          </div> -->

          <div class="mb-3">
            <label for="teamName" class="form-label">Team Name</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              class="form-control"
              value={form?.teamName ?? ""}
              placeholder="Enter team name"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary w-100">
            Create Team
          </button>
        </form>

        <!-- Form Feedback -->
        {#if form?.success}
          <div class="alert alert-success mt-3 text-center">{form.message}</div>
        {/if}

        {#if form?.success === false}
          <div class="alert alert-danger mt-3 text-center">{form.error}</div>
        {/if}

        {#if errors && errors.length > 0}
          <div class="alert alert-warning mt-3">
            <ul class="mb-0">
              {#each errors as error}
                <li>{error.message}</li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    </div>

    <!-- RIGHT SIDE: Team List -->
    <div class="col-lg-8">
      <h2 class="text-center mb-4">Teams</h2>

      {#if error}
        <div class="alert alert-danger text-center">{error}</div>
      {:else if teams && teams.length > 0}
        <div class="row g-4">
          {#each teams as team}
            <div class="col-md-6 col-lg-4">
              <div class="card shadow-sm h-100">
                <div class="card-body text-center">
                  <h5 class="card-title">{team.teamName}</h5>
                  <p class="card-text text-muted">Team ID: {team.id}</p>

                  {#if loggedInUser && loggedInUser.role === "ADMIN" }
                  <form
                    method="POST"
                    action="?/delete"
                    class="d-flex justify-content-center"
                  >
                    <input type="hidden" name="id" value={team.id} />
                    <button type="submit" class="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </form>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else if message}
        <p class="text-center text-muted">{message}</p>
      {/if}
    </div>
  </div>
</div>
