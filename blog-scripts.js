// Import the Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBoitfZcjc0hw2bXaDbbbVx-TI5bgnMPqw",
    authDomain: "testwebsite-d9b31.firebaseapp.com",
    projectId: "testwebsite-d9b31",
    storageBucket: "testwebsite-d9b31.appspot.com",
    messagingSenderId: "337215100645",
    appId: "1:337215100645:web:b7d38ae5c563579e33260c",
    measurementId: "G-JCQZEXKZP3"
  }

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
        const titleElement = document.getElementById("individual-blog-title");
        const contentElement = document.getElementById("individual-blog-content");

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
const postId = urlParams.get("id");

console.log(postId)

if (postId) {
  displayIndividualBlogPost(postId);
}
