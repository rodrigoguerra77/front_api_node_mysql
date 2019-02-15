<template>
  <div id="app">

    <!--Header nav-->
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand>
          <router-link to="/">
            <img src="./assets/logo.png" class="logo-icon">
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item><router-link to="/courses">Courses</router-link></b-nav-item>
            <b-nav-item><router-link to="/students">Students</router-link></b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content"><em>User</em></template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <!-- Center page -->
    <b-container>
      <main>
        <router-view></router-view>
      </main>
    </b-container>

    <!-- Footer -->

  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {

      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  h1, h2 {
    font-weight: normal;
  }

  a {
    color: #42b983;
  }

  .logo-icon {
    width: 40px;
  }
</style>
