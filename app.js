// Book Class: Represents a Book
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
    `;

    list.appendChild(row);
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
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Event: Validate the ISBN number 
function ValidISBN(isbn){
  console.log(isbn)
  if (isbn.length == 10){
    if(isbn[9]=='x' || isbn[9]=='X'){
      sum = 10*isbn[0] + 9*isbn[1] + 8*isbn[2] + 7*isbn[3] +
           6*isbn[4] + 5*isbn[5] + 4*isbn[6] + 3*isbn[7] +
           2*isbn[8] + 1*10;
    }
    else{
      sum = 10*isbn[0] + 9*isbn[1] + 8*isbn[2] + 7*isbn[3] +
             6*isbn[4] + 5*isbn[5] + 4*isbn[6] + 3*isbn[7] +
             2*isbn[8] + 1*isbn[9];
    }
    if (sum%11 != 0){
    alert("Invalid ISBN-10 Number! Your checkdigit doesn't match. Please enter the ISBN Number correctly");
    }
  }
  else if (isbn.length == 13){
    sum = 1*isbn[0] + 3*isbn[1] + 1*isbn[2] + 3*isbn[3] +
          1*isbn[4] + 3*isbn[5] + 1*isbn[6] + 3*isbn[7] +
          1*isbn[8] + 3*isbn[9] + 1*isbn[10] + 3*isbn[11];
    mod = sum%10;
    if (mod == 0){
      checknum = 0;
    }
    else{
      checknum = 10 - mod;
    }
    if (checknum != isbn[12]){
    alert("Invalid ISBN-13 Number! Your checkdigit doesn't match. Please enter the ISBN Number correctly");
    }
  }
  else{
    alert("Invalid ISBN Number! It should be of either valid 10-digit or valid 13-digti number. Please enter the ISBN Number correctly");
  }
}

function pressed() {
  let num = document.getElementById("isbn").value;
  ValidISBN(num);
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Show success message
    UI.showAlert("Book Added", "success");

    // Clear fields
    UI.clearFields();
  }
})
