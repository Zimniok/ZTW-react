import React from "react";
import ClientsList from "./clients-list.jsx";
import ClientsModify from "./clients-modify";

class ClientsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            clientData: {clientId: ''},
            error: null,
            isLoaded: false,
            clients: []
          };

          this.deleteclient = this.deleteclient.bind(this);
          this.setclientToModify = this.setclientToModify.bind(this);
          this.addclientToList = this.addclientToList.bind(this);
          this.modifyclientInList = this.modifyclientInList.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/get/clients")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        clients: result
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

    addclientToList(client) {
        this.setState(prevState => ({clients: [...prevState.clients, client]}))
    }

    modifyclientInList(client) {
        let pos = this.state.clients.findIndex((b) => b.id === client.id)
        let tempclients = [...this.state.clients]
        tempclients[pos] = client
        this.setState({clients: tempclients})
    }

    setclientToModify(client) {
        this.setState({clientData: client, show: true});
    }

    deleteclient(id) {
        fetch('http://localhost:8080/delete/client/' + id, { method: 'DELETE' })
            .then(() =>
                this.setState({
                    clients: this.state.clients.filter((client, _) => client.id != id)
                })
            );
    }

    renderForm(){
        if(!this.state.show)
            return;
        return (
            <ClientsModify clientId={this.state.clientData.id} clientFirstName={this.state.clientData.firstName} clientLastName={this.state.clientData.lastName} clientBirthDate={this.state.clientData.birthDate} addclientToList={this.addclientToList} modifyclientInList={this.modifyclientInList} />
        )
    }

    buttonText(){
        return !this.state.show ? 'Dodaj czytelnika' : 'Anuluj';
    }

    render() {
        return (
            <main style={{ padding: "1rem 0" }}>
                <h2>Czytelnicy</h2>
                <ClientsList error={this.state.error} isLoaded={this.state.isLoaded} clients={this.state.clients} deleteclient={this.deleteclient} modifyclient={this.setclientToModify} />
                <div className="btn btn-secondary" onClick={() => this.setState({show: !this.state.show, clientData: {clientId: ''}})}>{this.buttonText()}</div>
                {this.renderForm()}
            </main>
        );
    }
}

export default ClientsPage;