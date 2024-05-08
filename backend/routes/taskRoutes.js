const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')

router.post('/tasks', auth, async (req, res) => {
    console.log('test')
    const onwerId = req.body.ownerid
    const task = new Task({
        ...req.body
    })
    try {
        await task.save()
        res.status(201).send({task, message: 'Task created successfully'})
    } catch (e) {
        res.status(200).send(e)
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks');
        res.status(200).send(req.user.tasks)
    } catch (e) {
        res.status(200).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(200).send('No task with given id found');
        }
        res.send(task);
    } catch (e) {
        res.status(200).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowed = ['description', 'completed'];
    const valid = updates.every((e) => allowed.includes(e));
    if (!valid) {
        return res.status(200).send({ error: 'Invalid updates' });
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id});
        if (!task) {
            return res.status(200).send('Task Not Found');
        }
        updates.forEach((e) => task[e] = req.body[e]);
        await task.save();
        res.send({task,message: 'Task updated successfully'});
    } catch (e) {
        res.status(200).send(e);
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id});
        if (!task) {
            throw Error('Task not found');
        }
        res.send({task,message: 'Task deleted successfully'});
    } catch (e) {
        res.status(200).send(e);
    }
})

module.exports = router