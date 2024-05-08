const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const role= require('../middleware/roles')
const router = new express.Router()

router.get('/adminUsers',auth,role(['superadmin']),async (req, res) => {
    try {
        const users = await User.find({role:'admin'})
        res.send(users)
    } catch (e) {
        res.status(200).send(e)
    }
}
)

router.patch('/adminUsers/assign/:id',auth,role(['superadmin']),async (req, res) => {
    console.log('assign');
    try {
        const user = await User.findById(req.params.id)
        user.role='admin'
        await user.save();
        res.send({user,message: 'User assigned as admin successfully'})
    } catch (e) {
        res.status(200).send(e)
    }
}
)
router.patch('/adminUsers/demote/:id',auth,role(['superadmin']),async (req, res) => {
    console.log('adessign');
    try {
        console.log('demoting',req.params.id)
        const user = await User.findById(req.params.id)
        user.role='user'
        await user.save();
        res.send({user,message: 'Admin demoted to User'})
    } catch (e) {
        res.status(200).send(e)
    }
}
)

module.exports = router