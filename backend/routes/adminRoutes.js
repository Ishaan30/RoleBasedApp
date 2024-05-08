const express = require('express')
const User = require('../models/user')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const role= require('../middleware/roles')
const router = new express.Router()

router.get('/usersAll',auth,role(['admin', 'superadmin']),async (req, res) => {
    try {
        const users = await User.find({role:'user'})
        res.send(users)
    } catch (e) {
        res.status(200).send(e)
    }
}
)
router.get('/usersAll/tasks/:id',auth,role(['admin', 'superadmin']),async (req, res) => {
    try {
        const tasks = await Task.find({owner:req.params.id});
        res.status(200).send(tasks);
    }
    catch (e) {
        res.status(200).send(e);
    }
    })
router.delete('/usersAll/:id',auth,role(['admin', 'superadmin']),async (req, res) => {
    try {
        await Task.deleteMany({ owner: req.params.id });
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user)
            return res.status(200).send({ message: 'User not found!' });
        res.send({user,message: 'User deleted successfully'})
    } catch (e) {
        res.status(200).send(e)
    }
})

module.exports = router
