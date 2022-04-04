const id = new URLSearchParams(window.location.search).get("id");
const blogTitle_h1 = document.querySelector("h1");
const blogBody_p = document.getElementById("blogBody");
const back_button = document.getElementById("back");
const blogLikes_small = document.getElementById("likes");
const blogLikes_button = document.getElementById("likesButton");
const delete_btn = document.getElementById("delete");
const blogComments = document.querySelector("blogComments");
const comments_div = document.getElementById("comments");


const renderPosts= async () => {
    const url = "http://localhost:3000/posts/" + id;
    const res = await fetch(url).then((response) => response.json());
    
    // console.log(res);

    blogTitle_h1.innerHTML = res.title;
    blogBody_p.innerHTML = res.body;
    blogLikes_small.innerHTML = res.likes;
};

const likeBlog = async () => {
    const url =" http://localhost:3000/posts/" + id;
    
    const res = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({likes: parseInt(blogLikes_small.innerHTML) + 1}),
        headers: {"Content-Type": "application/json"}
    }).then((response) => (
        blogLikes_small.innerHTML = response.data.likes
        ));
        
        console.log(res);
        blogLikes_small.innerHTML = res.likes;
    };
    
const deleteBlog = async () => {
    const url =" http://localhost:3000/posts/" + id;
    validation = confirm("Você tem certeza que deseja deletar esse Blog?");
    console.log(validation);
    if(validation){
        await fetch(url, {
            method: "DELETE",
        });
        // retorna para a tela principal
        window.location.replace("/");
    };
};

const renderComment = async () => {
    const url =" http://localhost:3000/comments/";
    const res = await fetch(url).then((response) => response.json());
    const postComments = res.filter((item) => item.postId === parseInt(id));

    let template = "";

    postComments.forEach((comments) => template += `
    <div class="blogComments">
            <div class="commentbody">
                <div class="blogHeader">
                    <!-- author, authorAvatar -->
                    <div class="author">
                        <img src="/icons/paper.png">
                        <div>
                            <p>author:</p>
                            <h2>${comments.author}</h2>
                        </div>
                    </div>
                    <!-- likes -->
                    <button class="commentLikes">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="heart"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                    <small>${comments.likes} </small> 
                    <p class="likeslabel"> likes </p>

                </button>
            </div>
            <!-- body -->
            <p id="bodyComment" class="comment">
                ${comments.body}
            </p>
        </div>
        </div>

    `)

    comments_div.innerHTML = template;
}


delete_btn.addEventListener("click", () => deleteBlog());
blogLikes_small.addEventListener("click", () => likeBlog());
back_button.addEventListener("click", () => window.location.replace("/"));
window.addEventListener(
    "DOMContentLoaded",
    () => renderPosts(),
    renderComment()
);