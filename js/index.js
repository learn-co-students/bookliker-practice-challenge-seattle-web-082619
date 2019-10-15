document.addEventListener("DOMContentLoaded", function() {
  fetchBooks()
});

const BOOKS_URL = "http://localhost:3000/books"
const list = document.getElementById('list');
const showPanel = document.getElementById('show-panel');

function fetchBooks() {
  fetch(BOOKS_URL)
  .then(resp => resp.json())
  .then(json => {
    displayBooks(json)
  })
}

function displayBooks(books) {
  books.forEach( book => displaySingleBook(book) )
}

function displaySingleBook(book) {
  const div = document.createElement('div');

  const h3 = document.createElement('h3');
  h3.textContent = book.title;
  h3.addEventListener('click', () => {
    h3.style.color = '#00ffff';
    displayBookInfo(book)
  });

  div.appendChild(h3);
  list.appendChild(div);
} 

function displayBookInfo(book) {
  const div = document.createElement('div')
  const h2 = document.createElement('h2');
  const img = document.createElement('img')
  const p = document.createElement('p');
  const button = document.createElement('button');

  div.setAttribute('class','show-book')
  div.display = ""

  h2.textContent = book.title;

  img.setAttribute('src', book.img_url);
  img.setAttribute('alt', `Cover of ${book.title}`);

  p.textContent = book.description;

  button.textContent = "♥";

  button.addEventListener('click', () => {
    likeBook(book, button)
  });

  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);
  showPanel.appendChild(div)
}

function likeBook(book, button) {
  if (toggleButton(button)) {
    usersLiked = book.users
    usersLiked.push({"id": 1, "username": "pouros"})
    updateLikesInDatabase(book)
  } else {
    usersLiked = book.users
    usersLiked.pop()
    updateLikesInDatabase(book)
  }
}

function updateLikesInDatabase(book) {
  fetch(BOOKS_URL + "/" + book.id, {
    method: "PATCH",
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify({
      users: usersLiked
    })
  })
}

function toggleButton(button) {
  if (button.textContent === "♥") {
    button.classList.add("liked-book")
    button.textContent = "♥♥♥♥♥"
    return true
  } else {
    button.classList.remove("liked-book")
    button.textContent = "♥"
    return false
  }
}