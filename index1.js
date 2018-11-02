// cls && npx tsc --strictNullChecks index1.ts && node index1.js
var test = function () {
    // compiler cannot catch that name attribute is not set even with --strictNullChecks 
    var user = { age: 12 };
    console.log(user.age > 10);
    console.log(user.name.toLowerCase() == "jeff");
};
// test()
var test = function () {
    // compiler cannot catch that name attribute is not set even with --strictNullChecks 
    var user = Object.create({}, { age: { value: 12 } });
    console.log(user.age > 10);
    console.log(user.name.toLowerCase() == "jeff");
};
// test()
var test = function () {
    // compiler --strictNullChecks will be able to remind that name attribute is possibly null
    var user = Object.create({ age: 12 });
    console.log(user.age > 10);
    console.log(user.name.toLowerCase() == "jeff");
};
// test()
var test = function () {
    // compiler --strictNullChecks will be able to remind that name attribute is possibly null
    var user = Object.create({ age: 12 });
    console.log(user.age > 10);
    if (user.name != null) {
        console.log(user.name.toLowerCase() == "jeff");
    }
};
test();
