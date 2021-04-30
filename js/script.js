// Creates a Book object with given parameters
function createBook(title, author, isbn) {
  return { title: title, author: author, isbn: isbn };
}

function clearInputFields() {
  title.value = "";
  author.value = "";
  isbn.value = "";
}

{
  /*         <tr>
            <td>Elon Musk</td>
            <td>Ashley Vance</td>
            <td>23454534534</td>
            </tr> */
}
function addBookToTable(book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");
  row.innerHTML = `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td>
    <a
      href="#"
      class="btn btn-danger btn-sm delete"
      style="background-color: red !important;"
      id="delete"
    >
      X
    </a>
  </td>`;

  list.appendChild(row);
}

// console.log(createBook("Elon Musk", "Ashley Vance", "45324345"));

// Selecting Form Elements
const title = document.getElementById("title");
const author = document.getElementById("author");
const isbn = document.getElementById("isbn");

const form = document.getElementById("book-form");

// ---------------------------------------------------------------

form.addEventListener("submit", function (event) {
  event.preventDefault();
  // console.log("hit");
  if (title.value === "" || author.value === "" || isbn.value === "") {
    alert("Please fill everything!");
  } else {
    const data = createBook(title.value, author.value, isbn.value);
    console.log(data);
    addBookToTable(data);

    // Add back to LS
    addBookLS(data);
  }
  clearInputFields();
});

document
  .getElementById("book-list")
  .addEventListener("click", function (event) {
    if (event.target.id === "delete") {
      console.log("Found!");
      event.target.parentElement.parentElement.remove();
      removeBookLS(
        event.target.parentElement.previousElementSibling.textContent
      );
    }
  });

document.addEventListener("DOMContentLoaded", displayBooks());

// Display Books Function

function displayBooks() {
  const books = getBooksLS();
  for (let i = 0; i < books.length; i++) {
    addBookToTable(books[i]);
  }
}

// LOCAL STORAGE FUNCTIONS

function getBooksLS() {
  let books;
  if (localStorage.getItem("books") === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem("books"));
  }
  return books;
}

function addBookLS(book) {
  const books = getBooksLS();
  // books = [];
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
}

function removeBookLS(isbn) {
  const books = getBooksLS();
  console.log("hit");
  for (let i = 0; i < books.length; i++) {
    if (books[i].isbn === isbn) {
      books.splice(i, 1);
    }
  }
  localStorage.setItem("books", JSON.stringify(books));
}
