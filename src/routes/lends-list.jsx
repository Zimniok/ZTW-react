import React from "react";

class LendsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: props.error,
            isLoaded: props.isLoaded,
            lends: props.lends
        };
    }

    static getDerivedStateFromProps(props, state) {
        return ({
            error: props.error,
            isLoaded: props.isLoaded,
            lends: props.lends
        })
    }

    renderTableData(lends) {
        return lends.map((lend, index) => {
            return (
                <tr key={lend.book.id+'/'+lend.client.id+'/'+lend.lendDate}>
                    <td>{lend.book.title}</td>
                    <td>{lend.client.firstName + ' ' + lend.client.lastName}</td>
                    <td>{lend.lendDate}</td>
                    <td>{lend.returnDate}</td>
                    <td onClick={() => this.props.deletelend(lend.book.id, lend.client.id)}><i className="fa-solid fa-arrow-rotate-left"></i></td>
                </tr>
            )
        })
    }

    render() {
        const { error, isLoaded, lends } = this.state;
        if (error) {
            return <div>Błąd: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Ładowanie...</div>;

        } else {
            return (
                <div style={{ padding: "1rem 0" }}>
                    <h2>Lista autorów</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Książka</th>
                                <th>Klient</th>
                                <th>Data wyporzyczenia</th>
                                <th>Data zwrotu</th>
                                <th>Oddaj</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData(this.state.lends)}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default LendsList;