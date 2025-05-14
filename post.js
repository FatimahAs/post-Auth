const loggedUser = JSON.parse(localStorage.getItem('user'));

document.getElementById('create-post-form').addEventListener('submit', async(e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const imageUrl = document.getElementById('image-url').value;
    const details = document.getElementById('post-details').value;

    if (loggedUser) {
        const newPost = {
            title,
            imageUrl,
            details,
            userId: loggedUser.id
        };

        await fetch('https://682199f9259dad2655afc0f9.mockapi.io/Post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });

        alert('Post created successfully!');
        loadPosts();
        window.location.href = "./postdetails.html"
    } else {
        alert('You must be logged in to create a post');
    }
});


async function loadPosts() {
    const response = await fetch('https://682199f9259dad2655afc0f9.mockapi.io/Post');
    const posts = await response.json();

    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.filter(post => post.userId === loggedUser.id).forEach(post => {
        const postCard = `
        <div class="blog-card-horizontal">
            <div class="blog-image-horizontal">
                <img src="${post.imageUrl}" alt="Blog image" />
            </div>
            <div class="blog-content-horizontal">
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-description">${post.details}</p>
                <div class="blog-actions">
                    <button class="btn details-btn"><a href="./postdetails.html?id=${post.id}">Details</a></button>
                    <button class="btn comments-btn">💬 12 Comments</button>
                    <button class="btn edit-btn" onclick="editPost(${post.id})">Edit</button>
                    <button class="btn delete-btn" onclick="deletePost(${post.id})">Delete</button>
                </div>
            </div>
        </div>`;
        postsContainer.innerHTML += postCard;
    });
}


async function editPost(postId) {
    const post = await fetch(`https://682199f9259dad2655afc0f9.mockapi.io/Post/${postId}`).then(res => res.json());
    if (post.userId === loggedUser.id) {
        document.getElementById('title').value = post.title;
        document.getElementById('image-url').value = post.imageUrl;
        document.getElementById('post-details').value = post.details;


        document.getElementById('create-post-form').addEventListener('submit', async function updatePost(e) {
            e.preventDefault();

            const updatedPost = {
                title: document.getElementById('title').value,
                imageUrl: document.getElementById('image-url').value,
                details: document.getElementById('post-details').value
            };

            await fetch(`https://682199f9259dad2655afc0f9.mockapi.io/Post/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPost)
            });

            alert('Post updated successfully!');
            loadPosts();
        }, { once: true });
    } else {
        alert('You cannot edit this post.');
    }
}


async function deletePost(postId) {
    const post = await fetch(`https://682199f9259dad2655afc0f9.mockapi.io/Post/${postId}`).then(res => res.json());
    if (post.userId === loggedUser.id) {
        await fetch(`https://682199f9259dad2655afc0f9.mockapi.io/Post/${postId}`, {
            method: 'DELETE'
        });
        alert('Post deleted successfully!');
        loadPosts();
    } else {
        alert('You cannot delete this post.');
    }
}


loadPosts();