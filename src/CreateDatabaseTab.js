import React from "react";
import fetchPost from './fetchPost';

class CreateDatabaseTab extends React.Component {
    constructor(props) {
        super(props);
        this.handleDbCreate = this.handleDbCreate.bind(this);
        this.state = {
            postLoading: false
        };
    }

    handleDbCreate() {
        this.setState({
            postLoading: true
        });
        let classThis = this;
        fetchPost("http://localhost:810/api.php?a=create-db", {})
          .then(function() {
              classThis.props.onNext();
              classThis.setState({
                  postLoading: false
              });
          })
          .catch((error) => {
              alert(error);
          });
    }

    render() {
        return (
            <div>
                <h2>Bază de date</h2>
                <p>Aplicația va crea o bază de date numită <code>genealogiePricop</code>, sub userul root, fără parolă.</p>

                <h2>Tabel</h2>
                <p>Aplicația va crea un tabel numit <code>rudePricop</code> în baza de date menționată mai sus, cu următoarele coloane:</p>
                <table className="table table-hover">
                    <thead><tr>
                        <th>Nume</th>
                        <th>Tip</th>
                        <th>Lungime</th>
                        <th>Altele</th>
                    </tr></thead>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td>INT</td>
                            <td>11</td>
                            <td>PRIMARY AUTOINCREMENT</td>
                        </tr>
                        <tr>
                            <td>nume</td>
                            <td>VARCHAR</td>
                            <td>25</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>prenume</td>
                            <td>VARCHAR</td>
                            <td>25</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>varsta</td>
                            <td>INT</td>
                            <td>11</td>
                            <td>&#x2208; [-1, &#x221e;) &#x2229; &#x2124;</td>
                        </tr>
                        <tr>
                            <td>grad</td>
                            <td>VARCHAR</td>
                            <td>25</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div className="alert alert-info">
                    Infinitul (&#x221e;) se definește ca fiind cea mai mare valoare permisă pe lungimea câmpului. Asemănător pentru -&#x221e;.
                </div>
                <div className="alert alert-danger">
                    <strong>Atenție!</strong> Dacă baza de date există deja, întreg conținutul ei va fi șters!
                </div>
                <button className="btn btn-primary btn-lg" onClick={() => this.handleDbCreate()}>
                    Creează baza de date
                    {this.state.postLoading && (
                        <span className="spinner-border spinner-border-sm ml-2"></span>
                    )}
                </button>
            </div>
        );
    }
}

export default CreateDatabaseTab;