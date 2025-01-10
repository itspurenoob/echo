<template>
  <div :class="theme" class="full-height-container" v-if="$route.path === '/app/'">
    <!-- Navigation Bar -->
    <nav :class="['navbar', theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-gray']">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img
            src="../public/favicon.ico"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
          ECHO
        </a>
        <form class="form-inline">
          <button
            class="btn  my-2 my-sm-0"
            type="button"
            @click="toggleTheme"
          >
         <span v-if="theme === 'dark'" class="text-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
              <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
          </span>
          <span v-else >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
          </span>
          </button>
        </form>
      </div>
    </nav>

    <!-- Hero Section -->
    <section
      class="d-flex flex-column justify-content-center align-items-center text-center"
      :style="theme === 'dark'
        ? 'background-color: #2f3136; color: #dcddde; height: 100%;'
        : 'background-color: #f8f9fa; color: #212529; height: 100%;'"
    >
      <div class="container px-4">
        <h1 class="text-4xl font-extrabold mb-4">
          Welcome to Echo
        </h1>
        <p class="text-lg mb-8">
          A place where your ideas come alive. Join us today and explore the possibilities.
        </p>
        <router-link
          to="/app/login"
          class="px-6 py-3"
          :class="[
            'text-lg font-medium rounded transition bi-eye',
            theme === 'dark'
              ? 'text-white hover:bg-blue-600'
              : 'text-dark hover:bg-primary-dark'
          ]"
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
      theme: "dark", // Default theme
    };
  },
  created() {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      this.theme = savedTheme;
    }
  },
  methods: {
    toggleTheme() {
      // Toggle between dark and light
      this.theme = this.theme === "dark" ? "light" : "dark";
      // Save the current theme to localStorage
      localStorage.setItem("theme", this.theme);
    },
  },
};
</script>

<style scoped>
/* Ensure the container fills the screen height */
.full-height-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Ensure the hero section fills remaining space */
section {
  flex: 1;
}
</style>
