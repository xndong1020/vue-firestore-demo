<template>
  <nav class="indigo darken-2">
    <div class="container nav-wrapper indigo darken-2">
      <router-link to="/">
        <span class="brand-logo">Ninja Smoothies</span>
      </router-link>
      <a href class="btn-floating btn-large halfway-fab pink">
        <router-link to="/add-smoothie">
          <i class="material-icons">add</i>
        </router-link>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="scss" scoped>
// add attributes to nav-wrapper class from material css
.nav-wrapper {
  text-align: left;
  padding-left: 20px;
}
</style>

