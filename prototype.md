## 原型
在JavaScript中，每个对象都有一个原型（prototype），原型又是一个对象，而这个对象又有自己的原型，形成了一个链式结构，即原型链。

原型链的作用主要体现在两个方面：

实现继承： JavaScript中的继承是通过原型链来实现的。当你创建一个对象时，它会从它的原型中继承属性和方法。如果在当前对象中找不到所需的属性或方法，JavaScript引擎会沿着原型链向上查找，直到找到为止。这意味着你可以在一个对象的原型中定义一些通用的方法和属性，然后它的所有子对象都可以共享这些方法和属性，从而实现代码的复用。
属性查找： 当你试图访问一个对象的属性时，JavaScript引擎会首先在该对象本身的属性中查找，如果找不到，它会沿着原型链向上查找，直到找到属性或者查找到原型链的顶端（Object.prototype）为止。这种属性查找的方式使得JavaScript具有动态性和灵活性，你可以在运行时动态地修改对象的原型，从而影响到所有基于该原型的对象。
总的来说，原型链在JavaScript中起到了连接对象之间的继承关系和属性查找的作用，是JavaScript面向对象编程中的核心概念之一。

test.__proto__ = Test.prototype
Test.prototype.__proto__ = Object.prototype
Object.prototype.__proto__ = null

Test.__proto__ = Function.prototype
Function.__proto__ = Function.prototype

const obj = new Obj()
Object.__proto__ = Function.prototype

Object.__proto__ = Function.__proto__

## new一个对象的时候做了什么
同下

## 写一个new
在 JavaScript 中，可以模拟实现 new 操作符的功能，实现过程如下：

创建一个新的空对象。
将这个空对象的原型指向构造函数的原型对象。
将构造函数的执行上下文绑定到新创建的对象上，并执行构造函数。
如果构造函数有返回值且返回的是一个对象，则返回该对象；否则，返回新创建的对象。

function myNew(constructor, ...args) {
    // 创建一个新的空对象，并将该对象的原型指向构造函数的原型对象
    let obj = Object.create(constructor.prototype);
    // 将构造函数的执行上下文绑定到新创建的对象上，并执行构造函数
    let result = constructor.apply(obj, args);
    // 如果构造函数有返回值且返回的是一个对象，则返回该对象；否则，返回新创建的对象
    return (typeof result === 'object' && result !== null) ? result : obj;
}

// 示例
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayHello = function() {
    console.log(`Hello, I'm ${this.name}, ${this.age} years old.`);
};

let john = myNew(Person, 'John', 30);
john.sayHello(); // 输出：Hello, I'm John, 30 years old.