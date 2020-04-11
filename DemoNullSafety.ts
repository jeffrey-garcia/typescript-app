const testCase1 = function() {
    interface User {
        age:number;
        name:string;
    }
    
    // name attribute is not set as optional
    // compiler cannot catch that name attribute is not set even with --strictNullChecks 
    let user:any = { age:12 } ;
    console.log(user.age > 10);
    console.log(user.name.toLowerCase()); // produce run-time error   
};
testCase1();

const testCase2 = function() {
    interface User {
        age:number;
        name:string;
    }
    
    // name attribute is not set as optional
    // compiler cannot catch that name attribute is not set even with --strictNullChecks 
    let user:User = Object.create({}, { age: {value:12} } );
    console.log(user.age > 10);
    console.log(user.name.toLowerCase()); // produce run-time error   
}
testCase2();

const testCase3 = function() {
    interface User {
        age:number;
        name?:string; // now we indicate name field is an optional 
    }
    
    // compiler --strictNullChecks now be able to remind that name attribute is possibly null
    let user:User = Object.create( { age:12 } );
    console.log(user.age > 10);
    console.log(user.name.toLowerCase()); // produce compile-time error instead of run-time error
}
testCase3();

const testCase4 = function() { 
    interface User {
        age:number;
        name?:string; // now we indicate name field is an optional 
    }

    // compiler --strictNullChecks will be able to remind that name attribute is possibly null
    let user:User = Object.create( { age:12 } );
    console.log(user.age > 10);

    if (user.name != null) { // putting a null check avoids compile-time error
        console.log(user.name.toLowerCase());
    }

    // use optional chaining can also avoids compile-time error
    console.log(user.name?.toLowerCase());

    // use ternary operator to avoid compile-time error
    console.log(user.name? user.name!.toLowerCase() : `user.name is not defined`);
}
testCase4();