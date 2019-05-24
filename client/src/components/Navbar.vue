<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar1"
      aria-controls="navbar1"
      aria-expanded="false"
      aria-label="Toogle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="navbar-nav">
      <li>
        <router-link class="navbar-brand" to="/">Asset Management</router-link>
      </li>
    </ul>
    <div class="collapse navbar-collapse justify-content-md-center" id="navbar1">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
      </ul>
      <ul class="navbar-nav mr-sm-2">
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard" v-if="isLoggedIn">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/profile" v-if="isLoggedIn">Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/blog" v-if="isLoggedIn">Blog</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login" v-if="!isLoggedIn">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register" v-if="!isLoggedIn">Register</router-link>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            to="/logout"
            v-if="isLoggedIn"
            @click.prevent="logoutUser"
            style="cursor: pointer;"
          >Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    }
  }
};
</script>

<style>
</style>
