import express from 'express';

const app = express();
const port = 8000;
app.use(express.json());

let expressData = []
let nextId = 1;

// Add a new Food
app.post('/foodExpress', (req, res) => {

    const {name, price} = req.body
    const newExpress = {id: nextId++, name, price}
    expressData.push(newExpress)  //This is how we add new data to the array.
    res.status(201).send(newExpress)
})

// Get all Foods
app.get('/foodExpress', (req, res) => {
    res.status(200).send(expressData)
})

// Get a food with ID 
app.get('/foodExpress/:id', (req, res) => {
    const foodExpress = expressData.find(food => food.id === parseInt(req.params.id))
    if (!foodExpress) {
        return res.status(404).send('Food not Found!')
    } else {
        res.status(200).send(foodExpress)
    }


})

// Upadat food...With business Logic 

app.put('/foodExpress/:id', (req, res) => {
    const foodExpress = expressData.find(food => food.id === parseInt(req.params.id));
    if (!foodExpress) {
        return res.status(404).send('Food not Found!');
    }

    const { name, price } = req.body;
    foodExpress.name = name;
    foodExpress.price = price;

    res.status(200).send(foodExpress); // Sends the updated food item
}) 

// Delete Food 

app.delete('/foodExpress/:id', (req, res) => {
    const index = expressData.findIndex(food => food.id === parseInt(req.params.id)); // Correctly call findIndex on the array
    if (index === -1) {
        return res.status(404).send('Food not Found!');
    }

    expressData.splice(index, 1); // Remove the food item from the array
    return res.status(204).send('Food deleted!');
});

app.listen(port, () => {
    console.log(`server is running at port: ${port}...`);

})


