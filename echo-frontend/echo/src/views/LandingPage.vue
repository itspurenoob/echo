<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <h1>Welcome to Echo!</h1>
      <p>The ultimate chatting platform built just for you.</p>
      <div class="actions">
        <button @click="goToRegister">Get Started</button>
        <button @click="goToLogin">Login</button>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <h2>Why Choose Echo?</h2>
      <ul>
        <li>Real-time communication.</li>
        <li>Seamless channel creation.</li>
        <li>Beautiful, responsive design.</li>
      </ul>
    </section>

    <!-- Footer -->
    <footer>
      <p>&copy; 2024 Echo. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  methods: {
    goToRegister() {
      this.$router.push("/register");
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.landing-page {
  text-align: center;
  padding: 2rem;
}

.hero {
  background: #4caf50;
  color: white;
  padding: 3rem 1rem;
}

.features {
  margin: 2rem 0;
}

footer {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: gray;
}
</style>
