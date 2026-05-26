
const CrudRepository = require('./crud-repository');

// Instead of attempting to get ContactModel via destructuring from ../models,
// require the actual Contact model directly. The repository should accept the model
// as a constructor argument, for flexibility/testing and to avoid tight internal coupling.

class ContactRepository extends CrudRepository {
    constructor(model) {
        // Defensive: Ensure a model is always passed in
        if (!model) throw new Error('ContactRepository: A model must be provided');
        super(model);
    }
}

module.exports = ContactRepository;
