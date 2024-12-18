<template>
    <div class="home-container">
        <div class="left-container">
            <div class="introduction-container">
                <div class="text">
                    <h1 class="name">Marc Marqués</h1>
                    <p class="description">web developer</p>
                </div>
            </div>
        </div>
        <div class="right-container">
            <img src="../assets/images/template.png" alt="marc-marques-photo" />	
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');

.home-container {
    display: flex;
    height: 90%;
    gap: 2rem;
}

.left-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    font-family: 'Manrope', sans-serif;
    font-weight: 200;
}

.introduction-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2.5rem;
    width: 100%;
}

.text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

h1, p {
    margin: 0;
}

.name {
    font-size: 4rem;
    color: #ffffff;
}

.description {
    font-size: 2.5rem;
    color: #ccc;
}

.right-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
}

img {
    width: 100%;
    height: auto;
    mask-image: linear-gradient(
        black 80%,
        transparent
    );
}
</style>
