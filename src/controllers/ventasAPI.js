const ventasService = require("../services/ventasService");

exports.create = async function(req, res) {
    const params = req.body;
    try {
        const venta = await ventasService.create(params);
        res.json(venta);
    } catch (error) {
        res.send(error);
    }
}

exports.list = async function(req, res) {
    try {
        const ventas = await ventasService.list();
        res.json(ventas);
    } catch (error) {
        res.send(error);
    }
}
