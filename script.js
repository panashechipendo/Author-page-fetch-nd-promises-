// Get references to the DOM elements
const authorContainer = document.getElementById('author-container');
const loadMoreBtn = document.getElementById('load-more-btn');

// Initialize indices for pagination
let startingIndex = 0;
let endingIndex = 8;

// Array to hold the author data
let authorDataArr = [];

// Fetch the author data from the API
fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
  .then((res) => res.json()) // Parse the JSON response
  .then((data) => {
    authorDataArr = data; // Store the data in the array
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));  // Display the first set of authors
  })
  .catch((err) => {
    // Handle any errors that occur during fetch
    authorContainer.innerHTML = '<p class="error-msg">There was an error loading the authors</p>';
  });

// Function to fetch and display more authors
const fetchMoreAuthors = () => {
  startingIndex += 8;
  endingIndex += 8;

  // Display the next set of authors
  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
  
  // Disable the load more button if no more data is available
  if (authorDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.style.cursor = "not-allowed";
    loadMoreBtn.textContent = 'No more data to load';
  }
};

// Function to display authors on the page
const displayAuthors = (authors) => {
  authors.forEach(({ author, image, url, bio }, index) => {
    // Add each author's information to the container
    authorContainer.innerHTML += `
    <div id="${index}" class="user-card">
      <h2 class="author-name">${author}</h2>
      <img class="user-img" src="${image}" alt="${author} avatar">
      <div class="purple-divider"></div>
      <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + '...' : bio}</p>
      <a class="author-link" href="${url}" target="_blank">${author} author page</a>
    </div>
  `;
  });
};

// Add event listener to the load more button
loadMoreBtn.addEventListener('click', fetchMoreAuthors);
