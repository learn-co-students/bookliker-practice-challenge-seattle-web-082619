document.addEventListener("DOMContentLoaded", ()=>{
  main();
});

const URL = "http://localhost:3000/books";

const listBucket = document.getElementById("list");
const liOfBook = document.createElement('li');
const showPannel = document.getElementById("show-panel");

function main(){
  pullBooks()
};

function pullBooks(){
  fetch(URL)
  // get request 
  .then(res => res.json())
  .then(modifiedJson => iterateThroughBooksAndShow(modifiedJson))

};

function iterateThroughBooksAndShow(modifiedJson){
  // console.log(modifiedJson);
  for (let i = 0; i < modifiedJson.length; i++){
    let liOfBook = document.createElement('li');
    liOfBook.textContent = modifiedJson[i]['title'];
    listBucket.append(liOfBook);
    liOfBook.addEventListener('click', (event) =>{ 
        let bookValue = event.target;
        // console.log('event target in my event listener',event.target)
        bookValue.setAttribute('style','color:teal');
        displayBookInfo();


        function displayBookInfo(){
          // get title, url, description
          // add them to the page
          let descriptionDiv = document.createElement('div');
          descriptionDiv.textContent =  modifiedJson[i]["description"];
        
          let individualImageUrl= document.createElement('img');
          individualImageUrl.textContent = modifiedJson[i]["img_url"]
          let img_url = modifiedJson[i]["img_url"];
          let title = modifiedJson[i]["title"];
          individualImageUrl.setAttribute('src', img_url);
          individualImageUrl.setAttribute('alt', title );
        
          let individualBookTitle = document.createElement('div');
          individualBookTitle.textContent = modifiedJson[i]["title"];
        
          showPannel.append(individualBookTitle,individualImageUrl,descriptionDiv); 
        }

    })
    
  }
}


