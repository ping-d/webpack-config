const  Person  = require( './Person')

class Student extends Person{
    constructor(name,age){
        super(name,age);
        console.log(age);
    }
    getName(){
        console.log("Student: "+ this.name);
    }
    getAge(){
        console.log("Student: " + this.age);
    }
}
module.exports = Student;