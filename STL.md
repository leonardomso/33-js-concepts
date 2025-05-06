# JavaScript Standard Template Library (STL) Overview

This README provides an overview of the core data structures and methods available in JavaScript that are commonly used for various programming tasks. While JavaScript does not have a dedicated Standard Template Library (STL) like C++, it provides several built-in objects that can be used similarly.

## 1. Arrays

### Description
Arrays are used to store multiple values in a single variable.

### Key Methods
- **Creation**
  - `let arr = [];` // empty array
  - `let arr = [1, 2, 3];` // array with elements
- **Common Methods**
  - `arr.push(element)` - Adds an element to the end of the array.
  - `arr.pop()` - Removes the last element from the array.
  - `arr.shift()` - Removes the first element from the array.
  - `arr.unshift(element)` - Adds an element to the beginning of the array.
  - `arr.slice(start, end)` - Returns a shallow copy of a portion of an array.
  - `arr.map(callback)` - Creates a new array with the results of calling a provided function on every element.
  - `arr.filter(callback)` - Creates a new array with all elements that pass the test implemented by the provided function.
  - `arr.reduce(callback, initialValue)` - Executes a reducer function on each element of the array, resulting in a single output value.

## 2. Objects

### Description
Objects are collections of key-value pairs and can represent complex data structures.

### Key Methods
- **Creation**
  - `let obj = {};` // empty object
  - `let obj = { key: 'value' };` // object with properties
- **Common Methods**
  - `Object.keys(obj)` - Returns an array of a given object's own property names.
  - `Object.values(obj)` - Returns an array of a given object's own enumerable property values.
  - `Object.entries(obj)` - Returns an array of a given object's own enumerable string-keyed property [key, value] pairs.
  - `Object.assign(target, ...sources)` - Copies the values of all enumerable own properties from one or more source objects to a target object.

## 3. Sets

### Description
Sets are collections of values where each value must be unique.

### Key Methods
- **Creation**
  - `let mySet = new Set();`
  - `let mySet = new Set([1, 2, 3]);`
- **Common Methods**
  - `mySet.add(value)` - Adds a new element to the Set.
  - `mySet.delete(value)` - Removes an element from the Set.
  - `mySet.has(value)` - Returns a boolean indicating whether an element is present.
  - `mySet.clear()` - Removes all elements from the Set.
  - `mySet.size` - Returns the number of elements in the Set.

## 4. Maps

### Description
Maps are collections of keyed data items, where keys can be of any type.

### Key Methods
- **Creation**
  - `let myMap = new Map();`
  - `let myMap = new Map([['key1', 'value1'], ['key2', 'value2']]);`
- **Common Methods**
  - `myMap.set(key, value)` - Adds a new element with a specified key and value.
  - `myMap.get(key)` - Returns the value associated with the specified key.
  - `myMap.delete(key)` - Removes the specified key and its associated value.
  - `myMap.has(key)` - Returns a boolean indicating whether the specified key exists.
  - `myMap.clear()` - Removes all elements from the Map.
  - `myMap.size` - Returns the number of key-value pairs in the Map.

## 5. WeakSets

### Description
WeakSets are collections of objects, where each object is held weakly (i.e., garbage collected if there are no other references).

### Key Methods
- **Creation**
  - `let myWeakSet = new WeakSet();`
- **Common Methods**
  - `myWeakSet.add(value)` - Adds an object to the WeakSet.
  - `myWeakSet.delete(value)` - Removes an object from the WeakSet.
  - `myWeakSet.has(value)` - Returns a boolean indicating whether the object is in the WeakSet.

## 6. WeakMaps

### Description
WeakMaps are collections of key-value pairs, where keys are held weakly.

### Key Methods
- **Creation**
  - `let myWeakMap = new WeakMap();`
- **Common Methods**
  - `myWeakMap.set(key, value)` - Sets the value for the key in the WeakMap.
  - `myWeakMap.get(key)` - Returns the value associated with the key.
  - `myWeakMap.delete(key)` - Removes the key and its associated value.
  - `myWeakMap.has(key)` - Returns a boolean indicating whether the key exists.

## Conclusion

This document outlines the fundamental data structures and methods available in JavaScript, which provide similar functionality to the Standard Template Library (STL) found in other programming languages. These built-in objects can be utilized for a wide range of programming tasks, making JavaScript a versatile and powerful language for web development.
