// Book Class: Represents a Book
class Book {
  constructor(Book_Code,title, author, isbn) {
    this.Book_Code=Book_Code; //added bookcode to property of the book class
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
    //setting datas to the localstorage
    let bookArr=[book.title,book.author,book.isbn]
    localStorage.setItem(book.Book_Code,JSON.stringify(bookArr));
    display_table();
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static clearFields() {
    document.querySelector("#Book_Code").value = "";
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const Book_Code=document.querySelector("#Book_Code").value;
  const title =document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validate
  if (Book_Code === "" || title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate book
    const book = new Book(Book_Code,title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Show success message
    UI.showAlert("Book Added", "success");

    // Clear fields
    UI.clearFields();
  }
});





//a function to display table
function display_table(){
  table_data=document.getElementById("book-list");
  table_data.innerHTML=`<tr></tr>`
  for (let i = 0; i < localStorage.length; i++) {
    
    table_data.innerHTML += `<tr>
    <td>${localStorage.key(i)}</td>
    <td>${JSON.parse(localStorage.getItem(localStorage.key(i)))[0]}</td>
    <td>${JSON.parse(localStorage.getItem(localStorage.key(i)))[1]}</td>
    <td>${JSON.parse(localStorage.getItem(localStorage.key(i)))[2]}</td> </tr>`;
  


  }
}
display_table();




