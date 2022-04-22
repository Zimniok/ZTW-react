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
          this.addlendToList = this.addlendToList.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/get/lendData")
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
        let pos = this.state.lends.findIndex((b) => b.book.id != bookId && b.client.id != clientId && b.returnDate != null)
        let templends = [...this.state.lends]
        let lend = {...templends[pos]}

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = yyyy + '-' + mm + '-' + dd;

        lend.returnDate = today
        templends[pos] = lend
        
        fetch('http://localhost:8080/return/' + bookId + '/' + clientId, { method: 'PUT' })
            .then(() =>
                this.setState({lends: templends})
            );
    }

    renderForm(){
        if(!this.state.show)
            return;
        return (
            <LendsModify lendBook={this.state.lendData.book} lendClient={this.state.lendData.client} lendLendDate={this.state.lendData.lendDate} lendReturnDate={this.state.lendData.returnDate} addlendToList={this.addlendToList} />
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