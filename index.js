require('dotenv').config();
const express = require('express');
const Project = require('./model/Links');
const BestCoupon = require('./model/BestCoupon');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const URI = process.env.URL;
const PORT = process.env.PORT || 5900;

// Middle ware
app.use(express.json());
app.use(cors());

// Connection to db

mongoose.connect(
    URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Succesfully connect to db');
        }
    }
);

//Routes
// Get all documents
app.get('/api', async (req, res) => {
    try {
        const Projects = await Project.find();
        res.json(Projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'something went wrong' });
    }
});

// Get all best coupons
app.get('/best', async (req, res) => {
    try {
        const bestCoupons = await BestCoupon.find();
        res.json(bestCoupons);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'something went wrong' });
    }
});

// Best coupon register

// Register route
app.post('/best', async (req, res) => {
    const { title, affiliate } = req.body;
    try {
        await BestCoupon.create({
            title,
            affiliate,
        });
        res.status(200).json({ message: 'SUCCESSFULLY DATA ADDED' });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// Register route
app.post('/api', async (req, res) => {
    const { title, description, imageLink, code, date, category, affiliate } =
        req.body;
    try {
        await Project.create({
            title,
            description,
            imageLink,
            code,
            date,
            category,
            affiliate,
        });
        res.status(200).json({ message: 'SUCCESSFULLY DATA ADDED' });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// Find Project by id
app.get('/api/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const Projects = await Project.findById(id);
        res.json(Projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'something went wrong' });
    }
});

// Find Project by id
app.get('/best/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const bestCoupons = await BestCoupon.findById(id);
        res.json(bestCoupons);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'something went wrong' });
    }
});

// Update
app.put('/api/:id', async (req, res) => {
    try {
        const result = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// Delete
app.delete('/api/:id', async (req, res) => {
    try {
        const result = await Project.findByIdAndDelete(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});
// Delete
app.delete('/best/:id', async (req, res) => {
    try {
        const result = await BestCoupon.findByIdAndDelete(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// Search

app.get('/search/:key', async (req, res) => {
    let result = await Project.find({
        $or: [
            { title: { $regex: req.params.key } },
            { description: { $regex: req.params.key } },
        ],
    });
    res.send(result);
});

// Listening to port
app.listen(PORT, () => {
    try {
        console.log(`Connect to port ${PORT}`);
    } catch (err) {
        console.log(err);
    }
});
