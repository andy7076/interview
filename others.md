## 函数柯里化
函数柯里化是一种将接受多个参数的函数转换为一系列接受单个参数的函数的过程。通过柯里化，可以创建一个接受部分参数的函数，返回一个新函数，该新函数接受剩余的参数，并且返回最终结果。柯里化的主要优势在于提高函数的复用性和灵活性。

## typeof instanceof
typeof 42;  // 返回 "number"
typeof "Hello";  // 返回 "string"
typeof true;  // 返回 "boolean"
typeof undefined;  // 返回 "undefined"
typeof {};  // 返回 "object"
typeof [];  // 返回 "object"
typeof null;  // 返回 "object"
typeof function() {};  // 返回 "function"
----------
let arr = [];
let date = new Date();

arr instanceof Array;  // 返回 true，因为 arr 是数组的实例
arr instanceof Object;  // 返回 true，因为数组也是对象的实例

date instanceof Date;  // 返回 true，因为 date 是 Date 对象的实例
date instanceof Object;  // 返回 true，因为 Date 对象也是对象的实例


## 块级格式化上下文
在 CSS 中，块级格式化上下文（Block Formatting Context，BFC）是指一个独立的渲染区域，其中的元素按照特定的规则进行布局，不受外部布局的影响。BFC 在页面布局中起着重要的作用，特别是在处理浮动、清除浮动、外边距折叠等方面。

根元素（<html>）或包含根元素的元素。
浮动（float 属性不为 none）的元素。
绝对定位元素（position 属性为 absolute 或 fixed）。
display 属性值为 inline-block, table-cell, table-caption, flex, inline-flex, grid, inline-grid 的元素。
overflow 属性值不为 visible 的元素（overflow: auto, overflow: hidden, overflow: scroll）。

## http2和http1的区别
多路复用（Multiplexing）：HTTP/2 支持多路复用，允许在同一连接上并行发送多个请求和响应，而不需要建立多个连接。这样可以显著提高性能，尤其是对于需要加载大量资源的网站。
头部压缩（Header Compression）：HTTP/2 使用 HPACK 算法对头部进行压缩，减少了头部的大小，进而降低了传输的开销。这对于减少网络流量和加快页面加载速度非常有益。
二进制协议（Binary Protocol）：HTTP/2 将数据帧以二进制格式进行传输，而不是像 HTTP/1.x 那样使用文本格式。这种二进制格式的传输更高效，且对网络传输更友好。
服务器推送（Server Push）：HTTP/2 支持服务器主动向客户端推送资源，这意味着服务器可以在客户端请求之前就主动将相关资源发送给客户端，从而加快页面加载速度。

## 介绍一下rAF(requestAnimationFrame)
requestAnimationFrame 是一个在 JavaScript 中用来优化动画效果的函数。它是浏览器提供的一个 API，用于在下一次重绘之前调用指定的函数，以确保动画效果的流畅性和性能。相比于使用 setTimeout 或 setInterval 来执行动画，requestAnimationFrame 通常能够提供更好的性能和更平滑的动画效果。

使用 requestAnimationFrame 的主要优势之一是它会自动根据浏览器的刷新频率来调整动画的帧率，从而使得动画在不同设备上表现更加一致。此外，当页面处于后台标签页或最小化状态时，requestAnimationFrame 会暂停动画，从而节省了计算资源。

## javascript 的垃圾回收机制讲一下
JavaScript的垃圾回收机制是一种自动管理内存的系统，它负责跟踪内存中哪些对象不再被程序使用，并释放它们所占用的内存空间，以便其他对象可以使用。JavaScript的垃圾回收机制主要基于两种策略：

标记-清除（Mark and Sweep）：这是JavaScript最常见的垃圾回收算法之一。它分为两个阶段：标记和清除。
标记阶段：从根部对象开始，垃圾回收器标记所有从根部对象可以访问到的对象。在JavaScript中，根部对象包括全局对象（如window对象）、当前调用栈中的局部变量和闭包等。标记过程会递归地访问和标记所有可达对象，以确保没有被引用的对象不会被漏掉。
清除阶段：垃圾回收器会遍历整个堆（即所有对象组成的集合），将未标记的对象视为垃圾，并将它们释放回收的内存空间。这样，内存中就只剩下被标记的对象，它们仍然在程序中被引用着。

引用计数（Reference Counting）：在这种策略中，每个对象都会有一个引用计数，表示有多少个引用指向它。当对象被创建时，引用计数初始化为1。当有新的引用指向该对象时，引用计数加1；反之，当引用失效或被重写时，引用计数减1。当引用计数为0时，说明该对象不再被引用，可以被安全地回收。

然而，引用计数有一个很明显的缺点，就是无法处理循环引用。如果两个或多个对象相互引用，它们的引用计数永远不会为0，即使它们已经不再被程序所使用，这将导致内存泄漏。

大多数现代JavaScript引擎（如V8、SpiderMonkey、JavaScriptCore等）都采用标记-清除算法作为主要的垃圾回收策略，并结合其他技术来解决引用计数无法处理的问题，以提高内存管理的效率和性能。