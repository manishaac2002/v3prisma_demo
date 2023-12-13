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

// get all parent details
application.get('/get-parent-details', async (request, response) => {
    const allParentDetails = await prisma.parents.findMany()
    console.log("parents here...");
    response.json(allParentDetails)
})

// create a new student
application.post('/create-student', async (request, response) => {
    const createNewStudent = await prisma.student.create({ data: request.body })
    console.log(request.body);
    response.send("New Student created")
})
//create new parent
application.post('/create-parents', async (request, response) => {
    const createNewParents = await prisma.parents.create({ data: request.body })
    console.log(request.body);
    response.send("New parents created")
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

application.put('/get-student-name-with-parent-id/:parent_id', async (request, response) => {
    try {
        const parent_id = request.params.parent_id
        const studentNameWithParentId = await prisma.parents.findFirst({
            where:{
                parent_id:parseInt(parent_id)
            },
            include: {
                student: {
                    select: {
                        name: true
                    }
                }
            }
        })
        response.send(studentNameWithParentId)
    } catch (error) {
        console.log(error);
    }
})

//create a new student with parent(inserting data)
application.post('/insert-student-parent', async(request,response)=>{
    const insertStudentParentData = await prisma.student.create({
        data:{
        name:"Vinu",
        student_class:3,
        parents:{
            create:{
                parent_name:"Mithra",
                parent_phone:8
            }
        }
    }
})
response.send(insertStudentParentData)
})



const port = 6000
application.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})