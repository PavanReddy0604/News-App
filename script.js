const apiKey='c17a5ff0a72845cebbda04da64f30606'
const blogContainer=document.getElementById("blog-container");


async function fetchRandomNews(){
    try{
        const apiUrl=`https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`
       const response= await fetch(apiUrl)
       const data=await response.json()
       console.log(data)
       return data.articles
    }
    catch(error){
        console.log("Error fetching Random news ",error);
        return []
    }
}

function displayBlogs(articles){
    // blogContainer.innerHTML="";
    articles.forEach(element => {
        const blogCard=document.createElement("div")
        blogCard.classList.add("blog-card")
        console.log("element ::: ",element.title)
        console.log("before creating element")
        const img=document.createElement("img")
        img.src=element.urlToImage
        img.alt=element.title
        const title=document.createElement("h2")
        title.textContent=element.title
        const description=document.createElement("p")
        description.textContent=element.description
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
    });

}

(async ()=> {
    try{
       const articles= await fetchRandomNews()
       displayBlogs(articles);
    }
    catch(error){
        console.log("Error fetching Random news ",error);
    }
})();
