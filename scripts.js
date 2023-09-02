// Firebase configuration based on your provided information
var firebaseConfig = {
    apiKey: "AIzaSyBoitfZcjc0hw2bXaDbbbVx-TI5bgnMPqw",
    authDomain: "testwebsite-d9b31.firebaseapp.com",
    projectId: "testwebsite-d9b31",
    storageBucket: "testwebsite-d9b31.appspot.com",
    messagingSenderId: "337215100645",
    appId: "1:337215100645:web:b7d38ae5c563579e33260c",
    measurementId: "G-JCQZEXKZP3"
  };
  
// Initialize Firebase with your configuration
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = firebase.firestore();

// Function to create a new blog post (for create.html)
function createBlogPost(title, content) {
    // Ensure title and content are valid strings
    if (typeof title !== "string" || typeof content !== "string") {
        console.error("Invalid data types for title or content.");
        return; // Exit the function if data types are invalid
    }

    // Add a new document to the "blogposts" collection
    db.collection("blogposts")
        .add({

            title: title,
            content: content,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
            // Document added successfully
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

// Function to display blog posts (for index.html)
function displayBlogPosts() {
    const blogList = document.getElementById("blog-list");

    // Clear existing posts
    blogList.innerHTML = "";

    // Retrieve and display blog posts
    db.collection("blogposts")
        .orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const article = document.createElement("article");
                const titleElement = document.createElement("h2");
                const contentElement = document.createElement("p");

                titleElement.textContent = data.title;
                contentElement.textContent = data.content;

                article.appendChild(titleElement);
                article.appendChild(contentElement);

                // Create a link to the individual blog post
                const link = document.createElement("a");
                link.href = `individual-blog.html?id=${doc.id}`;
                link.textContent = "Read More";

                article.appendChild(link);

                blogList.appendChild(article);
            });
        })
        .catch((error) => {
            console.error("Error getting documents: ", error);
        });
}

// Call the displayBlogPosts function to initially load blog posts (for index.html)
if (window.location.pathname.includes("index.html")) {
    displayBlogPosts();
}

// Handle the form submission (for create.html)
document.addEventListener("DOMContentLoaded", function () {
    // Check if the current page is create.html before handling form submission
    if (window.location.pathname.includes("create.html")) {
        // Handle form submission for create.html
        document.getElementById("blog-form").addEventListener("submit", function (e) {
            e.preventDefault();

            // Get the values from the form
            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;

            // Create a new blog post using the provided values
            createBlogPost(title, content);

            // Clear the form inputs
            document.getElementById("title").value = "";
            document.getElementById("content").value = "";

            // Redirect to the index.html page after creating the post
            setTimeout(() => {
                window.location.href = "index.html"; // Update the URL to match your file structure
            }, 1500); // Adjust the timeout delay as needed
        });
    }

    // Check if the current page is individual-blog.html and then display the individual blog post
    if (window.location.pathname.includes("individual-blog.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get("id");

        if (blogId) {
            // Retrieve the individual blog post
            db.collection("blogposts")
                .doc(blogId)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        const titleElement = document.getElementById("individual-blog-title");
                        const contentElement = document.getElementById("individual-blog-content");

                        titleElement.textContent = data.title;
                        contentElement.textContent = data.content;
                    } else {
                        console.error("No such document!");
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
                });
        }
    }
});
