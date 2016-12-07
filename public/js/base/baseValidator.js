/**
 * Created by yuanchen on 16-12-7.
 */
// Function.prototype.curry = function () {
//     var fn=this,
//         args=Array.prototype.slice.call(arguments);
//     return fn.apply(this,args.concat(Array.prototype.slice.call(arguments)));
// }
String.prototype.validateEmail = function () {
    var re=/^[a-zA-Z_0-9]+@[a-zA-Z_0-9]+\.[a-zA-Z_0-9]+$/;
    return re.test(this);
};