const Twister = require("./mersenne-twister.js");
const bigintCryptoUtils = require("bigint-crypto-utils");
const { LinkedList } = require("./linkedlist.js");

class HashMap {
    // The largest prime number less than 2^44
    static MAX_CAPACITY = 17592186044399;

    #capacity = 16;
    #loadFactor = 0.75;
    #buckets;
    #size;

    static hash(key) {
        /*
            Generate a seed for the Mersenne Twister PRNG
            from the given key. 
            
            Use this seed to generate one new random number,
            which will serve as our hash.
        */

        const p = 251; // The largest prime number less than 2^8

        let hashCode = 0;
        for (let i = 0; i < key.length; i++) {
            /**
             * Since p < 2^8, h < 2^44, and c < 2^16
             * ph + c < 2^53-1, resulting in no integer overflows.
             */
            const c = key.charCodeAt(i);
            hashCode = p * hashCode + c;
            hashCode %= this.MAX_CAPACITY;
        }

        return hashCode;
    }

    constructor(capacity = 16, loadFactor = 0.75) {
        if (capacity > HashMap.MAX_CAPACITY) {
            throw new RangeError(
                `Cannot have a capacity greater than ${HashMap.MAX_CAPACITY}.`
            );
        }

        if (loadFactor >= 1 || loadFactor <= 0) {
            throw new RangeError(
                "Load factor must fall in the interval (0, 1)."
            );
        }

        this.#capacity = capacity;
        this.#loadFactor = loadFactor;
        this.#buckets = [];
        this.#size = 0;

        for (let i = 0; i < capacity; i++) {
            this.#buckets.push(new LinkedList());
        }
    }

    #keyToIndex(key) {
        const keyhash = HashMap.hash(key);
        const i = keyhash % this.#capacity;

        return i;
    }

    set(key, value) {
        const i = this.#keyToIndex(key);
        const ll = this.#buckets[i];

        ll.append(value);

        const shouldGrow = this.#size >= this.#loadFactor * this.#capacity;
        if (shouldGrow) {
            const newNodes = this.#capacity;
            for (let i = 0; i < newNodes; i++) {
                this.#buckets.push(new LinkedList());
            }
            this.#capacity *= 2;
        }
    }

    get(key) {
        const i = this.#keyToIndex(key);
        const ll = this.#buckets[i];

        if (ll.size() === 0) {
            return null;
        }

        return ll.tail().value;
    }
}

module.exports = HashMap;
