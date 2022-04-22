import React from "react";

class LendsModify extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.lendId,
            firstName: this.props.lendFirstName,
            lastName: this.props.lendLastName
        }

        this.handleIDChange = this.handleIDChange.bind(this);
        this.formPreventDefault = this.formPreventDefault.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }


    renderTitle() {
        if (this.props.lendId != undefined)
            return <h3>Modyfikacja autora</h3>
        else
            return <h3>Dodaj nowego autora</h3>
    }

    renderLendSelect(lends) {
        return lends.map((lend, _) => {
            return (
                <option key={lend.id} value={lend.id}>{lend.firstName + ' ' + lend.lastName}</option>
            )
        })
    }

    formPreventDefault(e) {
        let lend = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }
        if (this.props.lendId === undefined) {
            fetch('http://localhost:8080/add/lend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lend)
            })
            this.props.addlendToList(lend)
        } else {
            fetch('http://localhost:8080/update/lend', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lend)
            })
            this.props.modifylendInList(lend)
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

    renderIdInput() {
        if (this.props.lendId === undefined) {
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

export default LendsModify;