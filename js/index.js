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

          let individualButton = document.createElement('button');
          individualButton.innerText ="Like";

          showPannel.append(individualBookTitle,individualImageUrl,descriptionDiv,individualButton); 

          individualButton.addEventListener('click', (event) =>{

              let usersWhoLikeBook = document.createElement('div');
              usersWhoLikeBook.innerText = event.target;
              console.log(event.target)
              showPannel.append(usersWhoLikeBook)
           
              // trying to get patch to render liked status and return who liked the book in the past. 
              
            // let config = {
            //   method: 'PATCH',
            //   headers:{
            //     'Content-type':'application/json',
            //     'Accept': 'application/json'
            //   },
            //   body: JSON.stringify({
            //   id: modifiedJson[i]['users']['id'],
            //   username: modifiedJson[i]['users']['username']
            //   })
            // }
            // fetch(URL, config)
            // .then(response => response.json())
            // .then(returnedjson =>{
            //   console.log(returnedjson)
            // })

          })
          
        }

    })
    
  }
}


