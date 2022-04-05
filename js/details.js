// javascript for details.html
const idPost = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.details');
const deleteBtn = document.querySelector('.delete');
const backBtn = document.querySelector('.back');
const blog_comments = document.querySelector(".blog-comments");
const likesBtn = document.getElementById('likesBtn');
const likesNumber = document.getElementById('postLikes');
const postTitle = document.getElementById('postTitle');
const postBody = document.getElementById('postBody');
const postLikesBtn = document.getElementById('postLikesBtn');

const commentLikes_Btn = document.querySelectorAll(".commentLikes");

const renderDetails = async () => {
    const res = await fetch('http://localhost:3000/posts/' + idPost);
    const post = await res.json();
    postTitle.innerHTML = post.title;
    postBody.innerHTML = post.body;
    likesNumber.innerHTML = post.likes;
}

const renderComments = async () => {
    const url = "http://localhost:3000/comments/";
    const res = await fetch(url).then((response) => response.json());
    const comments = res.filter(comment => {
        console.log(comment.postID, idPost);
        return comment.postID === parseInt(idPost);
    });
    console.log(comments);

    let template = "";
    console.log(comments);

    comments.forEach(comment => {
        template += `<div class="comment">
        <div class="comment-header">
            <div class="author">
                <img src="${comment.image}" />
                <h2>${comment.author}</h2>
            </div>
            <button class="commentLikes" onClick="onClickLikeButton(${comment.id})">Likes: <small id="comment${comment.id}">${comment.likes}</small></button>
        </div>
        <p class="comment-body">${comment.body}</p>
    </div>
    `
    });

    blog_comments.innerHTML = template;
}

const onClickLikeButton = (idComment) => {
    const like_btn = document.getElementById(`comment${idComment}`);
    like_btn.innerHTML = parseInt(like_btn.innerHTML) + 1;
};

const likePost = async () => {
    const url = "http://localhost:3000/posts/" + idPost;
    await fetch(url, {
       method: 'PATCH',
       body: JSON.stringify({
           likes: parseInt(likesNumber.innerHTML) + 1  
       }),
       headers: { "Content-Type": "application/json" },
    })
    console.log(likesNumber.innerHTML);
}


console.log(commentLikes_Btn);

deleteBtn.addEventListener('click', async (e) => {
    const res = await fetch('http://localhost:3000/posts/' + idPost, {
        method: 'DELETE'
    })
    window.location.replace('/index.html');
})


backBtn.addEventListener('click', async (e) => {
    window.location.replace('/');
})

postLikesBtn.addEventListener('click', async (e) => 
    likePost()
)

window.addEventListener('DOMContentLoaded', () => renderDetails(), renderComments());