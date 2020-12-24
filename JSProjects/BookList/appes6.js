class Book{
    constructor(author,title,isbn){
        this.author = author;
        this.title = title;
        this.isbn = isbn;

    }
}
class Store{

    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBookToLs(book){
        const books = Store.getBooks();

        books.push(book)

        localStorage.setItem('books',JSON.stringify(books))
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            ui.addBookToList(book)
        });
    }

    static removeBookFromLs(isbn){
        const books = Store.getBooks();

        books.forEach(function(book,index){
            if(isbn === book.isbn){
                books.splice(index,1)
            }
        });

        localStorage.setItem('books',JSON.stringify(books))

    }

}
document.addEventListener("DOMContentLoaded",Store.displayBooks)

const bookList = document.getElementById('book-list');
class UI {

    addBookToList(book){
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
        
       

        bookList.appendChild(row);
    }

    showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert ${className}`
    
        div.appendChild(document.createTextNode(message))
    
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
    
        container.insertBefore(div,form)
    
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    
    }

    clearfields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}



const form = document.querySelector('#book-form');
const ui = new UI();



form.addEventListener('submit',function(e){
    const titleInput = document.querySelector('#title')

    const authorInput = document.querySelector('#author')
    const isbnInput = document.querySelector('#isbn')
    const book = new Book(titleInput.value,authorInput.value,isbnInput.value);


    if(titleInput.value === ''||authorInput.value ===''||isbnInput.value ===''){
        ui.showAlert('Please fill fields','error');
    }else{
        ui.addBookToList(book);


        Store.addBookToLs(book);

        ui.clearfields();

        ui.showAlert('Added successfuly','success');
    }
    

    e.preventDefault();
})

bookList.addEventListener('click',function(e){
    
    if(e.target.className === 'delete'){
        e.target.parentElement.parentElement.remove();
        ui.showAlert('Book deleted','success')
    }
     Store.removeBookFromLs(e.target.parentElement.previousElementSibling.textContent)

    e.preventDefault();
})