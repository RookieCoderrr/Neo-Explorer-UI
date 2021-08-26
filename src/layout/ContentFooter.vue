<template>
  <footer class="footer px-4">

    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{ year }}
          <span
            class="font-weight-bold ml-1"
            target="_blank"
            >Neo Explorer</span
          >
        </div>
      </div>
      <div class="col-lg-6">
        <ul
          class="nav nav-footer justify-content-center justify-content-lg-end"
        >
          <li class="nav-item">
            <a
              href="https://github.com/RookieCoderrr/Neo-Explorer-UI"
              class="nav-link"
              target="_blank"
              >Github</a
            >
          </li>
          <li class="nav-item">
            <a
              href="https://neo.org/converter/index"
              class="nav-link"
              target="_blank"
              >OpCode Converter</a
            >
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
