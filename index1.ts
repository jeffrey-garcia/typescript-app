// cls && npx tsc --strictNullChecks index1.ts && node index1.js

var test = function() {
    interface User {
        age:number
        name:string
    }
    
    // compiler cannot catch that name attribute is not set even with --strictNullChecks 
    let user:any = { age:12 } 
    console.log(user.age > 10)
    console.log(user.name.toLowerCase() == "jeff")     
}
// test()

var test = function() {
    interface User {
        age:number
        name:string
    }
    
    // compiler cannot catch that name attribute is not set even with --strictNullChecks 
    let user:User = Object.create({}, { age: {value:12} } )
    console.log(user.age > 10)
    console.log(user.name.toLowerCase() == "jeff") 
}
// test()

var test = function() {
    interface User {
        age:number
        name?:string // now we indicate name field is an optional 
    }
    
    // compiler --strictNullChecks will be able to remind that name attribute is possibly null
    let user:User = Object.create( { age:12 } )
    console.log(user.age > 10)
    console.log(user.name.toLowerCase() == "jeff")
}
// test()

var test = function() {
    interface User {
        age:number
        name?:string // now we indicate name field is an optional 
    }
    
    // compiler --strictNullChecks will be able to remind that name attribute is possibly null
    let user:User = Object.create( { age:12 } )
    console.log(user.age > 10)
    if (user.name != null) {
        console.log(user.name.toLowerCase() == "jeff")
    }
}
test()