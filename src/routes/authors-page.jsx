import React from "react";
import AuthorsList from "./authors-list.jsx";
import AuthorsModify from "./authors-modify";

class AuthorsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            authorData: {authorId: ''},
            error: null,
            isLoaded: false,
            authors: []
          };

          this.deleteauthor = this.deleteauthor.bind(this);
          this.setauthorToModify = this.setauthorToModify.bind(this);
          this.addauthorToList = this.addauthorToList.bind(this);
          this.modifyauthorInList = this.modifyauthorInList.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/get/authors")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        authors: result
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

    addauthorToList(author) {
        this.setState(prevState => ({authors: [...prevState.authors, author]}))
    }

    modifyauthorInList(author) {
        let pos = this.state.authors.findIndex((b) => b.id === author.id)
        let tempauthors = [...this.state.authors]
        tempauthors[pos] = author
        this.setState({authors: tempauthors})
    }

    setauthorToModify(author) {
        this.setState({authorData: author, show: true});
    }

    deleteauthor(id) {
        fetch('http://localhost:8080/delete/author/' + id, { method: 'DELETE' })
            .then(() =>
                this.setState({
                    authors: this.state.authors.filter((author, _) => author.id != id)
                })
            );
    }

    renderForm(){
        if(!this.state.show)
            return;
        return (
            <AuthorsModify authorId={this.state.authorData.id} authorFirstName={this.state.authorData.firstName} authorLastName={this.state.authorData.lastName} addauthorToList={this.addauthorToList} modifyauthorInList={this.modifyauthorInList} />
        )
    }

    buttonText(){
        return !this.state.show ? 'Dodaj autora' : 'Anuluj';
    }

    render() {
        return (
            <main style={{ padding: "1rem 0" }}>
                <h2>Autorzy</h2>
                <AuthorsList error={this.state.error} isLoaded={this.state.isLoaded} authors={this.state.authors} deleteauthor={this.deleteauthor} modifyauthor={this.setauthorToModify} />
                <div className="btn btn-secondary" onClick={() => this.setState({show: !this.state.show, authorData: {authorId: ''}})}>{this.buttonText()}</div>
                {this.renderForm()}
            </main>
        );
    }
}

export default AuthorsPage;