<script>
    export let data;
  </script>
  
  {#if data.userDetails}
    <div class="user-info">
      <h2>Welcome back, {data.userDetails.firstName} {data.userDetails.lastName}!</h2>
      <p>Email: {data.userDetails.email}</p>
      <p>Phone: {data.userDetails.phoneNumber}</p>
      <p>Role: {data.userDetails.role}</p>
    </div>
  {:else if data.error}
    <p class="text-red-500">Error: {data.error}</p>
  {:else}
    <p>Loading your details...</p>
  {/if}