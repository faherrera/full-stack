import './styles/app.css';
import UI from './UI';

const bookForm = document.getElementById('book-form');
const _ui = new UI();

document.addEventListener('DOMContentLoaded', (e) => {
    _ui.renderBooks();
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(bookForm);

    _ui.addNewBook(formData);

});

