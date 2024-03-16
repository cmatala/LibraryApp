const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  const libraryContainer = document.getElementById('library-container');
  libraryContainer.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? 'Yes' : 'No'}</p>
      <button class="remove-book-btn" data-index="${index}">Remove</button>
      <button class="toggle-read-btn" data-index="${index}">Toggle Read</button>
    `;
    libraryContainer.appendChild(card);
  });

  const removeButtons = document.querySelectorAll('.remove-book-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      removeBook(index);
      displayBooks();
    });
  });

  const toggleReadButtons = document.querySelectorAll('.toggle-read-btn');
  toggleReadButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      toggleRead(index);
      displayBooks();
    });
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
}

function toggleRead(index) {
  myLibrary[index].read = !myLibrary[index].read;
}

document.getElementById('new-book-btn').addEventListener('click', () => {
  const newBookDialog = document.getElementById('new-book-dialog');
  newBookDialog.showModal();
});

document.getElementById('new-book-form').addEventListener('submit', event => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  addBookToLibrary(title, author, pages, read);
  displayBooks();
  const newBookDialog = document.getElementById('new-book-dialog');
  newBookDialog.close();
});

// Add some books to the library
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 234, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, true);


displayBooks();
