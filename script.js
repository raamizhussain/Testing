// script.js

// Handle project addition
document.getElementById('project-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('project-name').value;
    const description = document.getElementById('project-description').value;
    const link = document.getElementById('project-link').value;

    // Create a new project card
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <a href="${link}" target="_blank">View Project</a>
    `;

    // Add the card to the projects list
    document.getElementById('projects-list').appendChild(projectCard);

    // Clear form fields
    document.getElementById('project-form').reset();
});
