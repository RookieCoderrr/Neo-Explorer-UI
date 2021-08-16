/* eslint-disable prettier/prettier */
import { format } from "timeago.js";
import Neon from "@cityofzion/neon-js";

const RPC_NODE = "http://seed2t4.neo.org:20332";

function changeFormat(button) {
    if(button.state) {
        button.state = false;
        button.buttonName = "Addr";
    } else {
        button.state = true;
        button.buttonName = "Hash";
    }
}
/*
* Button{
*   state: boolean
*   buttonName: string
* }
* */
function sleep(ms) {
    return new Promise(resolve =>
        setTimeout(resolve, ms)
    )
}
async function copyItem(ele, button,span) {
    const item = document.getElementById(ele).innerText;
    const oInput = document.createElement('input');
    oInput.value = item;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand("Copy");
    oInput.className = 'oInput';
    oInput.style.display = 'none';
    document.getElementById(button).style.color = "#42b983";
    document.getElementById(span).innerText = " Copied"
    await sleep(500);
    document.getElementById(button).style.color = "grey";
    document.getElementById(span).innerText = "";
}

function convertToken(token, decimal) {
    return parseFloat((token * Math.pow(10, -decimal)).toFixed(8))
}

function convertGas(gas) {
    return parseFloat((gas * Math.pow(0.1, 8)).toFixed(8));
}

function convertTime(ts, locale) { // this.$i18n.locale
    switch (locale) {
        case "cn":
            return format(ts, "zh_CN");
        default:
            return format(ts);
    }
}

function convertPreciseTime(time) {
    const date = new Date(time);
    const y = date.getFullYear()
    const m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)
    const d = (date.getDate() <10 ? ('0' +date.getDate()): date.getDate())
    const h = date.getHours() < 10 ? ('0' + date.getHours()): date.getHours()
    const mi = date.getMinutes() < 10 ? ('0' + date.getMinutes()): date.getMinutes()
    const s = date.getSeconds() < 10 ? ('0' + date.getSeconds()): date.getSeconds()
    return m+'-'+d+'-'+y+' '+h+':'+mi+':'+ s +' +' + "UTC";
}

function addressToScriptHash(addr) {
    const acc = Neon.create.account(addr);
    return "0x" + acc.scriptHash;
}

function scriptHashToAddress(hash) {
    const trunc = hash.substring(2);
    const acc = Neon.create.account(trunc);
    return acc.address;
}

function responseConverter(key, val) {
    if (typeof val === "object") {
        if (val["type"] === "ByteString" && typeof val["value"] === "string") {
            const buffer = Buffer.from(val["value"], "base64");
            const hex = buffer.toString("hex");
            if (Neon.is.publicKey(hex)) {
                const acc = Neon.create.account(hex);
                val["decoded"] = "0x" + acc.scriptHash;
            } else if (Neon.is.scriptHash(hex)) {
                const reversed = Neon.u.reverseHex(hex)
                val["decoded"] = "0x" + reversed;
            } else if ((/^((0x)?)([0-9a-f]{64})$/).test(hex)){
                val["decoded"] = "0x" + hex;
            } else {
                if (/^[\x20-\x7F]*$/.test(buffer.toString())) {
                    val["decoded"] = buffer.toString();
                } else {
                    val["decoded"] = buffer.toString("hex");
                }
            }
        } else if ( val["type"] === "Buffer" && typeof val["value"] === "string"){
            const buffer = Buffer.from(val["value"], "base64");
            if ( /^[\x20-\x7F]*$/.test(buffer.toString())) {
                val["decoded"] = buffer.toString();
            } else {
                val["decoded"] = parseInt(buffer.toString("hex"), 16);
            }
        }
    }
    return val;
}




export {
  RPC_NODE,
  changeFormat,
  convertToken,
    convertGas,
  convertTime,
  convertPreciseTime,
  addressToScriptHash,
  scriptHashToAddress,
  responseConverter,
    copyItem
};
