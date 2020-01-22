const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    add,
}

function find() {
    return db.select("*").from("schemes");
}

function findById(schemeId) {
    return db("schemes").where({id: schemeId})
}

function add(scheme) {
    return db("schemes")
        .insert(scheme)
        .then(ids => ({id: ids[0]}))
}