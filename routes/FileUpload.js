const express =  require("express");
const { localFileUpload, imageUpload, videoUpload, reduceImageSize } = require("../controllers/fileUpload");
const router = express.Router()

router.post("/localFileUpload" , localFileUpload)
router.post("/imageUpload" , imageUpload)
router.post("/videoUpload" , videoUpload)
router.post("/reduceImageSize" , reduceImageSize)

module.exports = router;