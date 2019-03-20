class BookService {
    constructor(){
        this.URI = "http://localhost:3000/api/books";
    }

    async getBooks(){
        const resp = await fetch(this.URI);
        const books = await resp.json();
        return books;
    }
    
    async postBook(book){
        const resp = await fetch(this.URI,{
            method:'POST',
            body: book,
        });

        const data = await resp.json();
        return data;
    }
    
    async deleteBook(bookId){
        const resp = await fetch(`${this.URI}/${bookId}`,{
            headers: {
                'Content-type':'application/json',

            },
            method:'DELETE',
        });
    
        const data = resp.json();
        return data;

    }
}

export default BookService;