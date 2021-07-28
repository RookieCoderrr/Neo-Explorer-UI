<template>
  <div class="main-content bg-default">
    <!-- Navbar -->
    <base-nav
      class="navbar-top navbar-horizontal navbar-dark"
      containerClasses="px-4 container"
      expand
    >
      <!-- <router-link slot="brand" class="navbar-brand" to="/">
                <img src="img/brand/white.png"/>
            </router-link> -->
      <template v-slot="{ closeMenu }">
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img src="img/brand/green.png" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <button
                type="button"
                @click="closeMenu"
                class="navbar-toggler"
                aria-label="Toggle sidenav"
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <!-- Navbar items -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/candidates">
              <i class="ni ni-badge"></i>
              <span class="nav-link-inner--text">Committee</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/blocks">
              <i class="ni ni-ungroup"></i>
              <span class="nav-link-inner--text">Blocks</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/transactions">
              <i class="ni ni-cart"></i>
              <span class="nav-link-inner--text">Transactions</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/tokens">
              <i class="ni ni-money-coins"></i>
              <span class="nav-link-inner--text">Tokens</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/contracts">
              <i class="ni ni-collection"></i>
              <span class="nav-link-inner--text">Contracts</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/account">
              <i class="ni ni-single-02"></i>
              <span class="nav-link-inner--text">Accounts</span>
            </router-link>
          </li>
        </ul>
      </template>
    </base-nav>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8">
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <router-view></router-view>

  </div>
</template>
<script>
export default {
  name: "auth-layout",
  data() {
    return {
      year: new Date().getFullYear(),
      showMenu: false,
    };
  },
};
</script>
<style></style>
