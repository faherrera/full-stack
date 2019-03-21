import BookService from './services/BookService';
import { format } from 'timeago.js';
import { apiURL } from './utils/requestConfig';
const _bookService = new BookService();
const noImage  = "https://www.unesale.com/ProductImages/Large/notfound.png";
class UI{

    async renderBooks(){
        const data = await _bookService.getBooks();
        const $booksCardContainer = document.getElementById('books-cards');
        $booksCardContainer.innerHTML = '';

        data.books.forEach(book => {
            book.imagePath = book.imagePath  ? apiURL + book.imagePath : noImage ;
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
                                <a href="#" class="btn btn-danger delete" id="${book._id}"> X </a>
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

    renderMessage(){};

    deleteBook(){};
}

export default UI;