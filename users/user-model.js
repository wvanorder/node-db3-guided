const db = require('../data/db-config.js');

function getUsers() {
    return db('users');
};

function getById(id) {
    return db('users').where({ id });
};

function add(user) {
    if(user.username){
        return db('users').insert(user);
    } else {
        res.status(400).json({ error: 'you must include a username' });
    }
};

function getUserPosts(id) {
    return db('posts as p')
        .innerJoin('users as u', 'p.user_id', 'u.id')
        .select('p.id', 'p.contents', 'u.username as postedBy')
        .where({ user_id: id })
};

function update(id, changes) {
    return db('users')
    .where({ id })
    .update(changes);
};

function remove(id) {
    return db('users')
    .where({ id })
    .del();
}


module.exports = {
    getUsers,
    getById,
    add,
    getUserPosts,
    remove
};