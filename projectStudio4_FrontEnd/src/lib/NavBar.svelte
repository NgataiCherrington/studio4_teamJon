<script>
  let { loggedInUser = null } = $props();
</script>

<!-- Bootstrap Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow">
  <div class="container">
    <!-- Brand / Logo -->
    <a class="navbar-brand fw-bold brand-logo" href="/"
      >Football Performance and Prevention</a
    >

    <!-- Toggler for mobile -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Navbar links -->
    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link px-3" href="/">Home</a>
        </li>
        <!-- If user is not logged only see this  -->
        {#if !loggedInUser}
          <li class="nav-item">
            <a class="nav-link px-3" href="/auth/register">Sign Up</a>
          </li>
          <li class="nav-item">
            <a class="nav-link px-3" href="/auth/login">Log in</a>
          </li>
        {/if}
        <li class="nav-item">
          <a class="nav-link px-3" href="/user-display">List of Users</a>
        </li>
        <li class="nav-item">
          <a class="nav-link px-3" href="/crud-teams">Teams</a>
        </li>
        {#if loggedInUser}
        <li class="nav-item">
          <form method="POST" action="/?/logout" class="d-inline">
            <button
            type="submit"
            class="btn btn-outline-light btn-sm logout-btn"
            >
            <i class="bi bi-box-arrow-right"></i> Logout
          </button>
        </form>
      </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>

<!-- User details card  -->
{#if loggedInUser}
  <div class="user-details-container">
    <div class="container position-relative">
      <div class="user-details-card">
        <div class="user-avatar">
          <i class="bi bi-person-circle"></i>
        </div>
        <div class="user-info">
          <div class="user-name">
            Username: {loggedInUser.firstName}
            {loggedInUser.lastName}
          </div>
          <div class="user-email">Email: {loggedInUser.email}</div>
          <div class="user-role">
            <span class="badge bg-primary">Role: {loggedInUser.role}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Optional Custom Styling -->
<style>
  @import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");

  /* Navbar Styling */
  .navbar {
    font-family: "Poppins", sans-serif;
    padding: 1rem 0;
  }

  .brand-logo {
    font-family: "Russo One", sans-serif;
    letter-spacing: 2px;
    font-size: 1.75rem;
    background: linear-gradient(45deg, #af7a09 0%, #c5b7d3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-link {
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
  }

  .nav-link::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
  }

  .nav-link:hover::after {
    width: 80%;
  }

  .nav-link:hover {
    color: #667eea !important;
  }

  .logout-btn {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    transition: all 0.3s ease;
    border: 2px solid #fff;
  }

  .logout-btn:hover {
    background: #fff;
    color: #212529 !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
  }

  /* User Details Card */
  .user-details-container {
    padding: 0;
    position: fixed;
    top: 5rem;
    right: 0;
    padding: 0;
    margin: 0;
    z-index: 1050;
    /* box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); */
  }

  .user-details-card {
    position: static;
    top: auto;
    transform: none;
    margin-top: 1rem;
    margin-right: 1.5rem;
    background: white;
    border-radius: 15px;
    padding: 1.25rem 0.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 250px;
    transition: all 0.3s ease;
  }

  .user-details-card:hover {
    transform: translateY(-13px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  }

  .user-avatar {
    font-size: 3rem;
    color: #667eea;
    line-height: 1;
  }

  .user-info {
    flex: 1;
  }

  .user-name {
    font-family: "Poppins", sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.25rem;
  }

  .user-email {
    font-family: "Poppins", sans-serif;
    font-size: 0.85rem;
    color: #718096;
    margin-bottom: 0.5rem;
  }

  .user-role {
    margin-top: 0.5rem;
  }

  .badge {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    padding: 0.35rem 0.75rem;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
  }

  /* Responsive adjustments */

  @media (max-width: 991px) {

    .user-details-container {
      position: static;
      z-index: auto;
      padding: 1rem 0;
    }
    .user-details-card {
      position: static;
      transform: none;
      margin: 1rem auto;
      max-width: 450px;
    }

    .user-details-card:hover {
      transform: translateY(-5px);
    }

    .navbar-nav {
      padding: 1rem 0;
    }

    .nav-item {
      padding: 0.25rem 0;
    }

    .nav-link {
      padding : 0.75rem 1rem !important;
      font-size: 1.1rem;
    }

    .logout-btn {
      width: 100%;
      padding: 0.75rem 1.25rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    .navbar {
      padding: 0.75rem 0;
    }

    .brand-logo {
      font-size: 1.25rem;
      letter-spacing: 0.5px;
      line-height: 1.3;
    }

    .user-details-card {
      min-width: auto;
      width: calc(100% - 2rem);
      margin: 0 1rem;
      padding: 1rem 0.75rem;
      gap: 0.75rem;
    }

    .user-avatar {
      font-size: 2.5rem;
    }

    .user-name {
      font-size: 0.95rem;
    }

    .user-email {
      font-size: 0.8rem;
    }

    .badge {
      font-size: 0.7rem;
      padding: 0.3rem 0.6rem;
    }
  }

  /* Small mobile phones */
  @media (max-width: 480px) {
    .brand-logo {
      font-size: 1rem;
      max-width: 200px;
      white-space: normal;
      line-height: 1.2
    }

    .navbar-toggler {
      padding: 0.25rem 0.5rem;
      font-size: 1rem;
    }

    .user-details-card {
      flex-direction: column;
      text-align: center;
      padding: 1.5rem 0.5rem;
    }

    .user-avatar {
      font-size: 3.5rem;
    }

    .user-name,
    .user-email {
      text-align: center;
    }
  }

  /* Extra small screens */
  @media (max-width: 360px) {
    .brand-logo {
      font-size: 0.85rem;
    }

    .nav-link {
      font-size: 0.95rem;
      padding: 0.5rem 0.75rem !important;
    }
  }
</style>
