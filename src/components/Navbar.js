import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
        this.handleNavBarMenu = this.handleNavBarMenu.bind(this);
    }
    handleNavBarMenu(e){
        this.setState({
            display: !this.state.display
        });
    }
    render(){
        return(
            <div className="navbar navbar-dark bg-dark navbar-expand-lg" id="navbarSupportedContent">
                <Link to="/" className="navbar-brand">Contacts App</Link>
                <button onClick={this.handleNavBarMenu} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div style={{display: this.state.display ? 'block' : 'none'}} className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">My Contacts</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create" className="nav-link">Create Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }            
};