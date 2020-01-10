const router = require('express').Router();

let Contact = require('../models/contact.model');

// Get all Contacts
router.route('/').get((req, res) => {
    Contact.find()
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a contact
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const address = req.body.address;
    const phones = req.body.phones;

    const newContact = new Contact({name, surname, email, address, phones});

    newContact.save()
    .then(() => res.json('Contact added'))
    .catch(err => res.status(400).json(err))
});

// Get a single Contact
router.route('/:id').get((req,res) => {
    Contact.findById(req.params.id)
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a Contact
router.route('/:id').delete((req,res) => {
    Contact.findByIdAndDelete(req.params.id)
    .then( () => res.json('Contact deleted'))
    .catch(err => res.status(400).json('Error: ' + err));    
});

// Update(edit) a Contact
router.route('/update/:id').post((req, res) => {
    Contact.findById(req.params.id)
    .then(contact => {
        contact.name = req.body.name;
        contact.surname = req.body.surname;
        contact.email = req.body.email;
        contact.address = req.body.address;
        contact.phones = req.body.phones;

        contact.save()
        .then( () => res.json('Contact updated'))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;

