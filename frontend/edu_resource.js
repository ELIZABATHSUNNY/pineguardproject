const tutorials = [
    { title: 'Process of pineapple leaves fiber extraction', url: 'https://youtu.be/0j-vRB5EMGQ?si=4goB9_7TiP-Rh16n' },
    { title: 'Care and propagation of Pineapple plants', url: 'https://youtu.be/_z2xpAQjPrg?si=4hNNzV11RRfRAvqf' },
    { title: 'Pineapple plant care guide', url: 'https://youtu.be/RUdiU6wmBg0?si=hyR-glnGwKBW7frM' }
];

const videos = [
    { title: 'fibre extraction from pineapple', url: 'https://youtu.be/9r-NBdgX0is?si=KtqZWPNRoc8lBQNy' },
    { title: 'Check identify plant health', url: 'https://youtu.be/3oanWrUoiNc?si=Yg1rc6O3XRGXjAt_' },
    { title: 'Extraction pineapple', url: 'https://youtu.be/JJKS3ADfDyM?si=8Nb5hN_ylYb7AIhN' }
];

const articles = [
    { title: 'Application of pineapple leaf fiber', url: 'https://www.researchgate.net/publication/316723759_A_REVIEW_ON_EXTRACTION_CHARACTERIZATION_AND_APPLICATION_OF_PINEAPPLE_LEAF_FIBER_PALF_IN_TEXTILES_AND_OTHER_FIELDS#:~:text=This%20study%20showed%20that%20the,lignin%2C%20and%202.01%25%20pectin' },
    { title: 'Pineapple disease detection', url: 'https://www.sciencedirect.com/science/article/pii/S111001682100418X' },
    { title: 'Various pineapple diseases', url: 'https://kau.in/sites/default/files/documents/diseases_of_pineapple.pdf' }
];

// Function to display articles
function displayArticles() {
    const articlesList = document.getElementById('articles-list');
    articlesList.innerHTML = '';

    articles.forEach(article => {
        const listItem = document.createElement('li');
        listItem.textContent = article.title;
        listItem.addEventListener('click', () => window.open(article.url, '_blank'));
        articlesList.appendChild(listItem);
    });
}

// Function to display videos
function displayVideos() {
    const videosList = document.getElementById('videos-list');
    videosList.innerHTML = '';

    videos.forEach(video => {
        const listItem = document.createElement('li');
        listItem.textContent = video.title;
        listItem.addEventListener('click', () => window.open(video.url, '_blank'));
        videosList.appendChild(listItem);
    });
}

// Function to display tutorials
function displayTutorials() {
    const tutorialsList = document.getElementById('tutorials-list');
    tutorialsList.innerHTML = '';

    tutorials.forEach(tutorial => {
        const listItem = document.createElement('li');
        listItem.textContent = tutorial.title;
        listItem.addEventListener('click', () => window.open(tutorial.url, '_blank'));
        tutorialsList.appendChild(listItem);
    });
}

// Display resources when the page loads
window.onload = function() {
    displayArticles();
    displayVideos();
    displayTutorials();
};