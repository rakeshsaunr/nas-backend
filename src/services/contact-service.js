
// Updated to explicitly provide the Contact model to the repository for proper initialization.

const Contact = require('../models/contact-model');
const { ContactRepository } = require('../repositories');

// Pass Contact model to the repository constructor
const contactRepository = new ContactRepository(Contact);

async function createContact(data) {
    return await contactRepository.create(data);
}

async function getAllContactDetails() {
    return await contactRepository.getAll();
}

async function deleteContactDetail(id) {
    return await contactRepository.delete(id);
}

module.exports = {
    createContact,
    getAllContactDetails,
    deleteContactDetail
};
