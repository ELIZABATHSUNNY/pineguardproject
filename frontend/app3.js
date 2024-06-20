function handleSubmit() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (!file) {
        alert('Please select a file.');
        return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    const loadingDiv = document.getElementById('loading');
    loadingDiv.style.display = 'block';
  
    fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        loadingDiv.style.display = 'none';
        const resultDiv = document.getElementById('result');
        const descriptions = {
            'CrownRot': {
                description: 'Crown rot is a fungal disease that affects the roots and lower stem of the pineapple plant, often causing wilting and yellowing of leaves.',
                treatment: 'Treat with a fungicide specifically formulated for crown rot. Remove and destroy infected plants to prevent spread.'
            },
            'FruitFasciation': {
                description: 'Fruit fasciation is a condition where the fruit of the pineapple plant becomes flattened or elongated, often with abnormal growth patterns.',
                treatment: 'No specific treatment available. Remove and destroy affected fruits.'
            },
            'FruitRot': {
                description: 'Fruit rot is a fungal disease that affects the fruit of the pineapple plant, causing it to rot and become inedible.',
                treatment: 'Remove and destroy infected fruits. Use fungicides to prevent further spread.'
            },
            'MealyBug': {
                description: 'Mealybugs are small, soft-bodied insects that feed on the sap of pineapple plants, causing damage to the leaves and fruit.',
                treatment: 'Use insecticidal soap or neem oil to control mealybug infestations. Remove heavily infested plants.'
            },
            'MultipleCrown': {
                description: 'Multiple crown is a condition where the pineapple plant produces more than one growing point, resulting in multiple crowns and smaller fruit.',
                treatment: 'No specific treatment. Remove extra crowns to promote healthy growth of main crown.'
            },
            'NoDisease': {
                description: 'No disease detected. Your pineapple plant appears to be healthy.',
                treatment: 'No treatment necessary. Continue regular care and maintenance.'
            },
            'RootRot': {
                description: 'Root rot is a fungal disease that affects the roots of the pineapple plant, often causing them to become soft and mushy.',
                treatment: 'Improve soil drainage and avoid overwatering. Use fungicides to treat infected plants.'
            }
        };
        const diseaseInfo = descriptions[data.class] || { description: 'Description not available.', treatment: 'Treatment not available.' };
        resultDiv.innerHTML = `
            <div class="result-box">
                <h2>Prediction Results:</h2>
                <p>Class: ${data.class}</p>
                <p>Description: ${diseaseInfo.description}</p>
                <p>Treatment: ${diseaseInfo.treatment}</p>
                <p>Confidence: ${data.confidence}</p>
            </div>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
  
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Selected Image" style="max-width: 100%; max-height: 200px;">`;
  }
  