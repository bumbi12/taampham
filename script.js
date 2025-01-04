// script.js
document.getElementById('new-post-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const imageFile = document.getElementById('post-image').files[0];

    const reader = new FileReader();

    reader.onload = function () {
        const imageData = reader.result;

        // Tạo bài viết
        const post = {
            title,
            content,
            image: imageData,
        };

        // Lưu bài viết vào localStorage
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));

        // Hiển thị bài viết
        displayPosts();
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        reader.onload();
    }

    // Reset form
    e.target.reset();
});

// Hiển thị bài viết
function displayPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Image for post ${index + 1}">` : ''}
        `;
        postsList.appendChild(postElement);
    });
}

// Hiển thị bài viết khi tải trang
document.addEventListener('DOMContentLoaded', displayPosts);
