const blogs_div = document.querySelector(".blogs");

const renderPosts = async () => {
    const url = "http://localhost:3000/posts";
    const res = fetch(url).then((response) => response.json());
    const posts = await res;

    let template = "";

    posts.forEach(element => {template+=
        
        `<div class = "post">
        <h2>${element.title}</h2>
        <p><small>${element.likes} Likes</small></p>
        <p>${element.body.length > 180 ? element.body.slice(0, 180) + "..." : element.body}</p>
        <a href="/details.html?id=${element.id}">Read More</a>
        </div>`
    });
    blogs_div.innerHTML = template;
}
console.log("entrei")



window.addEventListener("DOMContentLoaded", () => renderPosts());