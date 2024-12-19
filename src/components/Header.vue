<template>
    <nav>
        <router-link to="/" class="nav-link" exact-active-class="active">home</router-link>
        <router-link to="/experience" class="nav-link" exact-active-class="active">experience</router-link>
        <router-link to="/projects" class="nav-link" exact-active-class="active">projects</router-link>
        <router-link to="/about-me" class="nav-link" exact-active-class="active">about me</router-link>
        <router-link to="/contact" class="nav-link" exact-active-class="active">contact</router-link>
    </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap');

nav {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    font-family: 'Onest', sans-serif;
}

.nav-link {
    color: white;
    font-size: 1.2rem;
    padding: 0px 6px;
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: white;
    transition: all 0.5s;
}

.nav-link:hover::after {
    width: 100%;
}

.nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: white;
}
</style>
