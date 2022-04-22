import React from "react";

class AuthorsModify extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.authorId,
            firstName: this.props.authorFirstName,
            lastName: this.props.authorLastName
        }

        this.handleIDChange = this.handleIDChange.bind(this);
        this.formPreventDefault = this.formPreventDefault.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }


    renderTitle() {
        if (this.props.authorId != undefined)
            return <h3>Modyfikacja autora</h3>
        else
            return <h3>Dodaj nowego autora</h3>
    }

    renderAuthorSelect(authors) {
        return authors.map((author, _) => {
            return (
                <option key={author.id} value={author.id}>{author.firstName + ' ' + author.lastName}</option>
            )
        })
    }

    formPreventDefault(e) {
        let author = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }
        if (this.props.authorId === undefined) {
            fetch('http://localhost:8080/add/author', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(author)
            })
            this.props.addauthorToList(author)
        } else {
            fetch('http://localhost:8080/update/author', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(author)
            })
            this.props.modifyauthorInList(author)
        }
        e.preventDefault();
    }

    handleIDChange(event) {
        this.setState({ id: event.target.value })
        console.log(this.state.id)
    }

    handleTitleChange(event) {
        this.setState({ firstName: event.target.value })
    }

    handleLastNameChange(event) {
        this.setState({ lastName: event.target.value })
    }

    renderIdInput() {
        if (this.props.authorId === undefined) {
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
                        <label htmlFor="titleInput">Imię</label>
                        <input required type="text" className="form-control" id="titleInput" placeholder="Wprowadź imię" value={this.state.firstName} onChange={this.handleTitleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastNameInput">Nazwisko</label>
                        <input required type="text" className="form-control" id="lastNameInput" placeholder="Wprowadź nazwisko" value={this.state.lastName} onChange={this.handleLastNameChange} />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default AuthorsModify;