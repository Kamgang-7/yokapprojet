const express=require ('express');
let router=express.Router();
const studentServ = require('../services/students.services');
router.get('/', async function (req, res, next) {
    try {
        res.json(await studentServ.getListOftrans(req.query.page));
    } catch (err) {
        console.error(`Error while getting songs`, err.message);
        next(err);
    }
});
router.post('/newtrans', async function (req, res, next) {
    try {
        const newtransData = req.body;
        const result = await studentServ.newtrans(newtransData);
        res.json(result);
    } catch (err) {
        console.error(`Error while adding a new song`, err.message);
        next(err);
    }
});
router.put('/:id', async function (req, res, next) {
    try {
        const transId = req.params.id;
        const updatedtransData = req.body;
        const result = await studentServ.updateSong(transId, updatedtransData);
        res.json(result);
    } catch (err) {
        console.error(`Error while updating a song`, err.message);
        next(err);
    }
});
router.get('/one/:id', async function (req, res, next) {
    try {
        const transId = req.params.id;
        res.json(await studentServ.gettransById(transId));
    } catch (err) {
        console.error(`Error while getting song by ID`, err.message);
        next(err);
    }
});
router.delete('/:id', async function (req, res, next) {
    try {
        const transId = req.params.id;
        const result = await studentServ.deletetrans(transId);
        res.json(result);
    } catch (err) {
        console.error(`Error while deleting a song`, err.message);
        next(err);
    }
});

 module.exports=router;