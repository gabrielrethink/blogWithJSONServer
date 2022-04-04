const blogs_div = document.querySelector(".blogs");

// As palavras async e await são uma sintaxe de programação assíncrona
// Elas trabalham com promises, mas as escondem para que a leitura seja mais fluída e simples de entender
// A palavra async foi adicionada para podermos usar o await
// o async significa que o retorno da função será "por baixo dos panos", uma Promise
// await recebe uma promise e: ou lança uma exceção em caso de erro ou transforma em um valor de retorno
const renderPosts = async () => {
    const url = "http://localhost:3000/posts";
    const res = fetch(url).then((response) => response.json());
    const posts = await res;

    let template = "";

    posts.forEach( post => {
        template += `
        <div class="post">
            <h2> ${post.title} </h2>
            <p><small>${post.likes} Likes</small></p>
            <p>${post.body.length > 180 ? post.body.slice(0, 180) + "..." : post.body}</p>
            <a href="/details.html?id=${post.id}">Read More</a>
        </div>`
    });

    blogs_div.innerHTML = template;
}


// DOMContentLoaded é acionado quando todo o HTML foi completamente carregado
window.addEventListener("DOMContentLoaded", () => renderPosts());