<script>
  let { data } = $props();
  let loggedInUser = data.loggedInUser || null;
</script>

<div class="hero-section">
    <div class="hero-background-image">
        <img
        src="https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=881"
        alt="banner"
        />
        <img
        src="https://plus.unsplash.com/premium_photo-1676736592709-8bc1a9b6b163?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
        alt="banner"
        />
    </div>

  <div class="hero-image-overlay">
    <div class="container hero-content text-white text-center">
      <h1 class="display-4 fw-bold mb-3">
        Welcome {loggedInUser ? loggedInUser.firstName : "To Football Performance and Prevention"}!
      </h1>
      <p class="lead mt-3">Elevate Your Game. Minimize Risk</p>

      <div class="d-grip gap-2 d-sm-flex justify-content-sm-center">
        {#if loggedInUser}
          <a href="/dashboard" class="btn btn-warning btn-lg px-4"
            >View My Dashboard</a
          >
          <a href="/crud-teams" class="btn btn-outline-light btn-lg px-4"
            >Manage Teams</a
          >
        {:else}
          <a href="/auth/register" class="btn btn-warning btn-lg px-4"
            >Start Free Today</a
          >
          <a href="/auth/login" class="btn btn-outline-light btn-lg px-4"
            >Log In</a
          >
        {/if}
      </div>

      <p class="small mt-4">
        Trusted by Coaches and Players Worldwide
      </p>
    </div>
  </div>
</div>

<style>
  /* Import Google Fonts for a consistent look */
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

  .hero-section {
    position: relative;
    width: 100%;
    /* Set a reasonable height for the banner */
    height: 60vh;
    min-height: 400px;
    overflow: hidden;
    /* Center the content vertically and horizontally */
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Poppins", sans-serif;
  }

  /* Styling for the Image */
  .hero-background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the image covers the entire area */
    z-index: 1;

    display: flex;
  }

  .hero-background-image img {
    width: 50%;
    height: 100%;
    object-fit: cover;
  }

  /* Styling for the Overlay */
  .hero-image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Dark semi-transparent background for readability */
    background: rgba(0, 0, 0, 0.65);
    z-index: 2;
  }

  /* Styling for the Text Content */
  .hero-content {
    position: relative;
    z-index: 3; /* Ensure content is on top of the image and overlay */
    padding: 2rem 1rem;
    max-width: 800px;
  }

  /* Customizing a Bootstrap button color for visual interest */
  .btn-warning {
    /* Use a color that complements the dark background */
    background-color: #ffc107;
    border-color: #ffc107;
    font-weight: 600;
    transition: transform 0.2s ease;
  }

  .btn-warning:hover {
    background-color: #e0a800;
    border-color: #e0a800;
    transform: translateY(-2px);
  }

  .btn-outline-light {
    font-weight: 600;
  }
</style>
