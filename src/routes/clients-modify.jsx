import React from "react";

class ClientsModify extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.clientId,
            firstName: this.props.clientFirstName,
            lastName: this.props.clientLastName,
            birthDate: this.props.clientBirthDate
        }

        this.handleIDChange = this.handleIDChange.bind(this);
        this.formPreventDefault = this.formPreventDefault.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
    }


    renderTitle() {
        if (this.props.clientId != undefined)
            return <h3>Modyfikacja czytelnika</h3>
        else
            return <h3>Dodaj nowego czytelnika</h3>
    }

    renderClientSelect(clients) {
        return clients.map((client, _) => {
            return (
                <option key={client.id} value={client.id}>{client.firstName + ' ' + client.lastName}</option>
            )
        })
    }

    formPreventDefault(e) {
        let client = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthDate: this.state.birthDate
        }
        if (this.props.clientId === undefined) {
            fetch('http://localhost:8080/add/client', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            })
            this.props.addclientToList(client)
        } else {
            fetch('http://localhost:8080/update/client', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            })
            this.props.modifyclientInList(client)
        }
        e.preventDefault();
    }

    handleIDChange(event) {
        this.setState({ id: event.target.value })
    }

    handleTitleChange(event) {
        this.setState({ firstName: event.target.value })
    }

    handleLastNameChange(event) {
        this.setState({ lastName: event.target.value })
    }

    handleBirthDateChange(event) {
        this.setState({ birthDate: event.target.value })
    }

    renderIdInput() {
        if (this.props.clientId === undefined) {
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
                    <div className="form-group">
                        <label htmlFor="birthDateInput">Data urodzenia</label>
                        <input required type="date" pattern="\d{4}-\d{2}-\d{2}" className="form-control" id="birthDateInput" placeholder="Wprowadź datę urodzenia" value={this.state.birthDate} onChange={this.handleBirthDateChange} />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default ClientsModify;