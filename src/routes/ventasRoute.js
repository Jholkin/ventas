const { Router } = require("express");
const router = Router();
const util = require("../services/util");
const ventasAPI = require("../controllers/ventasAPI");

const ensureToken = util.validatedToken;

//router.get("/token", ventasAPI.getToken);
router.post("/create", ventasAPI.create);
router.post("/ventas", ensureToken, ventasAPI.list);
// router.post("/create-topic", ensureToken, ventasAPI.createTopic);
// router.get("/topics", ensureToken, ventasAPI.listTopics)
// router.delete("/topic", ventasAPI.deleteTopic);

module.exports = router;