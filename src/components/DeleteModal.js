import React from 'react';
import Modal from 'react-modal';

const modalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      padding               : '57px 29px',
      background            : '#f8f8f8'
    }
};

const modalGrid = {
    justifyContent: "space-evenly",
    display: "flex"
}

export default class DeleteModal extends React.Component {
    constructor() {
        super();
     
        this.state = {
          modalIsOpen: false
        };
     
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    afterOpenModal() {
        this.transno.style.width = "100px";
        this.transyes.style.width = "100px";                
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render(){
        return(
            <div style={{display: "inline-block"}}>
            <button className="btn btn-danger btn-sm" onClick={this.openModal}>Delete</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              ariaHideApp={false}
              style={modalStyles}
              contentLabel="Example Modal"
            >
     
              <h3>Delete this contact ?</h3>
              <div className="row">
                    <div className="col-md-12 col-sm-12" style={modalGrid}>
                        <button className="btn btn-danger btn-md trans-button" ref={transno => this.transno = transno} onClick={this.closeModal}>no</button>
                        <button className="btn btn-success btn-md trans-button" ref={transyes => this.transyes = transyes} onClick={()=>this.props.deleteContact(this.props.contact._id)}>yes</button>
                    </div>                
              </div>
            </Modal>
          </div>
        );
    }
}