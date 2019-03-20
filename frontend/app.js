import './styles/app.css';
import BookService from './services/BookService';

const bookForm = document.getElementById('book-form');

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(bookForm);
    let $image = document.getElementById('image');

    console.log(formData.forEach((entries) => console.log(entries)));    
    
    let _bookService = new BookService();
    let postBoockService = _bookService.postBook(formData);
    console.log('Esto devuelve el postBoockService', postBoockService);

});
