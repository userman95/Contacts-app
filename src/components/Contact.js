import React from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal';

export default class Contact extends React.Component { 
    render(){
        const props = this.props;
        return(
            <tr>
                <td>{props.contact.name}</td>
                <td>{props.contact.surname}</td>
                <td>{props.contact.email}</td>
                <td>{props.contact.address}</td>
                <td>            
                    <select className="custom-select custom-select-sm">
                        {props.contact.phones.map((phone,index) => 
                            <option value={phone} key={this.props.contact._id+index}>{phone}</option>
                        )}
                    </select>
                </td>
                <td>
                    <Link className="btn btn-secondary btn-sm" to={"/edit/" + props.contact._id}>Edit</Link>&nbsp;       
                    <DeleteModal deleteContact={props.deleteContact} contact={props.contact} key={props.contact._id +1}/>           
                </td>
            </tr>
        );
    }
}
