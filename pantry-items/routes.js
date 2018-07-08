const express = require('express');
const route = express.Router();
const { PantryItem } = require('./models');

route.get('/', (req, res) => {
    PantryItem
        .find()
        .then(items => {
            res.json(items.map(item => item.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.statusCode(500).json({ error: 'things aren\'t adding up' });
        });
});

route.get('/:id', (req, res) => {
    PantryItem.findById(req.params.id)
        .then(item => res.json(item.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'things aren\'t adding up' });
        });
});

route.post('/', (req, res) => {
    const requiredFields = ['name','amount','measure'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    PantryItem
        .create({
            name: req.body.name,
            amount: req.body.amount,
            measure: req.body.measure
        })
        .then(pantryItem => res.status(201).json(pantryItem.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'That was not supposed to happen' });
        });
});

route.delete('/:id', (req, res) => {
    PantryItem
        .findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).json({ message: 'success' });
        })
        .catch(err => {
            console.error(serr);
            res.status(500).json({ error: 'Something went horribly wrong' });
        });
});

route.put('/:id', (req, res) => {

    if (!(req.params.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: 'Request path ID and body ID values must match'
        });
        return
    }

    const updated = {};
    const updateableFields = ['name','amount'];
    updateableFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field];
        }
    });

    PantryItem
        .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
        .then(updatedIngredient => res.status(204).end())
        .catch(err => res.status(500).json({
            message: 'Something has messed up'
        }));

});

module.exports = route;