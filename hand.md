## es5实现继承
// function P(name) {
//   this.name = name
// }

// P.type = 'type'

// P.sleep = function() {
//   console.log('sleep', this.type)
// }

// P.prototype.say = function() {
//   console.log('say', this.name)
// }

// function S(name, age) {
//   P.call(this, name)
//   this.age = age;
// }

// S.prototype = Object.create(P.prototype)
// S.prototype.constructor = S

// Object.keys(P).forEach(function(key) {
//   S[key] = P[key]
// })

// const s = new S('zhangsan', 78)
// console.log(s.name)
// console.log(s.age)
// console.log(s.say())
// S.type = 'type1'
// console.log(S.sleep())

## 接雨水
<!-- 1、设置左右指针，维护左右当前最高高度，维护目前所接雨水总量
2、如果左最高高度大于右最高高度，则将当前左指针位置能接雨水量（lmax-height[left]）计入总容量，然后左指针右移一位；否则计算右指针位置能接雨水量
3、当left>right时停止，返回结果 -->
var trap = function(height) {
  let res = 0,left = 0,right = height.length - 1,lmax = 0,rmax = 0
  while(left <= right){
      lmax = Math.max(lmax,height[left])
      rmax = Math.max(rmax,height[right])
      if(lmax < rmax){
          res = res + (lmax - height[left])
          left++
      }else{
          res = res + (rmax - height[right])
          right--
      }
  }
  return res
}

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))

## 冒泡排序
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        // 标记是否发生了交换，如果某趟遍历中没有发生交换，则序列已经有序，可提前结束排序
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 如果前一个元素大于后一个元素，则交换它们的位置
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        // 如果某趟遍历中没有发生交换，则序列已经有序，可提前结束排序
        if (!swapped) {
            break;
        }
    }
    return arr;
}

## 最长递增子串
// function foo(arr) {
//   if (arr.length === 1) {
//     return 1
//   }
//   let len = 1, maxLen = 1
//   for (i = 1; i < arr.length; i++) {
//     if (arr[i] > arr[i - 1]) {
//       len++
//       maxLen = Math.max(len, maxLen)
//     } else {
//       len = 1
//     }
//   }
//   return maxLen
// }

// console.log(foo([3, 1, 2, 5, 4]))

## 最长不重复子串
// function lengthOfLongestSubstring(s) {
//   let map = new Map();
//   let maxLen = 0, start = 0;
//   for (let i = 0; i < s.length; i++) {
//       if (map.has(s[i])) {
//           start = Math.max(start, map.get(s[i]) + 1);
//       }
//       map.set(s[i], i);
//       maxLen = Math.max(maxLen, i - start + 1);
//   }
//   return maxLen;
// }


// console.log(lengthOfLongestSubstring([3, 1, 2, 3, 4]))
// map     maxLen   start
// [3, 0]  1         0
// [1, 1]  2         0
// [2, 2]  3         0
// [3, 3]  3         1
// [4, 4]  4         1

## 最长回文子串：
// function longestPalindrome(s) {
//   let start = 0, maxLength = 0;
  
//   function expandAroundCenter(left, right) {
//       while (left >= 0 && right < s.length && s[left] === s[right]) {
//           if (right - left + 1 > maxLength) {
//               start = left;
//               maxLength = right - left + 1;
//           }
//           left--;
//           right++;
//       }
//   }
  
//   for (let i = 0; i < s.length; i++) {
//       expandAroundCenter(i, i); // 单字符为中心的情况
//       expandAroundCenter(i, i + 1); // 双字符为中心的情况
//   }
  
//   return s.substring(start, start + maxLength);
// }
