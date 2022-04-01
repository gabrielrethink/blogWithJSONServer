const blogs_div = document.querySelector(".blogs");

const renderPosts = async () => {
    const url = "http://localhost:3000/posts";
    const res = fetch(url).then((response) => response.json());
    const posts = await res;

    let template = "";

    posts.forEach((post) => {
        template += `<div class="post">
                        <h2>${post.title}</h2>
                        <p><small>${post.likes}</small></p>
                        <p>${post.body.length > 180 ? post.body.slice(0, 180) + "..." : post.body}</p>
                        <a href="/details.html?id=${post.id}">Read More</a>
                     </div>`;
    });

    blogs_div.innerHTML = template;
};

window.addEventListener("DOMContentLoaded", () => renderPosts());