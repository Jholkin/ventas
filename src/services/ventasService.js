const Venta = require("../models/ventas");
const kafkaService = require("./kafkaService");

exports.create = async function(params) {
    try {
        const venta = new Venta({
            product: params.product,
            client: params.client,
            salesman: params.salesman,
            total: params.total
        })
        await venta.save();

        const data = {
            topicName: "test",
            message: {
                salesman:venta.salesman, total:venta.total
            }
        }
        // envío mensaje para topic de vendedores
        let resProducer = await kafkaService.producer(data);

        return resProducer;
    } catch (error) {
        throw error;
    }
}

exports.list = async function() {
    try {
        const ventas = await Venta.find().exec();
        return ventas;
    } catch (error) {
        throw error;
    }
}
