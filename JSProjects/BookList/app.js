function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI(){

}

UI.prototype.clearfields = function(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

UI.prototype.showAlert = function(message,className){

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


UI.prototype.addBookToList = function(book){
    const row = document.createElement('tr')

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    bookList.appendChild(row);
  
}

const form = document.querySelector('#book-form');
const ui = new UI();
const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')
const isbnInput = document.querySelector('#isbn')
const bookList = document.getElementById('book-list');

form.addEventListener('submit',function(e){
    const book = new Book(titleInput.value,authorInput.value,isbnInput.value);


    if(titleInput.value === ''||authorInput.value ===''||isbnInput.value ===''){
        ui.showAlert('Please fill fields','error');
    }else{
        ui.addBookToList(book);

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

    e.preventDefault();
})