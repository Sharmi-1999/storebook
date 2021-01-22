class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">Remove</a></td>
    `;

    list.appendChild(row);
  }
  
  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
  

  static showAlert(message, className) {
    const div = document.createElement("div");
    const main = document.querySelector("main");
    div.className = `message ${className}`;
    div.textContent = message;
    main.appendChild(div);
    // Vanish in 3 seconds

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
=======
    // setTimeout(() => document.querySelector(".success").remove(), 2000);
    div.addEventListener("animationend", function () {
      this.remove();
    });

  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
  }
}
  

// Event: Display Books
document.addEventListener("DOMContentLoaded", function () {
  // load svg transition
  document.querySelector(".svg").classList.add("load");
  // remove start page elements after animation and load header, main
  document
    .querySelector(".load-bar")
    .addEventListener("animationend", function () {
      this.parentElement.classList.add("hide");
      setTimeout(() => {
        this.parentElement.remove();
      }, 400);
      document.querySelector("header").classList.add("open");
      document.querySelector("main").classList.add("open");
    });
  // theme switcher and change logo
  document
    .querySelector(".theme-switcher")
    .addEventListener("click", function () {
      document.querySelector("body").classList.toggle("light");
      const themeImg = document.querySelector(".logo");
      themeImg.setAttribute(
        "src",
        themeImg.getAttribute("src") === "./logo-white.svg"
          ? "./logo-green.svg"
          : "./logo-white.svg"
      );
    });
  // add | invoke modal-container
  document.querySelector(".add-button").addEventListener("click", function () {
    document.querySelector(".modal-container").classList.add("open");
  });
  // close container on clicking close button
  document.querySelector(".close").addEventListener("click", function () {
    document.querySelector(".modal-container").classList.remove("open");
    UI.clearFields();
  });
  // dislay books
  UI.displayBooks();
});

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const isbn = document.querySelector("#isbn").value.trim();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all details", "error");
  } else {
    document.querySelector(".modal-container").classList.remove("open");
    // Instatiate book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Show success message
    UI.showAlert('Book Added', 'success');
=======
    UI.showAlert("Book added to list successfully", "success");


    // Clear fields
    UI.clearFields();
  }
});

function search(){
  let title=document.getElementById('input').value.toUpperCase();
  let table=document.getElementById('book-list');
  let tr=table.getElementsByTagName('tr');
  for(var i=0;i<tr.length;i++){
    let td=tr[i].getElementsByTagName('td')[0];
    if(td){
      let tdvalue=td.textContent || td.innerHTML;
      if(tdvalue.toUpperCase().indexOf(title)>-1){
        tr[i].style.display = '';
      }
      else{
        tr[i].style.display='none';
      }
    }
  }
}
=======

// Event: Remove a Book from
document.querySelector('#book-list').addEventListener('click', (e) => {

  UI.showAlert('Book Removed Successfully', 'success');

  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from book store
  Store.removeBook(e.target.parentElement.previousElementSibling.innerHTML);

});

