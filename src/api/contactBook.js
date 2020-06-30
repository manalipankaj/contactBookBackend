'use strict'

const contactBookService = require('../services/contactBook');
const express = require('express');
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
const port = 3000;

function middleWare(req, res, next) {
    // console.log("Arguments ", req, " are");
    next();
}

app.get('/contact',
    middleWare,
    async (req, res) => {
        const contactDTO = req.body;
        let contact;
        try {
            contact = await contactBookService.getContact();
        } catch (error) {
            console.log("Someting went wrong", error);
        }
        return res.send(contact)
    });

app.post('/contact',
    async (req, res) => {
        console.log("Reqeust is ", req.body);
        const contactDTO = req.body;

        try {
            let contact;
            contact = await contactBookService.createContact(contactDTO.name, contactDTO.email, contactDTO.countryCode);
        } catch (error) {
            return res.status(500).send(error)
        }
        return res.send(contact);
    });

app.put('/contact',
    async (req, res) => {
        const contactDTO = req.body;
        try {
            let contact;
            contact = await contactBookService.updateContact(contactDTO.name, contactDTO.email, contactDTO.countryCode);
        } catch (error) {
            return res.status(500).send(error)
        }
    });

app.delete('/contact',
    async (req, res) => {
        const contactDTO = req.body;
        try {
            let contact;
            contact = await contactBookService.deleteContact(contactDTO.email);
        } catch (error) {
            return res.status(500).send(error)
        }
    });

app.listen(port, () => console.log(`Contact book app`))