// cls && npx tsc --strictNullChecks --noImplicitAny index2.ts && node index2.js
// cls && npx tsc --strictNullChecks --noImplicitAny --strict index2.ts && node index2.js

interface Customer {
    id:number
    age?:number
    name:string
    level:PremiumLevel 
}

class PremiumCustomer implements Customer {
    constructor(id:number, age:number, name:string) {
        this.id = id
        this.age = age
        this.name = name
        this.level = PremiumLevel.GOLD // default is GOLD
    }

    id:number
    age?:number
    name:string
    level:PremiumLevel 
}

class DiamondCustomer extends PremiumCustomer {
    constructor(id:number, age:number, name:string) {
        super(id, age, name)
        this.level = PremiumLevel.DIAMOND
    }
    level:PremiumLevel.DIAMOND
    doDiamondStuff() {
        // 
    }
}

class PlatinumCustomer extends PremiumCustomer {
    constructor(id:number, age:number, name:string) {
        super(id, age, name)
        this.level = PremiumLevel.PLATINUM
    }
    level:PremiumLevel.PLATINUM
}

class GoldCustomer extends PremiumCustomer {
    constructor(id:number, age:number, name:string) {
        super(id, age, name)
        this.level = PremiumLevel.GOLD
    }
    level:PremiumLevel.GOLD
    doGoldStuff() {
        console.log("doing gold stuff for " + this.name)
    }
}

enum PremiumLevel {DIAMOND, PLATINUM, GOLD}

var test = function() {
    let CustomerBuilder = {
        age: 0,
        name: "",
        level: PremiumLevel.GOLD,
        getId: function() {
            var _autoId = 0
            return function() {
                _autoId += 1
                return _autoId
            }
        }(),
        setAge: function(age:number) {
            this.age = age
            return this
        },
        setName: function(name:string) {
            this.name = name
            return this
        },
        setLevel: function(level:PremiumLevel) {
            this.level = level
            return this
        },
        build: function() {
            let customer
            if (!this.level) {
                this.level = PremiumLevel.GOLD // default to gold
            }
            customer = {age:this.age, name:this.name, id:this.getId(), level:this.level}
            return customer
        }
    }
    
    let customerA = CustomerBuilder.setName("mary").build()
    console.log(customerA)
    customerA.doGoldStuff() // produce run-time error!
    // compiler is not warning at all even with --strictNullChecks and --noImplicitAny, 
}
// test()

var test = function() {
    let CustomerBuilder = {
        age: 0,
        name: "",
        level: PremiumLevel.GOLD,
        getId: function() {
            var _autoId = 0
            return function() {
                _autoId += 1
                return _autoId
            }
        }(),
        setAge: function(age:number) {
            this.age = age
            return this
        },
        setName: function(name:string) {
            this.name = name
            return this
        },
        setLevel: function(level:PremiumLevel) {
            this.level = level
            return this
        },
        build: function() {
            let customer
            if (!this.level) {
                this.level = PremiumLevel.GOLD // default to gold
            }
            customer = {age:this.age, name:this.name, id:this.getId(), level:this.level}
            return customer
        }
    }

    let customerA = CustomerBuilder.setName("mary").build()
    console.log(customerA)
    if (customerA instanceof GoldCustomer) {
        customerA.doGoldStuff() // now didn't get invoke because the type of customer A cannot be inferred as GoldCustomer
    }
}
// test()

var test = function() {
    let CustomerBuilder = {
        age: 0,
        name: "",
        level: PremiumLevel.GOLD,
        getId: function() {
            var _autoId = 0
            return function() {
                _autoId += 1
                return _autoId
            }
        }(),
        setAge: function(age:number) {
            this.age = age
            return this
        },
        setName: function(name:string) {
            this.name = name
            return this
        },
        setLevel: function(level:PremiumLevel) {
            this.level = level
            return this
        },
        build: function() {
            let customer
            switch(this.level) {
                case PremiumLevel.GOLD:
                    customer = new GoldCustomer(this.getId(), this.age, this.name)
                    break
                case PremiumLevel.PLATINUM:
                    customer = new PlatinumCustomer(this.getId(), this.age, this.name)
                    break
                case PremiumLevel.DIAMOND:
                    customer = new DiamondCustomer(this.getId(), this.age, this.name)
                    break
                default:
                    customer = new GoldCustomer(this.getId(), this.age, this.name) // default to GOLD
                    break
            }
            return customer
        }
    }

    let customerA:Customer = CustomerBuilder.setName("mary").build()
    // although type still inferred as any, the instance checking will function correctly
    if (customerA instanceof GoldCustomer) { 
        customerA.doGoldStuff() 
    }
    // so now we're safe from run-time error, but how are we able to identify such potential error proactively?
    // use --strict compiler flag to enable ALL strict type checking opyions
}
test()