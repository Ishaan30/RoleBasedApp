const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users/signUp', async (req, res) => {
    const user = new User(req.body)
    const {secretCode} = req.body
    try {
        const existingUser = await User.findOne({ email:user.email });
        if (existingUser) {
          return res.status(200).send({ message: 'User already exists!' });
        }
        if(secretCode == process.env.ADMIN_KEY)
        user.role = 'admin';
        else if(secretCode == process.env.SUPERADMIN_KEY)
        user.role = 'superadmin';
        console.log(user);
        await user.save()
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (e) {
        console.log(req.body);
        res.status(200).send(e);
    }
})

router.post('/users/login', async (req, res) => {
    try {
        // using the custom function findByCredentials defind in schema file
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if(!user)
        return res.status(200).send({ message: 'User not found!' });
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(200).send({error:'Invalid Details!'});
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        // remove current login using current token
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        }) 
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(200).send(e);
    }
})

router.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user);
      } catch (error) {
        res.status(500).json({ message: 'Server Error' });
      }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowed = ['name', 'email', 'password'];
    const valid = updates.every((e) => allowed.includes(e));
    if (!valid) {
        return res.status(200).send({ error: 'Invalid UPdates' });
    }
    try {
        updates.forEach((e) => req.user[e] = req.body[e]);
        await req.user.save();
        res.send({user:req.user,message: 'User updated successfully'});
    } catch (e) {
        res.status(200).send(e);
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send({user:req.user,message: 'User deleted successfully'});
    } catch (e) {
        res.status(200).send();
    }
})

module.exports = router