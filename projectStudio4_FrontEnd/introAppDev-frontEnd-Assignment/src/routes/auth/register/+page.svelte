<script>
  let { form } = $props();
</script>

<div class="container mt-5">
  <h1 class="text-center mb-4">Register</h1>

  <form method="POST" action="?/register" class="mx-auto p-4 border rounded shadow-sm" style="max-width: 500px;">
    
    <div class="mb-3">
      <label for="firstName" class="form-label">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        class="form-control"
        value={form?.firstName ?? ""}
        placeholder="Enter First Name"
      />
    </div>

    <div class="mb-3">
      <label for="lastName" class="form-label">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        class="form-control"
        value={form?.lastName ?? ""}
        placeholder="Enter Last Name"
      />
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        class="form-control"
        value={form?.email ?? ""}
        placeholder="Enter Email"
      />
    </div>

    <div class="mb-3">
      <label for="dob" class="form-label">Date of Birth</label>
      <input
        type="date"
        id="dob"
        name="dob"
        class="form-control"
        value={form?.dob ?? ""}
        required
      />
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        class="form-control"
        value={form?.password ?? ""}
        placeholder="Enter Password"
      />
      <small class="form-text text-muted">
        Password must contain:
        <ul>
          <li>At least 8 characters</li>
          <li>At least one uppercase letter</li>
          <li>At least one lowercase letter</li>
          <li>At least one number</li>
          <li>At least one special character (!@#$%^&*)</li>
        </ul>
      </small>
    </div>

    <div class="mb-3">
      <label for="confirmPassword" class="form-label">Confirm Password</label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        class="form-control"
        placeholder="Confirm Password"
      />
    </div>

    <div class="mb-3">
      <label for="phoneNumber" class="form-label">Phone Number</label>
      <input
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        class="form-control"
        value={form?.phoneNumber ?? ""}
        placeholder="Enter Phone Number"
      />
    </div>

    <div class="mb-3">
      <label for="role" class="form-label">Role</label>
      <select
        name="role"
        id="role"
        class="form-select"
      >
        <option value="ADMIN" selected={form?.role === "ADMIN"}>Admin</option>
        <option value="NORMAL" selected={form?.role === "NORMAL"}>Normal</option>
      </select>
    </div>

    <button type="submit" class="btn btn-primary w-100">Submit</button>
  </form>

  {#if form?.success}
    <div class="alert alert-success mt-3 text-center">{form.message}</div>
  {/if}

  {#if form?.success === false}
    <div class="alert alert-danger mt-3 text-center">{form.error}</div>
  {/if}
</div>
