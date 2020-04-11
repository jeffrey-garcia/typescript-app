export interface Customer {
    id:number;
    age?:number;
    name:string;
    level:PremiumLevel;
}

export enum PremiumLevel {
    DIAMOND,
    PLATINUM,
    GOLD
}

export const CustomerBuilder = function() {
    return {
        age: 0,
        name: "",
        level: PremiumLevel.DIAMOND,
        getId: function() {
            var _autoId = 0;
            return function() {
                _autoId += 1;
                return _autoId;
            };
        }(),
        setAge: function(age:number) {
            this.age = age;
            return this;
        },
        setName: function(name:string) {
            this.name = name;
            return this;
        },
        setLevel: function(level:PremiumLevel) {
            this.level = level;
            return this;
        },
        build: function() {
            let customer;
            if (!this.level) {
                this.level = PremiumLevel.GOLD; // default to gold
            }
            customer = {age:this.age, name:this.name, id:this.getId(), level:this.level}
            return customer;
        }
    }
}();

class PremiumCustomer implements Customer {
    constructor(id:number, age:number, name:string) {
        this.id = id;
        this.age = age;
        this.name = name;
        this.level = PremiumLevel.GOLD; // default is GOLD
    }

    id:number;
    age?:number;
    name:string;
    level:PremiumLevel;
}

class DiamondCustomer extends PremiumCustomer {
    constructor(id:number, age:number, name:string) {
        super(id, age, name);
        this.level = PremiumLevel.DIAMOND;
    }
    level:PremiumLevel.DIAMOND;
    doDiamondStuff() {
        console.log("doing gold stuff for " + this.name);
    }
}

class PlatinumCustomer extends PremiumCustomer {
    constructor(id:number, age:number, name:string) {
        super(id, age, name);
        this.level = PremiumLevel.PLATINUM;
    }
    level:PremiumLevel.PLATINUM;
}

class GoldCustomer extends PremiumCustomer {
    constructor(id:number, age:number, name:string) {
        super(id, age, name);
        this.level = PremiumLevel.GOLD;
    }
    level:PremiumLevel.GOLD;
    doGoldStuff() {
        console.log("doing gold stuff for " + this.name);
    }
}

const testCase1 = function() {
    let customer = CustomerBuilder.setName("John Doe").build();
    console.log(customer);
    // customer.doGoldStuff(); // produce run-time error!
    // compiler is not warning at all even with --strictNullChecks and --noImplicitAny, except with --strict
}
testCase1();

const testCase2 = function() {
    let customer = CustomerBuilder.setName("John Doe").build()
    console.log(customer)
    if (customer instanceof GoldCustomer) {
        // now didn't get invoke because the type of customer A cannot be inferred as GoldCustomer
        customer.doGoldStuff();
    }
}
testCase2();

const testCase3 = function() {
    let customer:Customer = CustomerBuilder.setName("John Doe").build()
    // although type still inferred as any, the instance checking will function correctly
    if (customer instanceof GoldCustomer) { 
        customer.doGoldStuff() ;
    }
    // so now we're safe from run-time error, but how are we able to identify such potential error proactively?
    // use --strict compiler flag to enable ALL strict type checking opyions
}
testCase3();