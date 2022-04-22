import React from "react";

class BooksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: props.error,
            isLoaded: props.isLoaded,
            books: props.books
        };
    }

    static getDerivedStateFromProps(props, state) {
        return ({
            error: props.error,
            isLoaded: props.isLoaded,
            books: props.books
        })
    }

    renderTableData(books) {
        return books.map((student, index) => {
            const { book, author } = student //destructuring
            return (
                <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{author.firstName + ' ' + author.lastName}</td>
                    <td>{book.pages}</td>
                    <td>{book.availableCopies}</td>
                    <td onClick={() => this.props.modifyBook(book)}><i className="fa-solid fa-pen-to-square"></i></td>
                    <td onClick={() => this.props.deleteBook(book.id)}><i className="fa-regular fa-trash-can"></i></td>
                </tr>
            )
        })
    }

    render() {
        const { error, isLoaded, books } = this.state;
        if (error) {
            return <div>Błąd: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Ładowanie...</div>;

        } else {
            return (
                <div style={{ padding: "1rem 0" }}>
                    <h2>Lista książek</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tytuł</th>
                                <th>Autor</th>
                                <th>Strony</th>
                                <th>Dostępność</th>
                                <th>Edytuj</th>
                                <th>Usuń</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData(this.state.books)}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default BooksList;