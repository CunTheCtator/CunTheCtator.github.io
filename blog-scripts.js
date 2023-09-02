// Import the Firebase configuration
const firebaseConfig = require('./firebase-config');

// Initialize Firebase with the imported configuration
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = firebase.firestore();

// Function to display individual blog post
function displayIndividualBlogPost(postId) {
  // Retrieve the specific blog post from Firestore using the postId
  db.collection("blogposts")
    .doc(postId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        // Display the individual blog post data on the page
        const titleElement = document.getElementById("blog-title");
        const contentElement = document.getElementById("blog-content");

        titleElement.textContent = data.title;
        contentElement.textContent = data.content;
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
}

// Call the displayIndividualBlogPost function with the postId from the URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

if (postId) {
  displayIndividualBlogPost(postId);
}
