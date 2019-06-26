const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

// Item model
const Item = require('../../models/Item');

// @route GET api/items
// @desc get all items
// @acces Public por ahora
router.get('/', (req, res) => {
     Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

// @route POST api/items
// @desc create a post
// @acces Public por ahora
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item =>res.json(item));

});


// @route DELETE api/items/:id
// @desc delete item
// @acces Public por ahora
router.delete('/:id',auth,(req, res) => {
Item.findById(req.params.id)
 .then(item => item.remove().then(() => res.json({ succes: true} )))
 .catch(err => res.status(404).json({ succes: false }));

})

module.exports = router;