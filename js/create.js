const formHtml_form = document.querySelector("form");
const back_btn = document.querySelector(".back");

const createPost = async (e) => {
    e.preventDefault();
    const post = {
        title: formHtml_form.title.value,
        body: formHtml_form.body.value,
        likes: 0,
    };

    const url = "http://localhost:3000/posts/";
    await fetch(url, { 
        method: "POST", 
        body: JSON.stringify(post),
        headers: {"Content-Type":"application/json"} 
    },);

    window.location.replace("/");
}

formHtml_form.addEventListener("submit", createPost);
back_btn.addEventListener("click", () => window.location.replace("/"));