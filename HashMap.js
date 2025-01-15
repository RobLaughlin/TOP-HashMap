const Twister = require("./mersenne-twister.js");
const bigintCryptoUtils = require("bigint-crypto-utils");

class HashMap {
    // Largest prime number less than 2^51
    static MAX_CAPACITY = 2251799813685119;

    // Largest prime number less than 2^25
    static PRIME = 33554393;

    #capacity = 16;
    #loadFactor = 0.75;

    static hash(key) {
        /*
            Generate a seed for the Mersenne Twister PRNG
            from the given key. 
            
            Use this seed to generate one new random number,
            which will serve as our hash.
        */

        let hashCode = BigInt(1);
        for (let i = 0; i < key.length - 1; i++) {
            const c = key.charCodeAt(i);
            hashCode *= bigintCryptoUtils.modPow(
                BigInt(c),
                BigInt(i + 1),
                BigInt(HashMap.PRIME)
            );
            hashCode = hashCode % BigInt(HashMap.PRIME);
        }

        hashCode *= bigintCryptoUtils.modPow(
            BigInt(key.charCodeAt(key.length - 1)),
            BigInt(key.length),
            BigInt(HashMap.MAX_CAPACITY)
        );

        const seed = Number(hashCode);
        const t = new Twister(seed);
        return Math.floor(t.random() * HashMap.MAX_CAPACITY);
    }

    constructor(capacity = 16, loadFactor = 0.75) {
        if (capacity > MAX_CAPACITY) {
            throw new RangeError(
                `Cannot have a capacity greater than ${MAX_CAPACITY}.`
            );
        }

        if (loadFactor >= 1 || loadFactor <= 0) {
            throw new RangeError(
                "Load factor must fall in the interval (0, 1)."
            );
        }

        this.#capacity = capacity;
        this.#loadFactor = loadFactor;
    }
}
