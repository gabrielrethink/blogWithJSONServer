// javascript for details.html
const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.details');
const deleteBtn = document.querySelector('.delete');
const backBtn = document.querySelector('.back');
const blog_comments = document.querySelector(".blog-comments");
const likesBtn = document.getElementById('likesBtn');
const likesNumber = document.getElementById('postLikes');

const renderDetails = async () => {
    const res = await fetch('http://localhost:3000/posts/' + id);
    const post = await res.json();
    

    
    const template = `
        <h1>${post.title}</h1>
        <p>${post.body}</p>
        <button id="likesBtn">likes : <small id="postLikes">${post.likes}</small></button>
    `
    container.innerHTML = template;
}

const renderComments = async () => {
    const url = "http://localhost:3000/comments/";
    const res = await fetch(url).then((response) => response.json());
    const comments = res.filter(comment => {
        console.log(comment.postID, id);
        return comment.postID === parseInt(id);
    });
    console.log(comments);
    //const commentsFilter = comments.filter();

    let template = "";
    console.log(comments);

    comments.forEach(comment => {
        template += `<div class="comment">
        <div class="comment-header">
            <div class="author">
                <img src="${comment.image}" />
                <h2>${comment.author}</h2>
            </div>
            <button class="likes">Likes: <small>${comment.likes}</small></button>
        </div>
        <p class="comment-body">${comment.body}</p>
    </div>`;
    });

    blog_comments.innerHTML = template;
}

const likePost = async () => {
    const url = "http://localhost:3000/posts/" + id;
    await fetch(url, {
       method: 'PATCH',
       body: JSON.stringify({
           likes: parseInt(likesNumber.innerHTML) + 1  
       }),
       headers: { "Content-Type": "application/json" },
    })
    console.log(likesNumber.innerHTML);
}

deleteBtn.addEventListener('click', async (e) => {
    const res = await fetch('http://localhost:3000/posts/' + id, {
        method: 'DELETE'
    })
    window.location.replace('/index.html');
})

backBtn.addEventListener('click', async (e) => {
    window.location.replace('/');
})

likesBtn.addEventListener('click', async (e) => 
    likePost()
)

window.addEventListener('DOMContentLoaded', () => renderDetails(), renderComments());