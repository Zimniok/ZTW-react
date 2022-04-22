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
                <tr key={lend.bookId}>
                    <td>{lend.id}</td>
                    <td>{lend.firstName}</td>
                    <td>{lend.lastName}</td>
                    <td onClick={() => this.props.deletelend(lend.id)}><i className="fa-solid fa-arrow-rotate-left"></i></td>
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
                                <th>Autor</th>
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