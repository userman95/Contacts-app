import React from 'react';
import axios from 'axios';

const validatePhone = (phone) => {
     // eslint-disable-next-line
    let regex = /^[\+]?[(]?[3][0][)]?[\s\.]?[0-9]{10}$|^[0-9]{10}$/;    
    if(phone.length === 0){
        console.log(phone.length)
        return true
    }
    else
        return regex.test(phone);
}

const validateEmail = (email) => {
     // eslint-disable-next-line
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email)
};


export default class CreateContact extends React.Component {
    constructor(props){
        super(props)
        this.handleNamechange = this.handleNamechange.bind(this);
        this.handleSurnamechange = this.handleSurnamechange.bind(this);
        this.handleEmailchange = this.handleEmailchange.bind(this);
        this.handleAddresschange = this.handleAddresschange.bind(this);
        this.handlePhonechange = this.handlePhonechange.bind(this);
        this.addPhone = this.addPhone.bind(this);
        this.deletePhone = this.deletePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            surname: '',
            email: '',
            address: '',
            phones: [],
            currentPhone: '',
            errors: {
                name: '',
                surname: '',
                email: '',
                phones: ''
            },
            disabled: false
        }
    }

    handleNamechange(e){
        this.setState({
            name: e.target.value
        });
    }

    handleSurnamechange(e){
        this.setState({
            surname: e.target.value
        });
    }

    handleEmailchange(e){
        let value = e.target.value;
        if(validateEmail(value)){
            this.setState({
                email: e.target.value,
                errors: {
                    email: '',
                    phones: this.state.errors.phones
                },
                disabled: false
            });
        }
        else{
            this.setState({
                errors: {
                    email: 'Invalid email, check syntax',
                    phones: this.state.errors.phones
                },
                disabled: true
            });
        }
    }

    handleAddresschange(e){
        this.setState({
            address: e.target.value
        });
    }

    handlePhonechange(e){
        let value = e.target.value;

        if(value === ''){
            this.setState({
                currentPhone: e.target.value,
                disabled: false,
                errors: {
                    phones: ''
                }
            });
        }
        else if(validatePhone(value) === true ){       
            this.setState({
                currentPhone: e.target.value,
                disabled: false,
                errors: {
                    phones: 'Check!',
                    email: this.state.errors.email
                }
            });
        }else{
            this.setState({
                currentPhone: e.target.value,
                errors: {
                    phones: "Invalid Phone",
                    email: this.state.errors.email
                },
                disabled: true
            });
        }
    }
    
    addPhone(){
        this.setState({
            phones: [...this.state.phones, this.state.currentPhone]
        });
    }

    deletePhone(phone){
        const phonesAfterDeletion = this.state.phones.filter( elem => elem !== phone)
        this.setState({
            phones: [...phonesAfterDeletion]
        });
    }

    onSubmit(e){
        e.preventDefault();
        
        const contact = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            address: this.state.address,
            phones: this.state.phones
        };

        axios.post('http://localhost:27017/contacts/add',contact)
        .then(() => window.location = '/')
        .catch(error => {
            if(!error.response.data.errors){
                if(error.response.data.keyValue.email){ // an uparxei error sto email prosthiki error sto state
                    this.setState({
                        errors: {
                            email: 'Email already exists!'
                        }
                    });                            
                }
                else if(error.response.data.keyValue.phones && this.state.phones !== undefined){ 
                    this.setState({
                        errors: {
                            phones: 'Phone already exists!' // an uparxei error sta phones prosthiki error sto state
                        },
                        disabled: true
                    });     
                }
            }else{
                const createErrors = {
                    name: error.response.data.errors.name ? error.response.data.errors.name.message : '',
                    surname: error.response.data.errors.surname ? error.response.data.errors.surname.message : '',
                    email: error.response.data.errors.email ? error.response.data.errors.email.message : '',
                    phones: error.response.data.errors.phones ? error.response.data.errors.phones.message : ''
                };
                this.setState({
                    errors: createErrors
                });
            }
        });
    }
    render(){
        
        const phoneStyle = {
            border: "1px solid rgba(114, 114, 114, 0.45)",
            backgroundColor: "#6b6c6c2e",
            width: "52%",
            margin: "2px auto",
            borderRadius: "3px"
        };

        return(
            <div>
               <h1>Create Contact</h1>
               <form onSubmit={this.onSubmit}>
                   <div className="row">
                        <div className="form-group col-md-6">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={this.handleNamechange} />
                            <small className="text-danger">{this.state.errors.name}</small>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Surname</label>
                            <input type="text" className="form-control" onChange={this.handleSurnamechange} />
                            <small className="text-danger">{this.state.errors.surname}</small>
                        </div>
                   </div>
                   <div className="row">
                        <div className="form-group col-md-6">
                            <label>Email</label>
                            <input type="text" className="form-control" onChange={this.handleEmailchange} />
                            <small className="text-danger">{this.state.errors.email}</small>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Address</label>
                            <input type="text" className="form-control" onChange={this.handleAddresschange} />
                            <small className="text-danger">{this.state.errors.address}</small>
                        </div>
                   </div>
                    <div className="row">
                        <div className="col-md-4"></div>              
                        <div className="form-group col-md-4 col-sm-12">
                                <div className="card">
                                    <label className="text-center">Phone</label>
                                    <ul className="phone-list">
                                        {
                                            Object.keys(this.state.phones).map( key =>
                                                <li style={phoneStyle} key={key+3}>{this.state.phones[key]}
                                                    <button type="button" className="close x-button" aria-label="Close" onClick={() => this.deletePhone(this.state.phones[key])}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </li>
                                            )
                                        }
                                    </ul>  
                                    <div className="form-group text-center">
                                        <input type="text" name="phone" placeholder="New phone" className="form-control phone-input" onChange={this.handlePhonechange}  />
                                        
                                        {this.state.disabled ? <small className="text-danger" >{this.state.errors.phones}</small> :
                                        <small className="text-success">{this.state.errors.phones}</small>}

                                    </div>
                                    {this.state.disabled ? <button type="button" className="btn btn-outline-primary btn-sm add-phone" disabled>Add Phone</button> :                                                
                                    <button type="button" className="btn btn-primary btn-sm add-phone" onClick={this.addPhone}>Add Phone</button>}
                                </div>
                            </div>
                        <div className="col-md-4"></div>              
                    </div>
                    {this.state.disabled ? <button type="submit" className="btn btn-primary float-right" disabled >Submit Contact</button> :                                                
                    <button type="submit" className="btn btn-primary float-right">Submit Contact</button>}
               </form>
            </div>
        );
    }            
};