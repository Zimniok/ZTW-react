import React from "react";

class AuthorsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: props.error,
            isLoaded: props.isLoaded,
            authors: props.authors
        };
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props.authors)
        return ({
            error: props.error,
            isLoaded: props.isLoaded,
            authors: props.authors
        })
    }

    renderTableData(authors) {
        return authors.map((author, index) => {
            return (
                <tr key={author.id}>
                    <td>{author.id}</td>
                    <td>{author.firstName}</td>
                    <td>{author.lastName}</td>
                    <td onClick={() => this.props.modifyauthor(author)}><i className="fa-solid fa-pen-to-square"></i></td>
                    <td onClick={() => this.props.deleteauthor(author.id)}><i className="fa-regular fa-trash-can"></i></td>
                </tr>
            )
        })
    }

    render() {
        const { error, isLoaded, authors } = this.state;
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
                                <th>ID</th>
                                <th>Imię</th>
                                <th>Nazwisko</th>
                                <th>Edytuj</th>
                                <th>Usuń</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData(this.state.authors)}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default AuthorsList;