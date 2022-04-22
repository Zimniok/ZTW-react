import React from "react";

class ClientsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: props.error,
            isLoaded: props.isLoaded,
            clients: props.clients
        };
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props.clients)
        return ({
            error: props.error,
            isLoaded: props.isLoaded,
            clients: props.clients
        })
    }

    renderTableData(clients) {
        return clients.map((client, index) => {
            return (
                <tr key={client.id}>
                    <td>{client.id}</td>
                    <td>{client.firstName}</td>
                    <td>{client.lastName}</td>
                    <td>{client.birthDate}</td>
                    <td onClick={() => this.props.modifyclient(client)}><i className="fa-solid fa-pen-to-square"></i></td>
                    <td onClick={() => this.props.deleteclient(client.id)}><i className="fa-regular fa-trash-can"></i></td>
                </tr>
            )
        })
    }

    render() {
        const { error, isLoaded, clients } = this.state;
        if (error) {
            return <div>Błąd: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Ładowanie...</div>;

        } else {
            return (
                <div style={{ padding: "1rem 0" }}>
                    <h2>Lista czytelników</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Imię</th>
                                <th>Nazwisko</th>
                                <th>Data urodzenia</th>
                                <th>Edytuj</th>
                                <th>Usuń</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData(this.state.clients)}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default ClientsList;