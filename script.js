"use strict";

let id = 0;
const myLibrary = [];
const bookForm = document.querySelector(".book-form");
const mainTable = document.querySelector("tbody");

function Book(sno, name, author, read) {
  this.sno = sno;
  this.name = name;
  this.author = author;
  this.read = read;
}

Book.prototype.bookStatus = function () {
  return (this.read = this.read === "Read" ? "Not Read" : "Read");
};

function addBookToLibrary(sno, name, author, read) {
  myLibrary.push(new Book(sno, name, author, read));
  displayBook(myLibrary[myLibrary.length - 1], myLibrary.length);
}

function displayBook(book, sno) {
  let tr = document.createElement("tr");
  for (const key of Object.keys(book)) {
    let td = document.createElement("td");
    td.setAttribute(
      "class",
      "tbl-data border p-2 text-center hover:bg-slate-100"
    );
    if (book[key] == "Read" || book[key] == "Not Read") {
      const statusBtn = document.createElement("Button");
      statusBtn.innerText = book[key];
      statusBtn.dataset.id = book.sno;
      statusBtn.setAttribute(
        "class",
        "status-btn active:bg-blue-700 hover:bg-blue-600 rounded bg-blue-500 px-6 py-2 font-bold text-white text-sm"
      );
      td.appendChild(statusBtn);
    } else if (key === "sno") {
      td.innerText = sno;
    } else {
      td.innerText = book[key];
    }
    tr.appendChild(td);
  }
  const td = document.createElement("td");
  td.setAttribute(
    "class",
    "tbl-data border p-2 text-center hover:bg-slate-100"
  );
  const deleteBtn = document.createElement("Button");
  deleteBtn.innerText = "DELETE";
  deleteBtn.dataset.id = book.sno;
  deleteBtn.setAttribute(
    "class",
    "delete-btn active:bg-red-700 hover:bg-red-600 rounded bg-red-500 px-6 py-2 font-bold text-white text-sm"
  );
  td.appendChild(deleteBtn);
  tr.appendChild(td);
  tr.setAttribute("class", "tbl-row border group-hover:bg-slate-50");
  mainTable.appendChild(tr);
}

function toggleStatus(e) {
  const target = e.target.closest(".status-btn");
  myLibrary.forEach((book, index) => {
    if (book.sno == target.dataset.id) {
      target.innerText = myLibrary[index].bookStatus();
    }
  });
}

function deleteEntry(e) {
  const target = e.target.closest(".delete-btn");
  myLibrary.forEach((book, index) => {
    if (book.sno == target.dataset.id) {
      myLibrary.splice(index, 1);
    }
  });
  [...mainTable.children].forEach((child) => {
    mainTable.removeChild(child);
  });
  myLibrary.forEach((book, index) => {
    displayBook(book, index + 1);
  });
}

function title(str = "") {
  return str
    .split(" ")
    .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase())
    .join(" ");
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary(
    id++,
    title(e.target[1].value),
    title(e.target[2].value),
    e.target[3].value
  );
  console.log(myLibrary[0]);
  bookForm.reset();
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".status-btn")) {
    toggleStatus(e);
  }

  if (e.target.closest(".delete-btn")) {
    deleteEntry(e);
  }
});