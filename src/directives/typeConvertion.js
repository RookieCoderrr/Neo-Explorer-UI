import BigNumber from "bignumber.js";
import Neon from "@cityofzion/neon-js";


function _base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}
function b64ToHex(bin) {
    const buffer = Buffer.from(bin, "base64");
    const hex = buffer.toString("hex");
    if(Neon.is.publicKey(hex)) {
        const acc = Neon.create.account(hex);
        return "0x" + acc.scriptHash;
    }
    return  hex;
}
function bin2String(array) {

    var result = "";
    for (var i = 0; i < array.length; i++) {
        //result += String.fromCharCode(parseInt(array[i], 16));
        result += String.fromCharCode(array[i]);
    }
    return result;
}
function convertDecimal (barray) {
    let result = new BigNumber('0');
    var factor = 1;
    for (let i=0; i<barray.length; i++) {
        //result = BigNumber.sum(result, new BigNumber(barray[i]*factor))
        result = result.plus(barray[i]*factor)
        //result = result + barray[i]*factor;
        factor = factor*256;
    }
    return result.toString()
}

function toOpcode(b64) {
    let OperandSizePrefixTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let OperandSizeTable = [1, 2, 4, 8, 16, 32, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 0, 2, 0, 0, 0, 2, 8, 1, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let opcodes = ["PUSHINT8", "PUSHINT16", "PUSHINT32", "PUSHINT64", "PUSHINT128", "PUSHINT256", "6", "7", "8", "9", "PUSHA", "PUSHNULL", "PUSHDATA1", "PUSHDATA2", "PUSHDATA4", "PUSHM1", "PUSH0", "PUSH1", "PUSH2", "PUSH3", "PUSH4", "PUSH5", "PUSH6", "PUSH7", "PUSH8", "PUSH9", "PUSH10", "PUSH11", "PUSH12", "PUSH13", "PUSH14", "PUSH15", "PUSH16", "NOP", "JMP", "JMP_L", "JMPIF", "JMPIF_L", "JMPIFNOT", "JMPIFNOT_L", "JMPEQ", "JMPEQ_L", "JMPNE", "JMPNE_L", "JMPGT", "JMPGT_L", "JMPGE", "JMPGE_L", "JMPLT", "JMPLT_L", "JMPLE", "JMPLE_L", "CALL", "CALL_L", "CALLA", "CALLT", "ABORT", "ASSERT", "THROW", "TRY", "TRY_L", "ENDTRY", "ENDTRY_L", "ENDFINALLY", "RET", "SYSCALL", "66", "DEPTH", "68", "DROP", "NIP", "71", "XDROP", "CLEAR", "DUP", "OVER", "76", "PICK", "TUCK", "79", "SWAP", "ROT", "ROLL", "REVERSE3", "REVERSE4", "REVERSEN", "INITSSLOT", "INITSLOT", "LDSFLD0", "LDSFLD1", "LDSFLD2", "LDSFLD3", "LDSFLD4", "LDSFLD5", "LDSFLD6", "LDSFLD", "STSFLD0", "STSFLD1", "STSFLD2", "STSFLD3", "STSFLD4", "STSFLD5", "STSFLD6", "STSFLD", "LDLOC0", "LDLOC1", "LDLOC2", "LDLOC3", "LDLOC4", "LDLOC5", "LDLOC6", "LDLOC", "STLOC0", "STLOC1", "STLOC2", "STLOC3", "STLOC4", "STLOC5", "STLOC6", "STLOC", "LDARG0", "LDARG1", "LDARG2", "LDARG3", "LDARG4", "LDARG5", "LDARG6", "LDARG", "STARG0", "STARG1", "STARG2", "STARG3", "STARG4", "STARG5", "STARG6", "STARG", "NEWBUFFER", "MEMCPY", "138", "CAT", "SUBSTR", "LEFT", "RIGHT", "143", "INVERT", "AND", "OR", "XOR", "148", "149", "150", "EQUAL", "NOTEQUAL", "SIGN", "ABS", "NEGATE", "INC", "DEC", "ADD", "SUB", "MUL", "DIV", "MOD", "POW", "SQRT", "165", "166", "167", "SHL", "SHR", "NOT", "BOOLAND", "BOOLOR", "173", "174", "175", "176", "NZ", "178", "NUMEQUAL", "NUMNOTEQUAL", "LT", "LE", "GT", "GE", "MIN", "MAX", "WITHIN", "188", "189", "190", "191", "PACK", "UNPACK", "NEWARRAY0", "NEWARRAY", "NEWARRAY_T", "NEWSTRUCT0", "NEWSTRUCT", "199", "NEWMAP", "201", "SIZE", "HASKEY", "KEYS", "VALUES", "PICKITEM", "APPEND", "SETITEM", "REVERSEITEMS", "REMOVE", "CLEARITEMS", "POPITEM", "213", "214", "215", "ISNULL", "ISTYPE", "218", "CONVERT", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "246", "247", "248", "249", "250", "251", "252", "253", "254", "255"];
    let dic = new Map();
    dic.set("1381727586", "System.Contract.Call");
    dic.set("1736177434", "System.Contract.CallNative");
    dic.set("2168117909", "System.Contract.GetCallFlags");
    dic.set("42441167", "System.Contract.CreateStandardAccount");
    dic.set("166277994", "System.Contract.CreateMultisigAccount");
    dic.set("2478627630", "System.Contract.NativeOnPersist");
    dic.set("375234884", "System.Contract.NativePostPersist");
    dic.set("666101590", "System.Crypto.CheckSig");
    dic.set("987549854", "System.Crypto.CheckMultisig");
    dic.set("2632779932", "System.Iterator.Next");
    dic.set("499078387", "System.Iterator.Value");
    dic.set("4143741362", "System.Runtime.Platform");
    dic.set("2688056809", "System.Runtime.GetTrigger");
    dic.set("59294647", "System.Runtime.GetTime");
    dic.set("805851437", "System.Runtime.GetScriptContainer");
    dic.set("1957232347", "System.Runtime.GetExecutingScriptHash");
    dic.set("1013863225", "System.Runtime.GetCallingScriptHash");
    dic.set("954381561", "System.Runtime.GetEntryScriptHash");
    dic.set("2364286968", "System.Runtime.CheckWitness");
    dic.set("1125197700", "System.Runtime.GetInvocationCounter");
    dic.set("2521294799", "System.Runtime.Log");
    dic.set("1634664853", "System.Runtime.Notify");
    dic.set("4046799655", "System.Runtime.GetNotifications");
    dic.set("3470297108", "System.Runtime.GasLeft");
    dic.set("3163314883", "System.Runtime.BurnGas");
    dic.set("3462919835", "System.Storage.GetContext");
    dic.set("3798709494", "System.Storage.GetReadOnlyContext");
    dic.set("3921628278", "System.Storage.AsReadOnly");
    dic.set("837311890", "System.Storage.Get");
    dic.set("2595762399", "System.Storage.Find");
    dic.set("2216181734", "System.Storage.Put");
    dic.set("3989133359", "System.Storage.Delete");

    let res = _base64ToArrayBuffer(b64)
    //res = res.Uint8Array
    let scripts = new Uint8Array(res);

    //for (let k=1; k<=a.length; k++) {
    //  let temp = a[k]
    //}

    let result = new Array();
    while (scripts.length > 0) {
        let temp_result = "";
        let op = opcodes[scripts[0]];
        let operandSizePrefix = OperandSizePrefixTable[scripts[0]];
        let operandSize = OperandSizeTable[scripts[0]];
        scripts = scripts.slice(1);
        //temp_result += op + '\n'

        if (operandSize > 0) {
            let operand = scripts.slice(0, operandSize);
            if (op.startsWith("PUSHINT")) {
                temp_result += op + ' ' + convertDecimal(operand)
                result.push(temp_result)
            } else if (op == 'SYSCALL') {
                temp_result += op + ' ' + dic.get(convertDecimal(operand));
                result.push(temp_result)
            } else {
                temp_result += op + ' ' + operand.toString()
                result.push(temp_result)
            }
            scripts = scripts.slice(operandSize)
        }
        if (operandSizePrefix > 0) {
            let bytes = scripts.slice(0, operandSizePrefix)
            let number
            if (bytes[0] != 20) {
                number = convertDecimal(bytes)
            } else {
                number = bytes[0]
            }
            scripts = scripts.slice(operandSizePrefix)

            let operand = scripts.slice(0, number)
            let flag = false
            for(let k=0; k<operand.length; k++) {
                if (operand[k]>=48 && operand[k] <= 57)
                    continue
                else if (operand[k]>=65 && operand[k] <=122)
                    continue
                else {
                    flag = true
                    break
                }
            }
            if(flag) {
                temp_result += op + ' ' + b64ToHex(operand);
            } else {
                temp_result += op + ' ' + bin2String(operand);
            }
            result.push(temp_result)
            scripts = scripts.slice(number)
        }
        if (operandSizePrefix == 0 && operandSize ==0)
            result.push(op)
    }
    res = result.join('<br>')
    return res
}

export default toOpcode

