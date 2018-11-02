// cls && npx tsc --strictNullChecks --noImplicitAny index2.ts && node index2.js
// cls && npx tsc --strictNullChecks --noImplicitAny --strict index2.ts && node index2.js
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PremiumCustomer = /** @class */ (function () {
    function PremiumCustomer(id, age, name) {
        this.id = id;
        this.age = age;
        this.name = name;
        this.level = PremiumLevel.GOLD; // default is GOLD
    }
    return PremiumCustomer;
}());
var DiamondCustomer = /** @class */ (function (_super) {
    __extends(DiamondCustomer, _super);
    function DiamondCustomer(id, age, name) {
        var _this = _super.call(this, id, age, name) || this;
        _this.level = PremiumLevel.DIAMOND;
        return _this;
    }
    DiamondCustomer.prototype.doDiamondStuff = function () {
        // 
    };
    return DiamondCustomer;
}(PremiumCustomer));
var PlatinumCustomer = /** @class */ (function (_super) {
    __extends(PlatinumCustomer, _super);
    function PlatinumCustomer(id, age, name) {
        var _this = _super.call(this, id, age, name) || this;
        _this.level = PremiumLevel.PLATINUM;
        return _this;
    }
    return PlatinumCustomer;
}(PremiumCustomer));
var GoldCustomer = /** @class */ (function (_super) {
    __extends(GoldCustomer, _super);
    function GoldCustomer(id, age, name) {
        var _this = _super.call(this, id, age, name) || this;
        _this.level = PremiumLevel.GOLD;
        return _this;
    }
    GoldCustomer.prototype.doGoldStuff = function () {
        console.log("doing gold stuff for " + this.name);
    };
    return GoldCustomer;
}(PremiumCustomer));
var PremiumLevel;
(function (PremiumLevel) {
    PremiumLevel[PremiumLevel["DIAMOND"] = 0] = "DIAMOND";
    PremiumLevel[PremiumLevel["PLATINUM"] = 1] = "PLATINUM";
    PremiumLevel[PremiumLevel["GOLD"] = 2] = "GOLD";
})(PremiumLevel || (PremiumLevel = {}));
var test = function () {
    var CustomerBuilder = {
        age: 0,
        name: "",
        level: PremiumLevel.GOLD,
        getId: function () {
            var _autoId = 0;
            return function () {
                _autoId += 1;
                return _autoId;
            };
        }(),
        setAge: function (age) {
            this.age = age;
            return this;
        },
        setName: function (name) {
            this.name = name;
            return this;
        },
        setLevel: function (level) {
            this.level = level;
            return this;
        },
        build: function () {
            var customer;
            if (!this.level) {
                this.level = PremiumLevel.GOLD; // default to gold
            }
            customer = { age: this.age, name: this.name, id: this.getId(), level: this.level };
            return customer;
        }
    };
    var customerA = CustomerBuilder.setName("mary").build();
    console.log(customerA);
    customerA.doGoldStuff(); // produce run-time error!
    // compiler is not warning at all even with --strictNullChecks and --noImplicitAny, 
};
// test()
var test = function () {
    var CustomerBuilder = {
        age: 0,
        name: "",
        level: PremiumLevel.GOLD,
        getId: function () {
            var _autoId = 0;
            return function () {
                _autoId += 1;
                return _autoId;
            };
        }(),
        setAge: function (age) {
            this.age = age;
            return this;
        },
        setName: function (name) {
            this.name = name;
            return this;
        },
        setLevel: function (level) {
            this.level = level;
            return this;
        },
        build: function () {
            var customer;
            if (!this.level) {
                this.level = PremiumLevel.GOLD; // default to gold
            }
            customer = { age: this.age, name: this.name, id: this.getId(), level: this.level };
            return customer;
        }
    };
    var customerA = CustomerBuilder.setName("mary").build();
    console.log(customerA);
    if (customerA instanceof GoldCustomer) {
        customerA.doGoldStuff(); // now didn't get invoke because the type of customer A cannot be inferred as GoldCustomer
    }
};
// test()
var test = function () {
    var CustomerBuilder = {
        age: 0,
        name: "",
        level: PremiumLevel.GOLD,
        getId: function () {
            var _autoId = 0;
            return function () {
                _autoId += 1;
                return _autoId;
            };
        }(),
        setAge: function (age) {
            this.age = age;
            return this;
        },
        setName: function (name) {
            this.name = name;
            return this;
        },
        setLevel: function (level) {
            this.level = level;
            return this;
        },
        build: function () {
            var customer;
            switch (this.level) {
                case PremiumLevel.GOLD:
                    customer = new GoldCustomer(this.getId(), this.age, this.name);
                    break;
                case PremiumLevel.PLATINUM:
                    customer = new PlatinumCustomer(this.getId(), this.age, this.name);
                    break;
                case PremiumLevel.DIAMOND:
                    customer = new DiamondCustomer(this.getId(), this.age, this.name);
                    break;
                default:
                    customer = new GoldCustomer(this.getId(), this.age, this.name); // default to GOLD
                    break;
            }
            return customer;
        }
    };
    var customerA = CustomerBuilder.setName("mary").build();
    // although type still inferred as any, the instance checking will function correctly
    if (customerA instanceof GoldCustomer) {
        customerA.doGoldStuff();
    }
    // so now we're safe from run-time error, but how are we able to identify such potential error proactively?
    // use --strict compiler flag to enable ALL strict type checking opyions
};
test();
