import 'bootswatch/dist/darkly/bootstrap.min.css';
import "./App.css";
import React from "react";
import IntroductionTab from './IntroductionTab';
import CreateDatabaseTab from './CreateDatabaseTab';
import InsertTab from './InsertTab';
import classnames from 'classnames';
import icons from './icons';
import QueriesTab from './QueriesTab';
import PhpMyAdminLogo from './PhpMyAdminLogo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    };
    this.tabs = [
      {
        name: "Introducere",
        description: "Hai sa creem o bază de date!",
        generate: () => <IntroductionTab onNext={() => this.handleNextTab()} />
      }, {
        name: "Creează bază și tabel",
        description: "Acest pas constă în generarea bazei de date, și a tabelului.",
        generate: () => <CreateDatabaseTab onNext={() => this.handleNextTab()} />
      }, {
        name: "Inserare date",
        description: "Acest pas constă în popularea tabelului cu intrări.",
        generate: () => <InsertTab onNext={() => this.handleNextTab()} />
      }, {
        name: "Interogări",
        description: "Acest pas constă în vizualizarea tuturor interogărilor cerute.",
        generate: () => <QueriesTab />
      }
    ];
  }

  handleNextTab() {
    this.changeTab(this.state.selectedTab + 1);
  }

  changeTab(tabIndex) {
    if (tabIndex >= this.tabs.length)
      tabIndex = 0;
    if (tabIndex < 0)
      tabIndex = this.tabs.length - 1;
    this.setState({
      selectedTab: tabIndex
    });
  }

  render() {
    return (
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-3"></div>
          <div className="left-panel">
            <div className="card h-100">
              <div className="card-header">
                <PhpMyAdminLogo />
                <div className="float-right">
                  Proiect Info
                </div>
              </div>
              <div className="card-body">
                Urmați pașii de mai jos pentru a configura o bază de date!
                <ul className="nav nav-pills flex-column mt-3">
                {
                  this.tabs.map((tab, index) => {
                    let classes = classnames(
                      'nav-link',
                      {'active': this.state.selectedTab === index}
                    );
                    return (
                      <li key={index} className="nav-item">
                        {
                          // eslint-disable-next-line
                        } <a href="#" className={classes} onClick={() => this.changeTab(index)}>
                          {tab.name}
                        </a>
                      </li>
                    )
                  })
                }
                </ul>
              </div>
              <div className="card-footer">
                Pricop Laurențiu &copy; 2020
                <div className="float-right">
                  <a href="https://getbootstrap.com"><img src={icons.bootstrap} height="25px" alt="Bootstrap Logo" /></a>
                  <a href="https://reactjs.org"><img src={icons.react} height="25px" alt="React Logo"/></a>
                  <a href="https://php.net"><img src={icons.php} height="25px" alt="PHP Logo" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="right-panel bmaspin-wrapper">
            <div className="bmaspin-container">
              <div className="bmaspin">
                <PhpMyAdminLogo size="40px" />
              </div>
            </div>
          </div>
          <div className="col-6 py-3">
            {(function(tab) {
              return (
                <div>
                  <div className="jumbotron">
                    <h2>{tab.name}</h2>
                    {tab.description}
                  </div>
                  {tab.generate()}
                  <div style={{height: "100px"}}></div>
                </div>
              );
            })(this.tabs[this.state.selectedTab])}
          </div>

        </div>
      </div>
    );
  }
}

export default App;
