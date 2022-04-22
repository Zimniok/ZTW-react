import React from "react";

class BooksModify extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.bookId,
            title: this.props.bookTitle,
            authorId: this.props.bookAuthorId,
            pages: this.props.bookPages,
            availableCopies: this.props.bookAvailableCopies,
            authors: []
        }

        this.handleIDChange = this.handleIDChange.bind(this);
        this.formPreventDefault = this.formPreventDefault.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handlePagesChange = this.handlePagesChange.bind(this);
        this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
    }


    componentDidMount() {

        fetch("http://localhost:8080/get/authors")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        authors: result
                    });
                },
                // Uwaga: to ważne, żeby obsłużyć błędy tutaj, a
                // nie w bloku catch(), aby nie przetwarzać błędów
                // mających swoje źródło w komponencie.
                (error) => {
                    console.log(error);
                }
            )
    }

    renderTitle() {
        if (this.props.bookId != undefined)
            return <h3>Modyfikacja książki</h3>
        else
            return <h3>Dodaj nową książkę</h3>
    }

    renderAuthorSelect(authors) {
        return authors.map((author, _) => {
            return (
                <option key={author.id} value={author.id}>{author.firstName + ' ' + author.lastName}</option>
            )
        })
    }

    formPreventDefault(e) {
        let author = this.state.authors.filter((author, _) => author.id == this.state.authorId)
        author = author[0]
        let book = {
            id: this.state.id,
            title: this.state.title,
            pages: this.state.pages,
            availableCopies: this.state.availableCopies,
            authorId: this.state.authorId
        }
        if (this.props.bookId === undefined) {
            fetch('http://localhost:8080/add/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            })
            let b = {
                book: book,
                author: author
            }
            this.props.addBookToList(b)
        } else {
            fetch('http://localhost:8080/update/book', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            })
            let b = {
                book: book,
                author: author
            }
            this.props.modifyBookInList(b)
        }
        e.preventDefault();
    }

    handleIDChange(event) {
        this.setState({ id: event.target.value })
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value })
    }

    handleAuthorChange(event) {
        this.setState({ authorId: event.target.value })
    }

    handlePagesChange(event) {
        this.setState({ pages: event.target.value })
    }

    handleAvailabilityChange(event) {
        this.setState({ availableCopies: event.target.value })
    }

    renderIdInput() {
        if (this.props.bookId === undefined) {
            return (
                <input required type="number" className="form-control" id="idInput" placeholder="Wprowadź ID" value={this.state.id} onChange={this.handleIDChange} />
            )
        } else {
            return (
                <input readOnly required type="number" className="form-control" id="idInput" placeholder="Wprowadź ID" value={this.state.id} onChange={this.handleIDChange} />
            )
        }
    }

    render() {
        return (
            <div style={{ padding: "1rem 0" }}>
                {this.renderTitle()}
                <form onSubmit={this.formPreventDefault}>
                    <div className="form-group">
                        <label htmlFor="idInput">ID</label>
                        {this.renderIdInput()}
                    </div>
                    <div className="form-group">
                        <label htmlFor="titleInput">Tytuł</label>
                        <input required type="text" className="form-control" id="titleInput" placeholder="Wprowadź tytuł" value={this.state.title} onChange={this.handleTitleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="authorInput">Autor</label>
                        <select required className="form-control" id="authorInput" value={this.state.authorId} onChange={this.handleAuthorChange}>
                            <option value="" disabled>Wybierz autora</option>
                            {this.renderAuthorSelect(this.state.authors)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pagesInput">Liczba stron</label>
                        <input required type="number" className="form-control" id="pagesInput" placeholder="Wprowadź liczbę stron" value={this.state.pages} onChange={this.handlePagesChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="availabilityInput">Liczba dostępnych kopii</label>
                        <input required type="number" className="form-control" id="availabilityInput" placeholder="Wprowadź liczbę dostępnych kopii" value={this.state.availableCopies} onChange={this.handleAvailabilityChange} />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default BooksModify;