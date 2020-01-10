import React from 'react';
import axios from 'axios';

const validatePhone = (phone) => {
     // eslint-disable-next-line
    let regex = /^[\+]?[(]?[3][0][)]?[\s\.]?[0-9]{10}$|^[0-9]{10}$/;    
    return regex.test(phone);
}
export default class EditContact extends React.Component {
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
            id: '',
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
    
    componentDidMount() {
        axios.get('http://localhost:27017/contacts/'+ this.props.match.params.id)
        .then(response => {
            this.setState({
                name: response.data.name,
                surname: response.data.surname,
                email: response.data.email,
                address: response.data.address,
                phones: response.data.phones,
            })
        });
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
        this.setState({
            email: e.target.value
        });
    }

    handleAddresschange(e){
        this.setState({
            address: e.target.value
        });
    }

    handlePhonechange(e){
        let value = e.target.value;

        if(validatePhone(value) === true || value === ''){       
            this.setState({
                currentPhone: e.target.value,
                disabled: false,
                errors: {
                    phones: 'Check!'
                }
            });
        }else{
            this.setState({
                currentPhone: e.target.value,
                errors: {
                    phones: "Invalid Phone"
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

        axios.post('http://localhost:27017/contacts/update/'+ this.props.match.params.id, contact)
        .then(() => window.location = '/')
        .catch(error => {
            // Ta errors pou parousiazontai epeita apo epeksergasia ston server
            // apothikeuontai sta ekastote states. Kai parousiazontai sto small element otan ginetai to submit
            this.setState({
                errors: {
                    name: error.response.data.errors.name ? error.response.data.errors.name.message : '',
                    surname: error.response.data.errors.surname ? error.response.data.errors.surname.message : '',
                    email: error.response.data.errors.email ? error.response.data.errors.email.message : '',
                    phones: error.response.data.errors.phones ? error.response.data.errors.phones.message : ''
                }
            });
            if(error.response.data.code === 11000){
                console.log("THE EMAIL IS ALREADY IN THE DATABASE");
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
               <h1>Edit Contact</h1>
               <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" onChange={this.handleNamechange} value={this.state.name} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Surname</label>
                            <input type="text" className="form-control" name="surname" onChange={this.handleSurnamechange} value={this.state.surname} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" onChange={this.handleEmailchange} value={this.state.email} />
                        </div>                    
                        <div className="form-group col-md-6">
                            <label>Address</label>
                            <input type="text" className="form-control" name="address" onChange={this.handleAddresschange} value={this.state.address}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"></div>              
                        <div className="form-group col-md-4 col-sm-12">
                            <div className="card" style={{padding: "16px 2px"}}>
                                <label style={{textAlign: "center"}}>Phone</label>
                                <ul style={{listStyle: "none",textAlign: "center",padding: "0"}}>
                                    {
                                        Object.keys(this.state.phones).map(key=>
                                            <li style={phoneStyle} key={key+3}>{this.state.phones[key]}
                                                <button type="button" className="close" style={{fontSize: "1.4rem"}} aria-label="Close" onClick={() => this.deletePhone(this.state.phones[key])}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </li>
                                        )
                                    }
                                </ul>  
                                <div className="form-group" style={{textAlign: "center"}}>
                                    <input style={{width: "80%",margin: "auto"}} type="text" name="phone" placeholder="New phone" className="form-control" onChange={this.handlePhonechange}  />
                                    
                                    {this.state.disabled ? <small className="text-danger" >{this.state.errors.phones}</small> :
                                    <small className="text-success">{this.state.errors.phones}</small>}

                                </div>
                                {this.state.disabled ? <button type="button" className="btn btn-primary btn-sm" style={{width: "50%",margin: "auto"}} disabled>Add Phone</button> :                                                
                                <button type="button" className="btn btn-primary btn-sm" style={{width: "50%",margin: "auto"}} onClick={this.addPhone}>Add Phone</button>}
                            </div>
                        </div>
                        <div className="col-md-4"></div>              
                    </div>
                   <input type="submit" className="btn btn-primary" value="Update Contact" style={{float: "right"}} />
               </form>
            </div>
        );
    }                     
};