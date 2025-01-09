<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent="handleLogin">
      <label for="username">Username:</label>
      <input id="username" v-model="username" type="text" required />
      <label for="password">Password:</label>
      <input id="password" v-model="password" type="password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>


<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('https://echo-66xz.onrender.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        console.log('Login successful:', data);

        // Redirect to the main app page
        this.$router.push('/app');
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>
