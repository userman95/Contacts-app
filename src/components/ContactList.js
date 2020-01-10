import React from 'react';
import axios from 'axios';
import Contact from './Contact';

export default class ContactList extends React.Component {
    constructor(props){
        super(props);
        this.deleteContact = this.deleteContact.bind(this);
        this.state = {
            contacts: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:27017/contacts/')
        .then(response => {
            this.setState({
                contacts: response.data
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    deleteContact(id){
        axios.delete('http://localhost:27017/contacts/'+id)
        .then(response => console.log(response.data));
        
        this.setState({
            contacts: this.state.contacts.filter(contact => contact._id !== id)
        })        
    }

    render(){
        return(
            <div className="table-responsive-md">
                <table className="table table-striped table-light table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col" >Name</th>
                            <th scope="col" >Surname</th>
                            <th scope="col" >Email</th>
                            <th scope="col" >Address</th>
                            <th scope="col" >Phone</th>
                            <th scope="col" >Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.contacts.map(contact => {
                            return <Contact contact={contact} deleteContact={this.deleteContact} key={contact._id}/>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }            
};