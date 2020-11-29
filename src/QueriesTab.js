import React from 'react';
import RudeTableView from './RudeTableView';
import fetchPost from './fetchPost';
import classnames from 'classnames';

class QueriesTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            queries: [],
        };
    }

    componentDidMount() {
        let classThis = this;
        fetchPost("http://localhost:810/api.php?a=retrieve")
        .then(function(result) {
            classThis.setState({
                queries: result.queries,
                loading: false
            });
        });
    }

    render() {
        return (
            <div>
            {this.state.loading ? <span className="spinner-border"></span> :
                this.state.queries.map(function(query, index) {
                    return (
                        <div key={index} className="card mb-2">
                            <div className="card-header">
                                <span className="badge badge-primary mr-2">DESCRIERE</span>
                                {query.description}<br />
                                <span className="badge badge-primary mr-2">CONDIȚIE</span>
                                <code className="bg-dark">{query.condition}</code>
                            </div>
                            <div className="card-body">
                                <RudeTableView data={query.result} />
                            </div>
                        </div>
                    );
                })
            }
            </div>
        );
    }
}

export default QueriesTab;