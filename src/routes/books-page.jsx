import React from "react";
import { getBooks } from "../data/books";
import BooksList from "./books-list";
import BooksModify from "./books-modify";

class BooksPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            bookData: {authorId: ''},
            error: null,
            isLoaded: false,
            books: []
          };

          this.deleteBook = this.deleteBook.bind(this);
          this.setBookToModify = this.setBookToModify.bind(this);
          this.addBookToList = this.addBookToList.bind(this);
          this.modifyBookInList = this.modifyBookInList.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/get/books_with_authors")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        books: result
                    });
                    console.log(this.state.books)
                },
                // Uwaga: to ważne, żeby obsłużyć błędy tutaj, a
                // nie w bloku catch(), aby nie przetwarzać błędów
                // mających swoje źródło w komponencie.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    addBookToList(book) {
        this.setState(prevState => ({books: [...prevState.books, book]}))
    }

    modifyBookInList(book) {
        let pos = this.state.books.findIndex((b) => b.book.id === book.book.id)
        let tempBooks = [...this.state.books]
        tempBooks[pos] = book
        this.setState({books: tempBooks})
    }

    setBookToModify(book) {
        this.setState({bookData: book, show: true});
    }

    deleteBook(id) {
        fetch('http://localhost:8080/delete/book/' + id, { method: 'DELETE' })
            .then(() =>
                this.setState({
                    books: this.state.books.filter((book, _) => book.book.id != id)
                })
            ).then (() => console.log(this.state.books))
            .then (() => console.log(this.state.books.filter((book, _) => book.book.id == id)));
    }

    renderForm(){
        if(!this.state.show)
            return;
        return (
            <BooksModify bookId={this.state.bookData.id} bookTitle={this.state.bookData.title} bookAuthorId={this.state.bookData.authorId} bookPages={this.state.bookData.pages} bookAvailableCopies={this.state.bookData.availableCopies} addBookToList={this.addBookToList} modifyBookInList={this.modifyBookInList} />
        )
    }

    buttonText(){
        return !this.state.show ? 'Dodaj książkę' : 'Anuluj';
    }

    render() {
        return (
            <main style={{ padding: "1rem 0" }}>
                <h2>Książki</h2>
                <BooksList error={this.state.error} isLoaded={this.state.isLoaded} books={this.state.books} deleteBook={this.deleteBook} modifyBook={this.setBookToModify} />
                <div className="btn btn-secondary" onClick={() => this.setState({show: !this.state.show, bookData: {authorId: ''}})}>{this.buttonText()}</div>
                {this.renderForm()}
            </main>
        );
    }
}

export default BooksPage;