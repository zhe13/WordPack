// 著作权归作者所有。
// 商业转载请联系作者获得授权，非商业转载请注明出处。
// 作者：沈嵘
// 链接：http://www.zhihu.com/question/19878052/answer/44984636
// 来源：知乎

var even = function (num) {
   return (num === 0) || !(even(num - 1))
}

console.log(even(0),even(1));

var then = even;
console.log(then(0),then(1));

even = function(){return false;}
