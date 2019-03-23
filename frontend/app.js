import './styles/app.css';
import UI from './UI';

const $bookForm = document.getElementById('book-form');
const $booksCards = document.getElementById('books-cards');

const _ui = new UI();

document.addEventListener('DOMContentLoaded', (e) => {
    _ui.renderBooks();
});

$bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData($bookForm);
    _ui.renderMessage('NEW BOOK ADDED','success',3);
    _ui.addNewBook(formData);

});

$booksCards.addEventListener('click', (e) => {
    e.preventDefault();
    const isBtnDelete = e.target.classList.contains('delete');
    if (isBtnDelete) {
        const bookId = e.target.getAttribute('_id');
        _ui.deleteBook(bookId);
    }
});

