const express = require('express');
const app = express();

app.use(express.json());
const morgan = require('morgan');
app.use(morgan('common'));
//app.listen(process.env.PORT || 8080);
const { PORT, DATABASE_URL } = require('./config')
const mongoose = require('mongoose');
const { PantryItem } = require('./models');
mongoose.Promise = global.Promise;


app.get('/items', (req, res => {
    PantryItem
        .find()
        .then(items => {
            res.json(items.map(item => item.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.statusCode(500).json({ error: 'things aren\'t adding up' });
        });
}));

app.get('/items/:id', (req, res) => {
    PantryItem.findById(req.params.id)
        .then(item => res.json(item.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'things aren\'t adding up' });
        });
});

app.post('/items', (req, res) => {
    const requiredFields = ['ingredient'];
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
            ingredient: req.body.ingredient
        })
        .then(pantryItem => res.status(201).json(blogPost.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'That was not supposed to happen' });
        });
});

app.delete('/items/:id', (req, res) => {
    PantryItem
        .findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).json({ message: 'success' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went horribly wrong' });
        });
});

app.put('/items/:id', (req, res) => {

    if (!(req.params.id && req.params.id === req.body.id)) {
        res.status(400).json({
            error: 'Request path ID and body ID values must match'
        });
        return
    }

    const updated = {};
    const updateableFields = [ingredient];
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


app.use('*', function (req, res) {
    res.status(404).json({ message: 'Not Found' });
});

let server;
//hi
function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}


function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}


module.exports = { runServer, app, closeServer };