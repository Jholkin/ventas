const { model, Schema } = require('mongoose');

const SchemaVentas = new Schema({
    product: {
        type: String
    },
    client: {
        type: String
    },
    salesman: String,
    total: String
}, {
    timestamps: true,
})

module.exports = model('Ventas', SchemaVentas);