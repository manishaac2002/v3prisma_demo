const express = require ('express')
const application = express()
const {PrismaClient}= require('@prisma/client')

const prisma = new PrismaClient()


application.use (express.json())

application.get('/',async (request,response)=>{
const allStudentDetails = await prisma.student.findMany()
response.send("Getting all Student Details")
})

application.post('/create-student',async (request,response)=>{
const createNewStudent = await prisma.student.create({data:request.body})
console.log(request.body);
response.send("New Student created")
})

application.put('/:student_class',(request,response)=>{
   try {
    const student_class =request.params.student_class
    const name =request.body.name
    response.send(name);
   } catch (error) {
    
   }
})

const port = 6000
application.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})