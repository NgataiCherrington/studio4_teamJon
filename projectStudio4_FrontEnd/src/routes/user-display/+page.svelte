<script>
  import { env } from "$env/dynamic/public";
  import { onMount } from "svelte";

  // Rune variables
  let { data, form } = $props();
  let loggedInUser = data.loggedInUser || null;
  let users = $state([]);
  let filteredUsers = $state([]);
  let error = $state(null);
  
  let message = data.users?.message;
  let errors = form?.errors;
  let tokenError = form?.error;
  
  // Pagination
  let currentPage = $state(1);
  let itemsPerPage = $state(9);
  let totalPages = $state(1);
  
  // Sorting
  let sortField = $state("firstName");
  let sortOrder = $state("asc");
  
  // Filtering
  let searchQuery =$state("");
  
  const API_BASE_URL =
  "https://ngatai-introappdev-backend.onrender.com" ||
  "http://localhost:3000";
  
  async function fetchUsers() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`);
      const json = await res.json();
      users = json.data?.data || []; // Access the nested data.data array and makes sure it is always and array
      currentPage = 1;
      applyFilters();
    } catch (err) {
      error = err.message;
    }
  }
  
  function applyFilters() {
    // Filter
    let temp = users.filter(user => 
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort
  temp.sort((a, b) => {
    const valA = a[sortField]?.toString().toLowerCase() ?? "";
    const valB = b[sortField]?.toString().toLowerCase() ?? "";
    if (sortOrder === "asc") {
      return valA.localeCompare(valB);
    } else {
      return valB.localeCompare(valA);
      }
    })
    
    filteredUsers = [...temp];
    totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    
  }
  // Pagination
  
  function getPaginatedUsers() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredUsers.slice(start, end);
  }
  
  onMount(fetchUsers);
  
  
  console.log("Logged in user:", loggedInUser);
</script>

<div class="container mt-5">
  <h1 class="text-center mb-5">Users</h1>

  <!-- Filter and Sort -->
  <div class="row mb-4">
    <div class="col-12 col-md-6 mb-2">
      <input 
      type="text"
      class="form-control"
      placeholder="Search by name"
      bind:value={searchQuery}
      oninput={() => { currentPage = 1; applyFilters(); }}
      >
    </div>
    <div class="col-12 col-md-3 mb-2">
      <select class="form-select" bind:value={sortField} onchange={() => { currentPage = 1; applyFilters(); }}>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="role">Role</option>
      </select>
    </div>
    <div class="col-12 col-md-3 mb-2">
      <select class="form-select" bind:value={sortOrder} onchange={() => { currentPage = 1; applyFilters(); }}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  </div>

   <!-- Apply Button -->
   <!-- <div class="row mb-4">
    <div class="col-12">
      <button 
        class="btn btn-primary w-100" 
        onclick={() => { currentPage = 1; applyFilters(); }}
      >
        Apply
      </button>
    </div>
  </div> -->

  {#if error}
    <div class="alert alert-danger text-center">{error}</div>
  {:else if filteredUsers.length > 0}
    <div class="row g-4">
      {#each getPaginatedUsers() as user}
        <div class="col-lg-4 col-md-6">
          <div class="card shadow-sm h-100">
            <div class="card-body d-flex flex-column text-center text-md-start">
              <h5 class="card-title">{user.firstName} {user.lastName}</h5>
              <p class="card-text text-muted mb-3">
                <strong>Email:</strong>
                {user.email}
              </p>
              <p class="card-text text-muted mb-3">
                <strong>Role:</strong>
                {user.role}
              </p>
              <p class="card-text text-muted mb-3">
                <strong>Phone:</strong>
                {user.phoneNumber}
              </p>
              <!-- If user has admin role -->
              {#if loggedInUser && loggedInUser.role === 'ADMIN'}
              <!-- Update Form -->
              <form method="POST" action="?/update" class="mb-3">
                <input type="hidden" name="id" value={user.id} />
                <div class="mb-2">
                  <input
                  type="text"
                  name="firstName"
                  class="form-control form-control-sm"
                  value={form?.user?.firstName ?? ""}
                  placeholder="First name"
                  />
                </div>
                <div class="mb-2">
                  <input
                  type="text"
                  name="lastName"
                  class="form-control form-control-sm"
                  value={form?.user?.lastName ?? ""}
                  placeholder="Last name"
                  />
                </div>
                <button type="submit" class="btn btn-primary btn-sm w-100">
                  Update
                </button>
              </form>
              <!-- Delete Form -->
              <form method="POST" action="?/delete">
                <input type="hidden" name="id" value={user.id} />
                <button type="submit" class="btn btn-danger btn-sm w-100">
                  Delete
                </button>
              </form>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Pagination -->
    <div class="d-flex flex-column flex-sm-row justify-content-center mt-4 gap-2">
      <button class="btn btn-secondary btn-sm" onclick={() => currentPage = Math.max(1, currentPage - 1)} disabled={currentPage === 1}>Prev</button>
      <span class="align-self-center">{currentPage} / {totalPages}</span>
      <button class="btn btn-secondary btn-sm" onclick={() => currentPage = Math.min(totalPages, currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
    </div>
  {:else}
    <p class="text-center text-muted">No users found.</p>
  {/if}
</div>
