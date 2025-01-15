const Twister = require("./mersenne-twister.js");
const bigintCryptoUtils = require("bigint-crypto-utils");
const { LinkedList } = require("./linkedlist.js");

class KVPair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class HashMap {
    // The largest prime number less than 2^44
    static MAX_CAPACITY = 17592186044399;

    #capacity = 16;
    #loadFactor = 0.75;
    #keys = [];
    #buckets = [];
    #size = 0;

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

        for (let i = 0; i < capacity; i++) {
            const ll = new LinkedList();
            ll.append([]);
            this.#buckets.push(ll);
        }
    }

    #keyToIndex(key) {
        const keyhash = HashMap.hash(key);
        const i = keyhash % this.#capacity;

        return i;
    }

    #resize() {
        // Doubles the capacity and number of buckets
        const newNodes = this.#capacity;
        for (let i = 0; i < newNodes; i++) {
            const ll = new LinkedList();
            ll.append([]);
            this.#buckets.push(ll);
        }
        this.#capacity *= 2;
    }

    set(key, value) {
        const i = this.#keyToIndex(key);
        const ll = this.#buckets[i];
        const keys = ll.head().value;

        const keyIdx = keys.findIndex((k) => {
            return k === key;
        });

        if (keyIdx !== -1) {
            const llIdx = keyIdx + 1;
            const node = ll.at(llIdx);
            node.value = value;
        } else {
            keys.push(key);
            ll.append(value);
            this.#size++;
        }

        // Resize buckets
        const shouldGrow = this.#size >= this.#loadFactor * this.#capacity;
        if (shouldGrow) {
            this.#resize();
        }
    }

    get(key) {
        const i = this.#keyToIndex(key);
        const ll = this.#buckets[i];
        const keys = ll.head().value;

        const keyIdx = keys.findIndex((k) => {
            return k === key;
        });

        if (keyIdx !== -1) {
            const llIdx = keyIdx + 1;
            const node = ll.at(llIdx);
            return node.value;
        }

        return null;
    }

    has(key) {
        const i = this.#keyToIndex(key);
        const ll = this.#buckets[i];
        const keys = ll.head().value;

        return keys.includes(key);
    }

    remove(key) {
        const i = this.#keyToIndex(key);
        const ll = this.#buckets[i];
        const keys = ll.head().value;

        const keyIdx = keys.findIndex((k) => {
            return k === key;
        });

        if (keyIdx === -1) {
            return false;
        }

        const llIdx = keyIdx + 1;
        keys.splice(keyIdx, 1);
        ll.removeAt(llIdx);
        this.#size--;
        return true;
    }

    length() {
        return this.#size;
    }

    clear() {
        for (let i = 0; i < capacity; i++) {
            const ll = new LinkedList();
            ll.append([]);
            this.#buckets[i] = ll;
        }
    }

    keys() {
        const allKeys = [];
        for (let i = 0; i < this.#capacity; i++) {
            const currentKeys = this.#buckets[i].head().value;
            allKeys.push(...currentKeys);
        }
        return allKeys;
    }

    values() {
        const allValues = [];
        for (let i = 0; i < this.#capacity; i++) {
            if (this.#buckets[i].size() > 1) {
                let node = this.#buckets[i].at(1);
                while (node !== null) {
                    allValues.push(node.value);
                    node = node.nextNode;
                }
            }
        }

        return allValues;
    }
}

module.exports = HashMap;
