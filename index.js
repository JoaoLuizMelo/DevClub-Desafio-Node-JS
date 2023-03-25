const express = require('express')
const app = express()
const uuid = require('uuid')
app.use(express.json())
const port = 3000
app.listen(port)


const orders = []
app.get('/order',(request,require)=>{
    return require.json(orders)
})

app.post('/order',(request,response)=>{
    const {name , ordered , value }=request.body
    const order = {id:uuid.v4(), name , ordered , value , status:"Em preparação" }
    orders.push(order)
    return response.status(201).json(order)
})

app.put('/order/:id',(request,response)=>{
    const { id } = request.params
    const {name, ordered, value}=request.body
    const index = orders.findIndex(order => order.id === id)
    const newOrder = {id, name, ordered, value, status:"Em preparação" }
    if (index < 0 ) {
        return response.status(404).json({ message:"This order are not found."})
    }
    orders[index]=newOrder
    return response.json(newOrder)
})

app.patch('/order/:id',(request,response)=>{
    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)
    const newOrder = {id, name: orders[index].name, ordered:orders[index].ordered, value:orders[index].value , status:"pronto" }
    if (index < 0 ) {
        return response.status(404).json({ message:"This order are not found."})
    }
    orders[index]=newOrder
    return response.status(200).json(newOrder)
})

app.delete('/order/:id',(request,response)=>{
    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)
    orders.splice(index,1)
    return response.status(200).json()
})

