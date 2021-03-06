const express = require('express');
const router = express.Router();

//pg-promise
const db = require('./config')

router.get('/', async (req, res) => {
    try {
        let likes = await db.any(`
            SELECT *
            FROM likes 
            `)
        res.json({
            payload: likes, 
            message: "Success you've reached /likes"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
        })
    }
})

router.get('/posts/:post_id', async (req, res) => {
    try {
        let likes = await db.any(`
            SELECT *
            FROM likes 
            WHERE post_id = ${req.params.post_id}
            `)
        res.json({
            payload: likes, 
            message: "Success you've reached /likes"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
        })
    }
})

router.post('/posts/:liker_id/:post_id', async (req, res) => {
    try {
        await db.none(`
            INSERT INTO likes(liker_id, post_id)
            VALUES($1, $2)
            `, [req.params.liker_id, req.params.post_id]
        )
        res.json({
            payload: [req.params.liker_id, req.params.post_id], 
            message: "Success you've reached /likes"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
            error
        })
    }
})

router.delete('/posts/:post_id/:liker_id', async (req, res) => {
    try {
        await db.none(`
            DELETE FROM likes
            WHERE post_id = ${req.params.post_id} 
            AND liker_id = ${req.params.liker_id}
            `)
        res.json({
            payload: [req.params.liker_id, req.params.post_id], 
            message: "Success you've reached /likes"
        })
    } catch(error) {
        res.status(500)
        res.json({
            message: 'error',
            error
        })
    }
})

module.exports = router;