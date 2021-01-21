// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn, file) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.file = file;
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
      <td><a target="_blank" href="${book.file}">File</a></td>
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
    document.querySelector("#fileType").value = "NONE";
    document.querySelector("#fileUrl").value = "";
    document.querySelector("#fileUpload").value = "";

    $('#file-url-div').addClass('d-none');
    $('#file-upload-div').addClass('d-none');
  }
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
  const fileType = document.querySelector("#fileType").value;
  const fileUrl = document.querySelector("#fileUrl").value;
  let file = (fileType == 'URL') ? fileUrl : 'FILE-UPLOAD-URL';

  // Validate
  if (title === "" || author === "" || isbn === "" || fileType === "" || file === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn, file);

    // Add Book to UI
    UI.addBookToList(book);

    // Show success message
    UI.showAlert("Book Added", "success");

    // Clear fields
    UI.clearFields();
  }
});

$('#fileType').change(function() {
  let fileType = $(this).val();
  if(fileType == 'URL') {
    $('#file-url-div').removeClass('d-none');
    $('#file-upload-div').addClass('d-none');
  } else if(fileType == 'FILE') {
    $('#file-url-div').addClass('d-none');
    $('#file-upload-div').removeClass('d-none');
  } else {
    $('#file-url-div').addClass('d-none');
    $('#file-upload-div').addClass('d-none');
  }
});
