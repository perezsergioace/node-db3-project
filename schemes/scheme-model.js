const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
}

function find() {
    return db.select("*").from("schemes");
}

function findById(schemeId) {
    return db("schemes").where({id: schemeId});
}

function add(scheme) {
    return db("schemes")
        .insert(scheme)
        .then(ids => ({id: ids[0]}))
}

function update(schemeChanges, id) {
    return db("schemes").where({ id }).update(schemeChanges);
}

function remove(id) {
    return db("schemes").where({ id }).del();
}