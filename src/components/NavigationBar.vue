<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link class="navbar-brand" :to="{name: 'main'}">NOTE APP</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{name: 'main'}"><i class="fas fa-user-graduate"></i>Home <span class="sr-only">(current)</span></router-link>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
          <i class="fas fa-file-alt"></i>CONTENT
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link class="dropdown-item" :to="{name: 'binding'}">CONTENT1</router-link>
          <router-link class="dropdown-item" :to="{name: 'directive'}">CONTENT2</router-link>
          <router-link class="dropdown-item" :to="{name: 'event'}">CONTENT3</router-link>
        </div>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
</template>

<script>
export default {
}
</script>

<style scoped>
.fas {
  padding-right: 5px;
}
.fa-solid {
  padding-right: 5px;
}
.navigation-bar {
  height: 60px;
}
</style>