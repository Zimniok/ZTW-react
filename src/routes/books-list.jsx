import React from "react";

class BooksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          books: []
        };
      }

    componentDidMount() {
        fetch("http://localhost:8080/get/books")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        books: result
                    });
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

    renderTableData(books) {
        return books.map((student, index) => {
            const { id, title, pages, availableCopies, authorId } = student //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>{authorId}</td>
                    <td>{pages}</td>
                    <td>{availableCopies}</td>
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
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tytuł</th>
                                <th>Autor</th>
                                <th>Strony</th>
                                <th>Dostępność</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData(books)}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default BooksList;