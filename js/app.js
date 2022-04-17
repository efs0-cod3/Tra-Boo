let myLibrary;

let defaultLibrary = [];

let title_input = document.getElementsByClassName('label__title-input')[0];
let author_input = document.getElementsByClassName('label__author-input')[0];
let switchBtn = document.getElementsByClassName('switch-btn')[0];
let books_added = document.getElementsByClassName('books-added')[0];
let addBookBtn = document.getElementsByClassName('form__btn')[0];
let booksAddedContainer = document.getElementsByClassName('books-added-container')

switchBtn.addEventListener('click', () => {
    stvalue()
});


function stvalue() {

    if (switchBtn[value = 'checked']) {
        switchBtn.value = 'read'
    } else {
        switchBtn.value = 'not read'
    }
}

function saveOnLocalStorage() {
    localStorage.setItem('booksToShow', JSON.stringify(myLibrary));
}

function getLocalStorage() {
    if (localStorage.getItem('booksToShow')) {
        myLibrary = JSON.parse(localStorage.getItem('booksToShow'));
    } else {
        myLibrary = defaultLibrary
    }

}
getLocalStorage();



addBookBtn.addEventListener('click', (e) => {
    e.preventDefault()
    stvalue()
    addBook()
    resetValues()
    show()
})

function resetValues() {
    title_input.value = '';
    author_input.value = '';
}


function Book(title, author, read) {

    this.title = title;
    this.author = author;
    this.read = read;
}

function addBook() {
    let nBook = new Book(title_input.value, author_input.value, switchBtn.value)
    myLibrary.push(nBook)
    saveOnLocalStorage()
}


function show() {
    books_added.innerHTML = ''
    myLibrary.forEach((book) => {
        let html = `
        <div class='books-added-container' data='book'>
        <div class="book__title">${book.title}</div>
        <div class="book__author">${book.author}</div>
        <div class="book__status">${book.read}</div>
        <button class="btn__x">X</button>
        </div>
        `;
        books_added.insertAdjacentHTML('beforeEnd', html)
        delB(book)
        updateStatus(book)

    });

}
show();



function delB(item) {
    let xBtn = document.getElementsByClassName('btn__x')[myLibrary.indexOf(item)].addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item), 1)
        console.log(myLibrary);
        saveOnLocalStorage()
        show()
    })

}

function updateStatus(item) {
    let option = document.querySelectorAll('.book__status')[myLibrary.indexOf(item)].addEventListener('click', (e) => {
        if (item.read == 'not read') {
            item.read = 'read'
            e.target.textContent = item.read
        } else {
            item.read = 'not read'
            e.target.textContent = item.read
        }
        saveOnLocalStorage()
        show()

    })
}