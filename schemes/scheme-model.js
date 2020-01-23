const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    findSteps,
}

function find() {
    return db.select("*").from("schemes");
}

function findById(id) {
    return db("schemes")
        .where({ id })
        .then(scheme => {
            if (scheme) {
                return scheme[0]
            } else {
                return null
            }
        });
}

function add(scheme) {
    return db("schemes")
        .insert(scheme)
        .then(([id]) => {
            return findById(id)
        })
}

function update(changes, id) {
    return db("schemes")
        .where({ id })
        .update(changes)
        .then(updated => {
            if (updated > 0) {
                findById(id)
            } else {
                null
            }
            return findById(id)
        })
}

function remove(id) {
    console.log(id)
    return findById(id)
        .then(schemeId => {
            if (schemeId) {
                return db('schemes')
                    .where({ id })
                    .del()
            } else {
                return null
            }
        })
}

function findSteps(id) {
    return db('steps as s')
    .join('schemes as sc', 'sc.id', 's.scheme_id')
    .select('s.id', 'sc.scheme_name', 's.instructions', "s.step_number")
    .where('scheme_id', id)
    .orderBy('s.step_number', 'asc');
}