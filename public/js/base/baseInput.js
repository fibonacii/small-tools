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

function baseInput() {
    var public_key='-----BEGIN PUBLIC KEY-----' +
        '\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3OMhJHP4wlMsVVIZ5VykQr+PK' +
        '\nPcPeHL/EHl+fwOI7rQbaYk2ES+ptCfCXSHIf6B72JxhX9Cxb8IYeyU7ENgdsj1AB' +
        '\n8hs93Y2zyhHqQz/kuIxAnSUfUIfoqDGEyhafNqT/Q2gTVCTiHn7vZNj6ATvMlkyB' +
        '\n0yLod1q3NfnhDx89UwIDAQAB' +
        '\n-----END PUBLIC KEY-----';

    return{
        rsaGenerate: (word)=>{
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(public_key);
            return encrypt.encrypt(word);
        }
    }
}
