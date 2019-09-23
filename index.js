const express = require('express');
const app = express();
app.use(express.static('static'));

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

const db = {
    "clients":[
        {
            "name": "Alice"
        },
        {
            "name": "Bob"
        },
        {
            "name": "Carol"
        },
    ],
    "drivers":[
        {
            "name": "Dragan"
        },
        {
            "name": "Edna"
        },
    ],
    "tours":[
        {
            "id": 1,
            "driver": "Dragan",
            "finished": true,
            "invoiced": true,
            "date": "2019-03-25",
            "deliveries":[
                {
                    "article": "computer",
                    "delivered": true
                }
            ]
        },
        {
            "id": 2,
            "driver": "Edna",
            "date": "2019-03-25",
            "deliveries":[
                {
                    "article": "desk",
                    "delivered": false
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

app.post('/api/tours', (req, res) => {
    console.log(req.body)
    res.send(db.clients)
})

console.log(`Will run on port ${PORT}`)

app.listen(PORT);