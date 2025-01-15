const HashMap = require("./HashMap.js");

function testHashMap() {
    const hm = new HashMap();

    console.log("Setting key 'test' to value: 7");
    hm.set("test", 7);

    console.log("Setting key 'test' to value: 8");
    hm.set("test", 8);

    console.log("Setting key 'test2' to value: 5");
    hm.set("test2", 5);

    console.log(`Value at key 'test': ${hm.get("test")}`);
    console.log(`Value at key 'test2': ${hm.get("test2")}`);
}

testHashMap();
