import React from "react";
import LendsList from "./lends-list.jsx";
import LendsModify from "./lends-modify";

class LendsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            lendData: {lendId: ''},
            error: null,
            isLoaded: false,
            lends: []
          };

          this.deletelend = this.deletelend.bind(this);
          this.setlendToModify = this.setlendToModify.bind(this);
          this.addlendToList = this.addlendToList.bind(this);
          this.modifylendInList = this.modifylendInList.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/get/lends")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        lends: result
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

    addlendToList(lend) {
        this.setState(prevState => ({lends: [...prevState.lends, lend]}))
    }

    deletelend(bookId, clientId) {
        fetch('http://localhost:8080/return/' + bookId + '/' + clientId, { method: 'DELETE' })
            .then(() =>
                this.setState({
                    lends: this.state.lends.filter((lend, _) => lend.id != id)
                })
            );
    }

    renderForm(){
        if(!this.state.show)
            return;
        return (
            <LendsModify lendId={this.state.lendData.id} lendFirstName={this.state.lendData.firstName} lendLastName={this.state.lendData.lastName} addlendToList={this.addlendToList} />
        )
    }

    buttonText(){
        return !this.state.show ? 'Wyporzycz książkę' : 'Anuluj';
    }

    render() {
        return (
            <main style={{ padding: "1rem 0" }}>
                <h2>Autorzy</h2>
                <LendsList error={this.state.error} isLoaded={this.state.isLoaded} lends={this.state.lends} deletelend={this.deletelend} />
                <div className="btn btn-secondary" onClick={() => this.setState({show: !this.state.show, lendData: {lendId: ''}})}>{this.buttonText()}</div>
                {this.renderForm()}
            </main>
        );
    }
}

export default LendsPage;