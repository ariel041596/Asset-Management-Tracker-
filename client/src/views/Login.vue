<template>
  <div>
    <div>
      <!-- <h1>Login Page</h1> -->
      <br>
      <br>
      <br>
      <br>
    </div>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h4>Login</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="loginUser">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                v-model="username"
                id="username"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                v-model="password"
                id="password"
                class="form-control"
              >
            </div>
            <!-- <button class="btn btn-primary">Login</button>&nbsp;&nbsp;&nbsp;&nbsp; -->
            <input type="submit" class="btn btn-primary" value="Login">&nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/register" class="card-link">Need an account?</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      let user = {
        username: this.username,
        password: this.password
      };
      // console.log(user);
      this.login(user)
        .then(res => {
          if (res.data.success) {
            this.$router.push("/profile");
          }
        })
        .catch(err => {
          res.send(err);
        });
    }
  }
};
</script>

<style>
.card {
  width: 60%;
  border-radius: 3px;
}
.btn {
  border-radius: 3px;
}
.form-control {
  border-radius: 3px;
}
</style>
