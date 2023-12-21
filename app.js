const express = require('express')
const application = express()

application.use(express.json())

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Get request
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

// get all school details
application.get('/get-school-details', async (request, response) => {
    const allSchoolDetails = await prisma.school.findMany()
    console.log("schools here...");
    response.json(allSchoolDetails)
})

// Post request 
// create a new student
application.post('/create-student', async (request, response) => {
    const createNewStudent = await prisma.student.create({ data: request.body })
    console.log(request.body);
    response.send("New Student created")
})

//create new parent
application.post('/create-parents', async (request, response) => {
    const createNewParents = await prisma.parents.create({ data: request.body })
    console.log("New parents created");
    response.send(createNewParents)
})

// create new school
application.post('/create-school', async (request, response) => {
    const createNewSchool = await prisma.school.create({ data: request.body })
    console.log("New school created");
    response.send(createNewSchool)
})

// put request
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

//get a student name (find by parent id)
application.put('/get-student-name-with-parent-id/:parent_id', async (request, response) => {
    try {
        const parent_id = request.params.parent_id
        const studentNameWithParentId = await prisma.parents.findFirst({
            where: {
                parent_id: parseInt(parent_id)
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

// get parent name & student's school address (find by student id)
application.put('/get-parent-name-school-address/:id', async (request, response) => {
    try {
        const id = request.params.id
        const studentIdWithParentNameSchoolAddress = await prisma.student.findUnique({
            where: {
                id: parseInt(id)
            },
            // table 1
            select:{
                id:true,
                // table 2
                parents: {
                    select: {
                        parent_name: true
                    }
                },
                // table 3
                school: {
                    select: {
                        school_address: true
                    }
                }
            }
        })
        response.send(studentIdWithParentNameSchoolAddress)
    } catch (error) {
        console.log(error);
    }
})

//create a new student with parent(inserting data)
application.post('/insert-student-parent', async (request, response) => {
    const insertStudentParentData = await prisma.student.create({
        data: {
            name: "Vinu",
            student_class: 3,
            parents: {
                create: {
                    parent_name: "Mithra",
                    parent_phone: 8
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