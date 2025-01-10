<template>
  <div class="d-flex justify-content-center align-items-center vh-100" style="background-color: #36393f;">
    <div class="card p-4 text-light" style="background-color: #2f3136; width: 400px; border: none; border-radius: 8px;">
      <h1 class="text-center mb-4" style="font-size: 24px; font-weight: bold;">Create an account</h1>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="email" class="form-label" style="color: #b9bbbe; font-size: 12px;">EMAIL</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-control"
            style="background-color: #202225; border: none; border-radius: 4px; color: #dcddde;"
            placeholder="Enter your email"
            required
          />
        </div>
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
        <div class="mb-3">
          <label for="confirmPassword" class="form-label" style="color: #b9bbbe; font-size: 12px;">CONFIRM PASSWORD</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            class="form-control"
            style="background-color: #202225; border: none; border-radius: 4px; color: #dcddde;"
            placeholder="Confirm your password"
            required
          />
        </div>
        <button
          class="btn w-100"
          type="submit"
          style="background-color: #5865f2; color: white; font-weight: bold; border: none; border-radius: 4px;"
        >
          Register
        </button>
      </form>
      <p v-if="errorMessage" class="text-center mt-3" style="color: #f04747; font-size: 14px;">{{ errorMessage ,showError(errorMessage) }}</p>
      
      <p class="text-center mt-3" style="color: #b9bbbe; font-size: 12px;">
        Already have an account? <router-link to="/app/login" style="color: #00b0f4; text-decoration: none;">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match!";
        return;
      }

      // Registration logic here
      this.errorMessage = ""; // Clear any previous error
      try {
        const response = await fetch('https://echo-66xz.onrender.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
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
  }
};
</script>
