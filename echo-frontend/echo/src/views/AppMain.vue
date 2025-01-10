<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center align-items-center vh-100" style="background-color: #36393f;">
      <p style="color: #b9bbbe;">Loading...</p>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  created() {
    this.checkAuthentication();
  },
  methods: {
    async checkAuthentication() {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      
      if (isLoggedIn) {
        // Example: Make a request to verify if the session is valid
        try {
          const response = await fetch("/api/verify-session", { credentials: "include" });
          if (response.ok) {
            const data = await response.json();
            if (data.isLoggedIn) {
              // User is authenticated, proceed to the app
              this.isLoading = false;
              return;
            }
          }
        } catch (error) {
          console.error("Session verification failed:", error);
        }
      }
      
      // Redirect to login if not authenticated
      this.$router.push("/app/login");
    },
  },
};
</script>
