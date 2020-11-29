import React from 'react';

function RudeTableView(props) {
    return (
        <table className="table table-hover mb-0">
            <thead>
                <tr>
                    <th>Nr.crt.</th>
                    <th>Nume și prenume</th>
                    <th>Vârsta</th>
                    <th>Grad</th>
                    {props?.deletable && <th>Altele</th>}
                </tr>
            </thead>
            <tbody>
                {props.data.map(function(value, index) {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{value.nume + ' ' + value.prenume}</td>
                            <td>{value.varsta !== -1 ? value.varsta : "Decedat(ă)"}</td>
                            <td>{value.grad}</td>
                            {props?.deletable &&
                                <td><button className="btn btn-danger btn-sm" onClick={() => props.onDelete(value.id)}>Șterge</button></td>
                            }
                        </tr>
                    );
                })}
                {props.data.length === 0 && (
                    <tr>
                        <td>0</td>
                        <td>Nicio intrare.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default RudeTableView;