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
    if(title_input.value == '' && author_input.value == ''){
        title_input.classList.add('warning')
        author_input.classList.add('warning')
        title_input.setAttribute('placeholder', 'Insert title')
        author_input.setAttribute('placeholder', 'Insert author')
        removeWarning()
    }else if(title_input.value == '' ){
        title_input.classList.add('warning')
        title_input.setAttribute('placeholder', 'Insert title')
        removeWarning()
    }else if(author_input.value == ''){
        author_input.classList.add('warning')
        author_input.setAttribute('placeholder', 'Insert title')
        removeWarning()
    }else{
    myLibrary.push(nBook)
    }
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
   
    let itemOp = document.querySelectorAll('.book__status').forEach(el => {
        if(el.innerText == 'Read'){
            el.classList.add('read')
        }else if(el.innerText == 'Not Read'){
            el.classList.add('not-read')
        }
    })

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

function removeWarning(){
    setTimeout(function(){
        title_input.classList.remove('warning')
        author_input.classList.remove('warning')
        title_input.setAttribute('placeholder', '')
        author_input.setAttribute('placeholder', '')
    }, 2000)
}

