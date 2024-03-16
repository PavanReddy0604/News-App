const apiKey='c17a5ff0a72845cebbda04da64f30606';

const blogContainer = document.getElementById('blog-container');
const searchField=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");

async function fetchRandomNews(){
    try{
        const apiUrl=`https://newsapi.org/v2/top-headlines?sources=bbc-news&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`;
       const response= await fetch(apiUrl)
       const data=await response.json()
       return data.articles
    }
    catch(error){
        console.log("Error fetching Random news ",error);
        return []
    }
}

searchButton.addEventListener("click",async () =>{
    const query=searchField.value.trim()
    if(query!=""){
        try{
            const articles=await fetchNewsQuery(query)
            displayBlogs(articles);
        }
        catch(error){
            console.log("error fetching news for the searched type")
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`;
        const response= await fetch(apiUrl)
       const data=await response.json()
       return data.articles

    }
    catch(error){
        console.log("Error fetching news for ",query)
        return [];
    }
}

function displayBlogs(articles){
   blogContainer.innerHTML= ""
    console.log("ARTICLES ",articles)
    articles.forEach(element => {
        const blogCard=document.createElement("div")
        blogCard.classList.add("blog-card")
        const img=document.createElement("img")
        console.log("image ",img)
        img.src=element.urlToImage
        img.alt=element.title
        const title=document.createElement("h2")
        const truncatedTitle=element.title.length>30 ? element.title.slice(0,30)+"..." : element.title
         title.textContent=truncatedTitle
        const description=document.createElement("p")
        const truncatedDescription=element.description.length>140 ? element.description.slice(0,140)+"..." : element.description
        description.textContent=truncatedDescription
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",() =>{
            window.open(element.url,"_blank");
        })
        blogContainer.appendChild(blogCard);
    });
}

(async ()=> {
    try{
       const articles= await fetchRandomNews()
       console.log("in main ",articles)
       displayBlogs(articles);
    }
    catch(error){
        console.log("Error fetching Random news ",error);
    }
})();
