import BookService from './services/BookService';
import { format } from 'timeago.js';
const _bookService = new BookService();
const noImage  = "https://www.unesale.com/ProductImages/Large/notfound.png";
class UI{

    async renderBooks(){
        const data = await _bookService.getBooks();
        const $booksCardContainer = document.getElementById('books-cards');
        $booksCardContainer.innerHTML = '';

        data.books.forEach(book => {
            book.imagePath = book.imagePath  ? book.imagePath : noImage ;
            let $divCard = document.createElement('div');
            $divCard.className = '';
            $divCard.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${book.imagePath}" class="img-fluid"/>
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title"> ${book.title}</h4>
                                <p class="card-text"> ${book.author}</p>
                                <a class="btn btn-danger delete" _id="${book._id}"> X </a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.created_at)}
                    </div>
                <div>
            `; 
            $booksCardContainer.appendChild($divCard);
        });        
    };

    async addNewBook(book){
        const _book = await _bookService.postBook(book)   
        this.clearBookForm();
        this.renderBooks();
    };

    clearBookForm(){
        document.getElementById('book-form').reset();
    };

    renderMessage(message, colorMessage, time = 2){
       const div = document.createElement('div'); 
       const container = document.getElementById('form-container');
       const bookForm = document.getElementById('book-form');
       
       div.innerText = message;
       div.className = `alert alert-${colorMessage} message`;


       container.insertBefore(div, bookForm);

       setTimeout( () => {
           document.querySelector('.message').remove();
       }, time * 1000);

    };

    async deleteBook(bookId){
        let deletedBook = await _bookService.deleteBook(bookId);
        this.renderMessage(deletedBook.message || "Libro borrau", 'danger', 2);
        this.renderBooks();
    };
}

export default UI;