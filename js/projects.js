// Project data
const projects = [
    {
        id: 'rashat-milih',
        title: 'Rashat Milih - Iraqi Restaurant',
        description: 'A modern website for an Iraqi restaurant featuring online ordering, menu management, and a shopping cart system.',
        image: 'images/projects/rashat-milih.jpg',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'EmailJS'],
        githubUrl: 'https://github.com/MohammedAlbunde/rashatmilih',
        liveUrl: '#',
        featured: true
    },
    {
        id: 'voting-system',
        title: 'Voting System',
        description: 'A secure and user-friendly voting system with authentication, real-time results, and admin dashboard.',
        image: 'images/projects/voting-system.jpg',
        technologies: ['Python', 'Flask', 'SQLite', 'Bootstrap'],
        githubUrl: 'https://github.com/MohammedAlbunde/voting_system_enhanced',
        liveUrl: '#',
        featured: true
    },
    {
        id: 'iraq-recycling',
        title: 'Iraq Recycling Initiative',
        description: 'A platform promoting recycling awareness and connecting recycling centers with users in Iraq.',
        image: 'images/projects/recycling.jpg',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        githubUrl: 'https://github.com/MohammedAlbunde/IraqRecycling',
        liveUrl: '#',
        featured: true
    }
];

// Function to create project cards
function createProjectCard(project) {
    return `
        <div class="col-lg-4 col-md-6">
            <div class="card project-card h-100">
                <img src="${project.image}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <div class="project-tags mb-3">
                        ${project.technologies.map(tech => `
                            <span class="project-tag">${tech}</span>
                        `).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.githubUrl}" target="_blank" class="btn btn-sm btn-outline-primary">
                            <i class="fab fa-github"></i> View Code
                        </a>
                        ${project.liveUrl !== '#' ? `
                            <a href="${project.liveUrl}" target="_blank" class="btn btn-sm btn-primary">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to load GitHub repositories
async function loadGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/MohammedAlbunde/repos');
        const repos = await response.json();
        
        // Filter and process repositories
        const additionalProjects = repos
            .filter(repo => !projects.find(p => p.githubUrl.includes(repo.name)))
            .map(repo => ({
                id: repo.name,
                title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
                description: repo.description || 'A GitHub repository.',
                image: 'images/projects/default.jpg',
                technologies: [repo.language].filter(Boolean),
                githubUrl: repo.html_url,
                liveUrl: repo.homepage || '#',
                featured: false
            }));

        return [...projects, ...additionalProjects];
    } catch (error) {
        console.error('Error loading GitHub repositories:', error);
        return projects;
    }
}

// Function to initialize the projects section
async function initializeProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    // Show loading state
    projectsContainer.innerHTML = '<div class="text-center"><div class="loading"></div></div>';

    try {
        // Load all projects including GitHub repos
        const allProjects = await loadGitHubRepos();
        
        // Render projects
        projectsContainer.innerHTML = allProjects
            .map(project => createProjectCard(project))
            .join('');
            
    } catch (error) {
        console.error('Error initializing projects:', error);
        projectsContainer.innerHTML = '<div class="alert alert-danger">Error loading projects. Please try again later.</div>';
    }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjects);
