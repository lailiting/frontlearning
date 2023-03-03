function stack(){
    this.size = 0
    this.stroage = {}
}

stack.prototype.push = function(value){
    this.stroage[this.size] = value
    this.size++
}

stack.prototype.pop = function(){
    if(this.size){
        let deletedata = this.stroage[this.size]
        delete this.stroage[this.size]
        this.size--
        return deletedata
    }
}

let a = new stack()
a.push(33)
a.pop()
console.log(a)

function queen(){
    this.start = 0
    this.end = 0
    this.stroage = {}
}
queen.prototype.size = function(){
    return this.end - this.start
}
queen.prototype.enter = function(value){
    this.stroage[this.end] = value
    this.end++
}

queen.prototype.leave = function(){
    if(this.start !== this.end){
        let deletedata = this.stroage[this.start]
        delete this.stroage[this.start]
        this.start++
        return deletedata
    }
}
