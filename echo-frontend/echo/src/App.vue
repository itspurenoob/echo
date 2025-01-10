<template>
  <div  v-if="$route.path === '/app/'">
    <!-- Navigation Bar -->
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid"> <!-- Adds padding to left and right -->
    <a class="navbar-brand" href="#">
      <img
        src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
      />
      ECHO
    </a>
    <form class="form-inline">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
        Login
      </button>
    </form>
  </div>
</nav>


    <!-- Hero Section -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to Echo
        </h1>
        <p class="text-lg text-gray-600 mb-8">
          A place where your ideas come alive. Join us today and explore the possibilities.
        </p>
        <router-link
          to="/app/login"
          class="px-6 py-3 bg-blue-500 text-black text-lg font-medium rounded hover:bg-blue-600 transition"
        >
          Get Started
        </router-link>
      </div>
    </section>

  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Simulate login state (replace with real logic)
    };
  },
};
</script>

<style>
/* Additional custom styles can be added here */
</style>
