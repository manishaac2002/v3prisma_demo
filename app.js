const express = require('express')
const application = express()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


application.use(express.json())

// get all student details
application.get('/get-student-details', async (request, response) => {
    const allStudentDetails = await prisma.student.findMany()
    console.log("Get student details");
    response.json(allStudentDetails)
})

// create a new student
application.post('/create-student', async (request, response) => {
    const createNewStudent = await prisma.student.create({ data: request.body })
    console.log(request.body);
    response.send("New Student created")
})

// Get a student name
application.put('/get-student-name/:id', async (request, response) => {
    try {
        const id = request.params.id
        const studentName = await prisma.student.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                name: true,
            }
        })
        response.send(studentName);
    } catch (error) {
        console.log(error);
    }
})

// get all parent details
application.get('/get-parent-details', async (request, response) => {
    const allParentsDetails = await prisma.parents.findMany()
    console.log("Get parent details");
    response.json(allParentsDetails)
})

// create a new parent
application.post('/create-parent', async (request, response) => {
    const createNewParent = await prisma.parents.create({ data: request.body })
    console.log(request.body);
    response.send("New parent created")
})

const port = 6000
application.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})