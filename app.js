const HashMap = require("./HashMap.js");

const arrayToStr = (arr) => {
    arr = arr.map((subarr) => {
        if (Array.isArray(subarr)) {
            return arrayToStr(subarr);
        }
        return subarr;
    });

    return `[${arr.join(", ")}]`;
};

function testHashMap() {
    const hm = new HashMap();

    console.log("Setting key 'test' to value: 7");
    hm.set("test", 7);

    console.log("Setting key 'test' to value: 8");
    hm.set("test", 8);

    console.log("Setting key 'test2' to value: 5");
    hm.set("test2", 5);

    console.log("Setting key 'test3' to value: -100");
    hm.set("test3", -100);

    console.log(`Value at key 'test': ${hm.get("test")}`);
    console.log(`Value at key 'test2': ${hm.get("test2")}`);
    console.log(`Value at key 'test3': ${hm.get("test3")}`);

    console.log(`Does the hash map have key 'test': ${hm.has("test")}`);
    console.log(`Does the hash map have key 'test2': ${hm.has("test2")}`);
    console.log(`Does the hash map have key 'test3': ${hm.has("test3")}`);
    console.log(`Does the hash map have key 'test3': ${hm.has("test4")}`);

    console.log(`Size of hash map: ${hm.length()}`);
    console.log(`Capacity of hash map: ${hm.capacity}`);
    console.log(`Keys: ${arrayToStr(hm.keys())}`);
    console.log(`Values: ${arrayToStr(hm.values())}`);
    console.log(`Entries: ${arrayToStr(hm.entries())}`);

    console.log(`\n\nRemoving key 'test'`);
    hm.remove("test");

    console.log(`Value at key 'test': ${hm.get("test")}`);
    console.log(`Value at key 'test2': ${hm.get("test2")}`);
    console.log(`Value at key 'test3': ${hm.get("test3")}`);

    console.log(`Does the hash map have key 'test': ${hm.has("test")}`);
    console.log(`Does the hash map have key 'test2': ${hm.has("test2")}`);
    console.log(`Does the hash map have key 'test3': ${hm.has("test3")}`);
    console.log(`Does the hash map have key 'test3': ${hm.has("test4")}`);

    console.log("\n\nSetting a bunch of keys...");
    hm.set("apple", "red");
    hm.set("banana", "yellow");
    hm.set("carrot", "orange");
    hm.set("dog", "brown");
    hm.set("elephant", "gray");
    hm.set("frog", "green");
    hm.set("grape", "purple");
    hm.set("hat", "black");
    hm.set("ice cream", "white");
    hm.set("jacket", "blue");
    hm.set("kite", "pink");
    hm.set("lion", "golden");

    console.log(`Size of hash map: ${hm.length()}`);
    console.log(`Capacity of hash map: ${hm.capacity}`);
    console.log(`Keys: ${arrayToStr(hm.keys())}`);
    console.log(`Values: ${arrayToStr(hm.values())}`);
    console.log(`Entries: ${arrayToStr(hm.entries())}`);
}

testHashMap();
