// src/main.js
import {createApp , VueElement} from 'vue';
import App from './App.vue'; // import the main vue app
import router from './router/index.js'; // Import the router

// importing bootstrap css library
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const app = createApp(App);

app.use(router); // Add the router to the app
app.mount('#app'); 
