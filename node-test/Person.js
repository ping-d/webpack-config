class Person {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    getName(){
        console.log("Person: " + this.name);
    }
    getAge(){
        console.log("Person: " + this.age);
    }
}
module.exports = Person;