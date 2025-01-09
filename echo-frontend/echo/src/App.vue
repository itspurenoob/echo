<template>
  <div>
    <!-- Show the navigation only on /app -->
    <nav v-if="$route.path === '/app'">
      <router-link to="/app">Main App</router-link>
      <router-link to="/app/login">Login</router-link>
    </nav>

    <!-- Display the routed content -->
    <router-view />
  </div>
</template>
