<script>
	let { form } = $props();
  </script>
  
  <div class="container mt-5">
	<h1 class="text-center mb-4">Login</h1>
  
	<form method="POST" action="?/login" class="mx-auto p-4 border rounded shadow-sm" style="max-width: 400px;">
	  
	  <div class="mb-3">
		<label for="email" class="form-label">Email Address</label>
		<input
		  id="email"
		  name="email"
		  type="email"
		  class="form-control"
		  value={form?.email ?? ''}
		  placeholder="Enter email address"
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
		  value={form?.password ?? ''}
		  placeholder="Enter password"
		  required
		/>
	  </div>
  
	  <button type="submit" class="btn btn-primary w-100">Login</button>
	</form>
  
	{#if form?.success}
	  <div class="alert alert-success mt-3 text-center">{form.message}</div>
	{/if}
  
	{#if form?.success === false}
	  <div class="alert alert-danger mt-3 text-center">{form.error}</div>
	{/if}
  </div>
  