"use strict";
const circle = document.getElementById('circle');
const startButton = document.getElementById('start-button');
const reactionTimeDisplay = document.getElementById('reaction-time');
let startTime;
let timeoutId;
// Fonction pour générer un délai aléatoire (entre 1 et 2 secondes)
function getRandomDelay() {
    return Math.random() * 1000 + 1000; // Entre 1000 ms (1s) et 2000 ms (2s)
}
// Fonction pour changer la couleur en vert après le délai
function changeToGreen() {
    circle.style.backgroundColor = 'green';
    startTime = Date.now(); // Stocker le moment où le cercle devient vert
}
// Démarrer le test
startButton.addEventListener('click', () => {
    // Réinitialiser la couleur et le message
    circle.style.backgroundColor = 'red';
    reactionTimeDisplay.textContent = '';
    // Délai aléatoire avant que le cercle ne devienne vert
    const delay = getRandomDelay();
    timeoutId = window.setTimeout(changeToGreen, delay);
});
// Lorsque l'utilisateur clique sur le cercle
circle.addEventListener('click', () => {
    if (circle.style.backgroundColor === 'green') {
        const reactionTime = Date.now() - startTime; // Calculer le temps de réaction
        reactionTimeDisplay.textContent = `Temps de réaction: ${reactionTime} ms`;
    }
    else {
        reactionTimeDisplay.textContent = `Trop tôt ! Patientez jusqu'à ce que le cercle devienne vert.`;
    }
});
