const circle = document.getElementById('circle') as HTMLDivElement;
const startButton = document.getElementById('start-button') as HTMLButtonElement;
const reactionTimeDisplay = document.getElementById('reaction-time') as HTMLDivElement;
const submissionTimeDisplay = document.getElementById('submission-time') as HTMLDivElement;  // Nouvel élément pour afficher la date et l'heure
let startTime: number;
let isGreen: boolean = false;  // Indique si le cercle est prêt pour le clic
let timeoutId: number;

// Fonction pour générer un délai aléatoire (entre 1 et 2 secondes)
function getRandomDelay(): number {
    return Math.random() * 1000 + 1000 + 1000; // Entre 1000 ms (1s) et 2000 ms (2s)
}

// Fonction pour changer la couleur en vert après le délai
function changeToGreen(): void {
    circle.style.backgroundColor = 'green';
    isGreen = true;  // Indique que le cercle est maintenant vert
    startTime = Date.now();  // Stocke le moment où le cercle devient vert
}

// Démarrer le test
startButton.addEventListener('click', () => {
    // Désactiver le bouton pour empêcher une nouvelle tentative tant que le jeu est en cours
    startButton.disabled = true;
    
    // Réinitialiser la couleur, l'état et le message
    circle.style.backgroundColor = 'red';
    reactionTimeDisplay.textContent = '';  // Effacer le temps de réaction précédent
    submissionTimeDisplay.textContent = '';  // Effacer la date et l'heure précédente
    isGreen = false;  // Le cercle n'est pas encore prêt à être cliqué
    clearTimeout(timeoutId);  // Annuler tout délai précédent

    // Délai aléatoire avant que le cercle ne devienne vert
    const delay = getRandomDelay();
    timeoutId = window.setTimeout(changeToGreen, delay);
});

// Lorsque l'utilisateur clique sur le cercle
circle.addEventListener('click', () => {
    if (isGreen) {
        const reactionTimeMs = Date.now() - startTime;  // Calculer le temps de réaction en millisecondes
        const reactionTimeSeconds = (reactionTimeMs / 1000).toFixed(4);  // Convertir en secondes et formater à 4 décimales

        // Ajouter un zéro de tête si le temps est inférieur à 10 secondes
        const formattedTime = reactionTimeSeconds.padStart(7, '0');  // Format 00.0000
        reactionTimeDisplay.textContent = `Temps de réaction : ${formattedTime} s`;  // Afficher le temps formaté

        // Capture de la date et de l'heure actuelles
        const submissionDate = new Date();
        const formattedDate = submissionDate.toLocaleString();  // Format humain lisible (ex: "8/10/2024, 10:45:30 AM")

        // Afficher la date et l'heure de la soumission
        submissionTimeDisplay.textContent = `Soumis à : ${formattedDate}`;
        
        isGreen = false;  // Réinitialiser après le clic

        // Réactiver le bouton pour permettre une nouvelle tentative
        startButton.disabled = false;
    } else {
        reactionTimeDisplay.textContent = `Trop tôt ! Patientez jusqu'à ce que le cercle devienne vert.`;
    }
});
