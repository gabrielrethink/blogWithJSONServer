const id = new URLSearchParams(window.location.search).get("id");
const blogTitle_h1 = document.querySelector("h1");
const blogBody_p = document.querySelector("p");


const renderPosts= async() => {
    const url = "http://localhost:3000/posts/" + id;
    const res = await fetch(url).then((response) => response.json());


    blogTitle_h1.innerHTML = res.title;
    blogBody_p.innerHTML = res.body;
};


back_button.addEventListener("click", () => window.location.replace("/"));
window.addEventListener("DOMContentLoaded", renderPosts());