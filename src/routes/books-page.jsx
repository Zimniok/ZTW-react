import React from "react";
import { getBooks } from "../data/books";
import BooksList from "./books-list";

class BooksPage extends React.Component {

    render() {
        return (
            <main style={{ padding: "1rem 0" }}>
                <h2>Książki</h2>
                <BooksList />
            </main>
        );
    }
}

export default BooksPage;