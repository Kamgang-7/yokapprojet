const db =require('./db.services')
const helper= require('../helper');
const config = require('../config');


async function getListOftrans(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM transactions LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta,
    };
}
async function gettransById(transId, page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM transactions WHERE id = ?`,
        [transId]
    );

    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta,
    };
}
async function newtrans(Data) {
    const {montant,dateenregistrement,heureenregistrement,type } = Data;
    const result = await db.query(
        `INSERT INTO transactions (montant,dateenregistrement,heureenregistrement,type ) VALUES ('${Data.montant}', '${Data.dateenregistrement}', '${Data.heureenregistrement}', '${Data.type}' )`,
        [montant,dateenregistrement, heureenregistrement,type]
    );
    const newstransId = result.insertId;
    const newstrans = await gettransById(newstransId);
    return {
        data: newstrans.data,
        message: 'montant  added successfully.',
    };
}
async function getListOftrans(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM transactions LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta,
    };
}
async function deletetrans(transId) {
    const result = await db.query(
        'DELETE FROM transactions WHERE id = ?',
        [transId]
    );

    if (result.affectedRows === 0) {
        throw new Error('Song not found or not deleted.');
    }

    return {
        message: 'Song deleted successfully.',
    };
}
module.exports = {
    getListOftrans,
    getListOftrans,
    newtrans,
    deletetrans
} 