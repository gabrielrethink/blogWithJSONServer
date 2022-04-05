const formHtml_form = document.querySelector("form")

const createPost = async (e) =>{
    e.preventDefault();
    const post = {
        title: commentForm_form.title.value,
        body: commentForm_form.body.value, 
        likes: 0,
    };
    const url = "http://localhost:3000/posts";
    await fetch(url, {
        method:"POST",
        body: JSON.stringify(post),
        headers: {"Content-Type": "application/json"},
        });

    window.location.replace("/");
};

commentForm_form.addEventListener("submit", createPost);