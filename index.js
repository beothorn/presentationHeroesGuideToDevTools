/**
Hello :)
this is the code that simulates our system.
It is just a giant JSON with some values inside.

I just wanted to have some endpoints to call from my
extension so don't expect to find any nice code here :)

For example, invalid calls don't return errors.

This code is just enough to exemplify the idea
of the presentation.
 */
const express = require('express');
const app = express();
app.use(express.static('static'));

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

const db = {
    "clients":[
        {"name": "Alice Restaurant"},
        {"name": "Bob's Burguer"},
        {"name": "Carol Soups"},
    ],
    "drivers":[
        {"name": "Dragan"},
        {"name": "Edna"},
    ],
    "tours":[
        {
            "id": 1,
            "driver": "Dragan",
            "client": "Alice Restaurant",
            "finished": false,
            "invoiced": false,
            "date": "2020-02-02",
            "deliveries":[
                {
                    "id": 10,
                    "article": "Potatoes",
                    "quantity": 1,
                    "loaded": false,
                    "delivered": false,
                },
                {
                    "id": 11,
                    "article": "Tomatoes",
                    "quantity": 2,
                    "loaded": false,
                    "delivered": false,
                },
                {
                    "id": 12,
                    "article": "Salt",
                    "quantity": 1,
                    "loaded": false,
                    "delivered": false,
                },
            ]
        },
        {
            "id": 2,
            "driver": "Dragan",
            "client": "Bob's Burguer",
            "finished": false,
            "invoiced": false,
            "date": "2020-02-02",
            "deliveries":[
                {
                    "id": 13,
                    "article": "Burguer box",
                    "quantity": 10,
                    "loaded": false,
                    "delivered": false,
                },
                {
                    "id": 14,
                    "article": "Buns",
                    "quantity": 80,
                    "loaded": false,
                    "delivered": false,
                },
            ]
        },
        {
            "id": 3,
            "driver": "Edna",
            "client": "Carol Soups",
            "finished": false,
            "invoiced": false,
            "date": "2020-02-02",
            "deliveries":[
                {
                    "id": 15,
                    "article": "Potatoes",
                    "quantity": 8,
                    "loaded": false,
                    "delivered": false,
                },
                {
                    "id": 16,
                    "article": "Carrots",
                    "quantity": 6,
                    "loaded": false,
                    "delivered": false,
                }
            ]
        },
        {
            "id": 4,
            "driver": "Edna",
            "client": "Carol Soups",
            "finished": false,
            "invoiced": false,
            "date": "2020-02-03",
            "deliveries":[
                {
                    "id": 17,
                    "article": "Potatoes",
                    "quantity": 3,
                    "loaded": false,
                    "delivered": false,
                },
                {
                    "id": 18,
                    "article": "Oil",
                    "quantity": 2,
                    "loaded": false,
                    "delivered": false,
                }
            ]
        },
    ]
}

const PORT = 3000

app.get('/api/clients', (req, res) => {
    res.send(db.clients)
})

app.get('/api/tours', (req, res) => {
    res.send(db.tours)
})

app.get('/api/drivers', (req, res) => {
    res.send(db.drivers)
})

app.get('/api/tours/:id/deliveries', (req, res) => {
    const tourId = parseInt(req.params.id)
    const tour = db.tours.find(t => t.id === tourId)
    res.send(tour.deliveries)
})

app.get('/api/tours/:id/deliveries/allLoaded', (req, res) => {
    const tourId = parseInt(req.params.id)
    let allLoaded = true
    for(t of db.tours){
        if(t.id === tourId){
            for(d of t.deliveries){
                if(!d.loaded) allLoaded = false
            }
        }
    }
    res.send({loaded: allLoaded})
})

const getDelivery = (id) => {
    for(t of db.tours){
        for(d of t.deliveries){
            if(d.id === id){
                return d
            }
        }
    }
}

app.put('/api/deliveries/:id/loaded/:value', (req, res) => {
    const deliveryId = parseInt(req.params.id)
    const delivery = getDelivery(deliveryId)
    delivery.loaded = req.params.value == "true"
    res.status(200).end()
})

console.log(`Will run on port ${PORT}`)

app.listen(PORT);