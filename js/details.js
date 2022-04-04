const id = new URLSearchParams(window.location.search).get("id");
const blogTitle_h1 = document.querySelector("h1");
const blogBody_p = document.querySelector("p");
const back_button = document.getElementById("back");
const delete_button = document.getElementById("delete");


const renderPosts= async() => {
    const url = "http://localhost:3000/posts/" + id;
    const res = await fetch(url).then((response) => response.json());


    blogTitle_h1.innerHTML = res.title;
    blogBody_p.innerHTML = res.body;
};

const deletePost= () => {
    const url = "http://localhost:3000/posts/" + id;
    const validation = confirm("Deseja deletar o blog?");
    
    if (validation) {
        fetch (url, {method: "DELETE"});
        window.location.replace("/");
    }

} 

back_button.addEventListener("click", () => window.location.replace("/"));
delete_button.addEventListener("click", () => deletePost());
window.addEventListener("DOMContentLoaded", renderPosts());