<template>
  <div class="d-flex justify-content-center align-items-center vh-100" style="background-color: #36393f;">
    <div class="card p-4 text-light" style="background-color: #2f3136; width: 400px; border: none; border-radius: 8px;">
      <h1 class="text-center mb-4" style="font-size: 24px; font-weight: bold;">Welcome Back!</h1>
      <p class="text-center mb-4" style="font-size: 14px; color: #b9bbbe;">
        We're so excited to see you again!
      </p>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label" style="color: #b9bbbe; font-size: 12px;">USERNAME</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="form-control"
            style="background-color: #202225; border: none; border-radius: 4px; color: #dcddde;"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label" style="color: #b9bbbe; font-size: 12px;">PASSWORD</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-control"
            style="background-color: #202225; border: none; border-radius: 4px; color: #dcddde;"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          class="btn w-100"
          type="submit"
          style="background-color: #5865f2; color: white; font-weight: bold; border: none; border-radius: 4px;"
        >
          Login
        </button>
      </form>
      <p v-if="errorMessage" class="text-center mt-3" style="color: #f04747; font-size: 14px;">{{ errorMessage ,showError(errorMessage) }}</p>

      <p class="text-center mt-3" style="color: #b9bbbe; font-size: 12px;">
        Need an account? <router-link  to="/app/register" style="color: #00b0f4; text-decoration: none;">Register</router-link>
      </p>
    </div>
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
      if (!localStorage.getItem('isLoggedIn') && typeof data.isLoggedIn === 'boolean') {
        localStorage.setItem('isLoggedIn', JSON.stringify(data.isLoggedIn));
      }


        // Redirect to the main app page
        this.$router.push('/app/me');
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    showError(message) {
      this.errorMessage = message;

      // Clear the error message after 3 seconds
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }
  },
};
</script>
