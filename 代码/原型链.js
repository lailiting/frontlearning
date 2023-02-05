const Person = function(){
    this.name = "1"
}

const xiaoming = new Person()

console.log(xiaoming.__proto__)
console.log(Person.prototype)

console.log(xiaoming.__proto__ === Person.prototype)

console.log(xiaoming.constructer)