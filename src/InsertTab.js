import React from 'react';
import RudeTableView from './RudeTableView';
import fetchPost from './fetchPost';
import classnames from 'classnames';

class InsertForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            age: 0,
            level: "",
            died: false,
            loading: false,
        };
        this.predefinedLevels = [
            "mama",
            "tata",
            "bunic",
            "bunica",
            "frate",
            "sora",
            "verisor",
            "verisoara",
            "unchi",
            "matusa"
        ];
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInsertPredefined = this.handleInsertPredefined.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        let classThis = this;
        this.setState({
            loading: "insert"
        });
        fetchPost("http://localhost:810/api.php?a=insert", {
            nume: this.state.name,
            prenume: this.state.surname,
            varsta: this.state.dead ? -1 : this.state.age,
            grad: this.state.level
        }).then(function() {
            classThis.props?.onInsert();
            classThis.setState({
                loading: false
            });
        });
    }

    handleInsertPredefined() {
        let classThis = this;
        this.setState({
            loading: "insert-predefined"
        });
        fetchPost("http://localhost:810/api.php?a=insert-predefined")
        .then(function() {
            classThis.props?.onInsert();
            classThis.setState({
                loading: false
            });
        });
    }

    render() {
        return (
            <div className="mb-2">
                <div className="row mb-2">
                    <div className="col">
                        <label>Nume:</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="col">
                        <label>Prenume:</label>
                        <input
                            type="text"
                            name="surname"
                            className="form-control"
                            value={this.state.surname}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-6">
                        <label>Vârsta:</label>
                        <div className="form-check float-right">
                            <input type="checkbox" className="form-check-input" name="dead" id="dead-check" onChange={this.handleChange} />
                            <label className="form-check-label" for="dead-check">
                                Decedat
                            </label>
                        </div>
                        <input
                            type="number"
                            name="age"
                            className="form-control"
                            min="0"
                            value={this.state.dead ? -1 : this.state.age}
                            onChange={this.handleChange}
                            disabled={this.state.dead}
                        />
                    </div>
                    <div className="col-6">
                        <label>Gradul:</label>
                        <input
                            type="text"
                            name="level"
                            className="form-control"
                            value={this.state.level}
                            onChange={this.handleChange}
                            list="levels"
                        />
                        <datalist id="levels">
                            {this.predefinedLevels.map((level, index) => (
                                <option key={index}>{level}</option>
                            ))}
                        </datalist>
                    </div>
                </div>
                <button className="btn btn-primary mr-2" onClick={this.handleSubmit}>
                    Inserează
                    {this.state.loading === "insert" && <span className="spinner-border spinner-border-sm ml-2"></span>}
                </button>
                <button className="btn btn-secondary" onClick={this.handleInsertPredefined}>
                    Inserează predefinite
                    {this.state.loading === "insert-predefined" && <span className="spinner-border spinner-border-sm ml-2"></span>}
                </button>
            </div>
        )
    }
}

class InsertTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableLoading: true,
            data: []
        };
        this.updateData = this.updateData.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

    componentDidMount() {
        this.updateData();
    }

    updateData() {
        let classThis = this;
        this.setState({
            tableLoading: true
        });
        fetchPost("http://localhost:810/api.php?a=retrieve")
        .then(function(result) {
            classThis.setState({
                data: result.queries[0].result,
                tableLoading: false
            });
        });
    }

    deleteRow(id) {
        console.log("Id is " + id);
        let classThis = this;
        this.setState({
            tableLoading: true
        });
        fetchPost("http://localhost:810/api.php?a=delete", {id})
        .then(function() {
            classThis.updateData()
        });
    }

    render() {
        let tableWrap = classnames(
            "grayable",
            {"grayed": this.state.tableLoading}
        );
        return (
            <div>
                <h2>Inserare</h2>
                <InsertForm onInsert={this.updateData} />
                <h2>Vizualizare</h2>
                <button className="btn btn-primary" onClick={this.updateData}>Actualizează</button>
                <div className={tableWrap}>
                    <RudeTableView data={this.state.data} deletable={true} onDelete={this.deleteRow}/>
                </div>
                <button className="btn btn-lg btn-primary" onClick={this.props.onNext}>
                    Următorul pas
                </button>
            </div>
        );
    }
}

export default InsertTab;