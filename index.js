// 最长回文子串
var longestPalindrome = function(s) {
  const convertStrs = ['^', '#', ...s.split('').join('#') ,'#','$']
  const convertStr = convertStrs.join('')
  let resLen = 0
  let middleIndex = 0
  for(let i = 1 ; i < convertStrs.length - 1; i ++) {
      let curLen = 0
      while(convertStrs[i - curLen - 1] === convertStrs[i + curLen + 1]) {
          curLen ++
      }
      if(curLen > resLen) {
        resLen = curLen
        middleIndex = i
      }
  }
  const res = convertStr.slice(middleIndex - resLen , middleIndex + resLen + 1).split('').filter(item => item != '#').join('')
  return res
};

console.log(longestPalindrome('cbbd'))