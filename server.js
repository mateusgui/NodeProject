//EXPRESS
import express from 'express'
const app = express()
app.use(express.json())
app.listen(3000) // http://localhost:3000

//CORS
import cors from 'cors'
app.use(cors()); // Habilitar CORS para todas as origens

//PRISMA
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


//GET - LISTAR TODOS - http://localhost:3000/usuarios
app.get('/usuarios', async (request,response) => {

    const user = await prisma.user.findMany()

    response.status(200).json(user)
})


//POST - CRIAR - http://localhost:3000/usuarios
app.post('/usuarios', async (request,response) => {
    
    const user = await prisma.user.create({
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    })

    response.status(201).json(user)
})


//PUT - ATUALIZAR pelo ID http://localhost:3000/usuarios/ID
app.put('/usuarios/:id', async (request,response) => {
    
    const user = await prisma.user.update({
        where: {
            id: request.params.id
        },
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    })

    response.status(200).json(user)
})


//DELETE - DELETAR pelo ID http://localhost:3000/usuarios/ID
app.delete('/usuarios/:id', async (request,response) => {
    
    const user = await prisma.user.delete({
        where: {
            id: request.params.id
        }
    })
        
    response.status(200).json({message: 'Usuario deletado com sucesso!'})
})





