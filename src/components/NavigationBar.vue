<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <router-link class="navbar-brand" :to="{name: 'main'}">Notion</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'main'}"><i class="fa-solid fa-file-lines"></i>Note Lists</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-user-graduate"></i>Study
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <router-link class="dropdown-item" :to="{name: 'binding'}">Study1</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" :to="{name: 'directive'}">Study2</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" :to="{name: 'event'}">Study3</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
}
</script>

<style scoped>
.fa-solid {
  padding-right: 5px;
}
.navigation-bar {
  height: 60px;
}
</style>