import type {TranslatorHotKey} from "./types";
import {Platform} from "obsidian";
import type {Modifier} from "obsidian";

/**
 * DefaultDict class, used to create an object where new keys are automatically created with a default value.
 */
export class DefaultDict {
    constructor(init: any = {}, value: any) {
        return new Proxy(init, {
            get: (target, name) => name in target ? target[name as keyof typeof target] : value
        })
    }
}

/**
 * Converts a string to Title Case.
 * @param str - The string to convert.
 * @returns Title Case string.
 */
export function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/**
 * Convert a string to Sentence case.
 * @param str - The string to convert.
 * @returns Sentence case string.
 */
export function toSentenceCase(str: string) {
    return str.toLowerCase().replace(/(^\w|\.\s*\w)/gi, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/**
 * Array comparison function.
 * @param a1 - First array.
 * @param a2 - Second array.
 * @returns True if the arrays are strictly equal, false otherwise.
 */
export function array_cmp(a1: Array<any>, a2: Array<any>) {
    if (a1 === a2) return true;
    if (a1 == null || a2 == null) return false;
    let i = a1.length;
    if (i !== a2.length) return false;
    while (i--)
        if (a1[i] !== a2[i]) return false;
    return true
}

/**
 * Given a regex string, get the index of the first match in the string.
 * @param searchString - The string to search through.
 * @param regex - The regex to search for.
 * @param position - The index to start searching from.
 * @returns The index of the first match, or -1 if no match is found.
 */
export function regexIndexOf(searchString: string, regex: RegExp, position?: number) {
    const indexOf = searchString.substring(position || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (position || 0)) : indexOf;
}

/**
 * Given a regex string, get the index of the last match in the string.
 * @param searchString - The string to search through.
 * @param regex - The regex to search for.
 * @param position - The index to start searching from.
 */
export function regexLastIndexOf(searchString: string, regex: RegExp, position?: number) {
    regex = regex.global ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiline ? "m" : ""));
    if (position == null)
        position = searchString.length;
    else if (position < 0)
        position = 0;

    const stringToWorkWith = searchString.substring(0, position + 1);
    let lastIndexOf = -1;
    let nextStop = 0;
    let result;
    while ((result = regex.exec(stringToWorkWith)) != null) {
        lastIndexOf = result.index;
        regex.lastIndex = ++nextStop;
    }
    return lastIndexOf;
}

/**
 * Remove any punctuation from a string using unicode regex.
 * @param str - The string to remove punctuation from.
 * @returns A string with punctuation removed.
 */
// export function removePunctuation(str: string) {
// ": "return str.replace(/\p{P}/gu, "");
// }


/**
 * Rate limit a given function to be executed once every `delay` milliseconds, works with a FIFO queue:
 * no more than n calls can be stored in the queue at the same time.
 *
 * @remarks Adapted from https://github.com/wankdanker/node-function-rate-limit/
 *
 * @param limitCount - The number of calls allowed in the queue
 * @param interval - The time in milliseconds between every function call
 * @param unique - Whether to enforce unique arguments for function call
 * @param defaultTimeout - How long after the last call the next function call should be executed (equals the duration of function call)
 * @param fn - The function to rate limit
 */

export function rateLimit(limitCount: number, interval: number, unique: boolean, default_timeout: number, fn: (...args: any) => void) {
    // Contains set of function calls that need to be executed, limited by limitCount and executed every interval
    const fifo: any[] = [];
    const currently_running: any[] = [];
    let running = false;

    function next_call(args: any[] = []) {
        // Set up the next call to be executed after given interval
        setTimeout(function () {
            if (fifo.length)
                next_call(fifo.shift());
            else
                running = false;
        }, interval);

        // If the limiter requires unique calls, set the function to be running for args[2] specified time
        if (unique) {
            setTimeout(function () {
                if (!fifo)
                    // Safeguard: clear currently_running if fifo is empty
                    currently_running.length = 0;
                else
                    currently_running.shift();
            }, args[2] || default_timeout);
        }

        // Execute the function
        fn.apply(args[0], args[1]);
    }

    return function rate_limited_function() {
        const ctx = this;
        const args = Array.prototype.slice.call(arguments);

        // If queue is full, ignore incoming function call
        // LimitCount of 0 means that only one function call can be executed at a time
        if (!limitCount || fifo.length < limitCount) {
            // When call has priority, bypass FIFO queue and execute immediately (also disregards uniqueness property)
            if (args[2]) {
                fn.apply(ctx, args);
            } else {
                // If limiter is unique, only one function call with the same arguments can be executed at a time
                if ((unique && !currently_running.find(x => array_cmp(x, args))) || !unique) {
                    if (unique)
                        currently_running.push(args);
                    fifo.push([ctx, args]);
                }

                // Start up rate limiter when not active
                if (!running && fifo.length) {
                    running = true;
                    next_call(fifo.shift());
                }
            }
        }
    }
}

/**
 * Helper function to generate a random hexadecimal number
 * @returns A random hexadecimal string with length 4
 */
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * Generate a random GUID
 * @param length - The length of the GUID to generate
 * @returns A random GUID of the specified length
 */
export function generateIdentifier(length: number = 16) {
    let str = "";
    for (let i = 0; i < length / 4; i++)
        str += S4();
    return str.substring(0, length);
}


/**
 * Encrypts plaintext using AES-GCM with supplied password, for decryption with aesGcmDecrypt().
 *                                                                      (c) Chris Veness MIT Licence
 *
 * @param   {String} plaintext - Plaintext to be encrypted.
 * @param   {String} password - Password to use to encrypt plaintext.
 * @returns {String} Encrypted ciphertext.
 *
 * @remarks Taken from https://gist.github.com/deweller/13015c28ff6ef981693545b664591b01
 * @example
 *   const ciphertext = await aesGcmEncrypt('my secret text', 'pw');
 *   aesGcmEncrypt('my secret text', 'pw').then(function(ciphertext) { console.log(ciphertext); });
 */
export async function aesGcmEncrypt(plaintext: string, password: string) {
    if (!password || !plaintext)
        return plaintext;

    const pwUtf8 = new TextEncoder().encode(password);                                 // encode password as UTF-8
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);                      // hash the password

    const iv = crypto.getRandomValues(new Uint8Array(12));                             // get 96-bit random iv

    const alg = {name: 'AES-GCM', iv: iv};                                           // specify algorithm to use

    const key = await crypto.subtle.importKey('raw', pwHash, alg, false, ['encrypt']); // generate key from pw

    const ptUint8 = new TextEncoder().encode(plaintext);                               // encode plaintext as UTF-8
    const ctBuffer = await crypto.subtle.encrypt(alg, key, ptUint8);                   // encrypt plaintext using key

    const ctArray = Array.from(new Uint8Array(ctBuffer));                              // ciphertext as byte array
    const ctStr = ctArray.map(byte => String.fromCharCode(byte)).join('');             // ciphertext as string
    const ctBase64 = btoa(ctStr);                                                      // encode ciphertext as base64

    const ivHex = Array.from(iv).map(b => ('00' + b.toString(16)).slice(-2)).join(''); // iv as hex string

    return ivHex + ctBase64;                                                             // return iv+ciphertext
}


/**
 * Decrypts ciphertext encrypted with aesGcmEncrypt() using supplied password.
 *                                                                      (c) Chris Veness MIT Licence
 *
 * @param   {String} ciphertext - Ciphertext to be decrypted.
 * @param   {String} password - Password to use to decrypt ciphertext.
 * @returns {String} Decrypted plaintext.
 *
 * @example
 *   const plaintext = await aesGcmDecrypt(ciphertext, 'pw');
 *   aesGcmDecrypt(ciphertext, 'pw').then(function(plaintext) { console.log(plaintext); });
 */
export async function aesGcmDecrypt(ciphertext: string, password: string) {
    try {
        if (!password || !ciphertext)
            return ciphertext;

        const pwUtf8 = new TextEncoder().encode(password);                                 // encode password as UTF-8
        const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);                      // hash the password

        const iv = ciphertext.slice(0, 24).match(/.{2}/g).map(byte => parseInt(byte, 16));  // get iv from ciphertext

        const alg = {name: 'AES-GCM', iv: new Uint8Array(iv)};                           // specify algorithm to use

        const key = await crypto.subtle.importKey('raw', pwHash, alg, false, ['decrypt']); // use pw to generate key

        const ctStr = atob(ciphertext.slice(24));                                          // decode base64 ciphertext
        const ctUint8 = new Uint8Array(new ArrayBuffer(ctStr.length));
        for (let i = 0; i < ctStr.length; i++) {
            ctUint8[i] = ctStr.charCodeAt(i);
        }

        const plainBuffer = await crypto.subtle.decrypt(alg, key, ctUint8);                // decrypt ciphertext using key
        const plaintext = new TextDecoder().decode(plainBuffer);                           // decode password from UTF-8

        return plaintext;                                                                  // return the plaintext
    } catch (e) {
        console.log("Error decrypting: password is incorrect");
        return ciphertext;
    }

}


/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @remarks Taken from https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
 * @return Formatted string.
 */
export function humanFileSize(bytes: number, si: boolean = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh)
        return bytes + ' B';

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;


    while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1) {
        bytes /= thresh;
        ++u;
    }


    return bytes.toFixed(dp) + ' ' + units[u];
}


/**
 * Generate a standard normal variate using the Box-Muller transform.
 * @returns {number} - A normally distributed random number.
 */
export function randn_bm(): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
    return num
}

/**
 * Assign key-values from source object to target object if they do not exist in target object
 * @param source - The object to assign from
 * @param target - The object to assign to
 * @param ignored_keys - An array of keys to ignore
 * @returns {Object} - The target object with the new key-values
 */
export function nested_object_assign(source: any, target: any, ignored_keys: Set<string>) {
    Object.keys(source)
        .forEach(key => {
            const s_val = source[key]
            const t_val = target[key]
            // Check if the key is in the ignored keys
            if (t_val && ignored_keys.has(key) || !ignored_keys.has(key)) {
                if (t_val) {
                    // If target and source both are objects, recursively check for keys in source to add to target
                    if (!Array.isArray(t_val) && t_val instanceof Object && s_val instanceof Object) {
                        nested_object_assign(s_val, t_val, ignored_keys);
                    }
                } else {
                    // Filter out ignored keys in s_val object
                    if (s_val instanceof Object && !(s_val instanceof Array))
                        target[key] = Object.fromEntries(Object.entries(s_val).filter(([k, v]) => !ignored_keys.has(k)));
                    else
                        target[key] = s_val;
                }
            }
        })
    return target
}

/**
 * Helper object to map modifier key to proper display name, based on the user's OS
 * @example
 * modifier_resolver['Mod'] -> '⌘'
 */
const modifier_resolver: Record<Modifier, string> = Platform.isSafari ? {
    "Mod": "⌘",
    "Ctrl": "Cmd",
    "Meta": "Cmd",
    "Alt": "⌥",
    "Shift": "Shift",
} : {
    "Mod": "Ctrl",
    "Ctrl": "Ctrl",
    "Meta": "Win",
    "Alt": "Alt",
    "Shift": "Shift",
};

/**
 * Helper function to generate a proper display name for a hotkey
 * @param hotkey - The hotkey to generate a display name for
 * @returns {string} - A display name for the hotkey
 */
export function getHotKeyString(hotkey: TranslatorHotKey) {
    return `${!hotkey.modifiers.length ? '' : `${hotkey.modifiers.map(mod => modifier_resolver[mod]).join(' + ')} + `}${hotkey.key}`
}

type Reverser<T extends Record<PropertyKey, PropertyKey>> = {
    [P in keyof T as T[P]]: P
}


/**
 * Helper object to map custom ISO 639-2/639-3 language codes to standard ISO 639-1 language codes (if applicable)
 * @remark Fanyi Baidu has its own weird ISO system for language codes, not quite 639-2,
 * @remark making up their own codes for some languages; it is more efficient to map them to standard ISO 639-1 codes, rather than to also add localizations for all the custom codes
 */
export const iso639_3to1: Record<string, string> = {
    "ach": "ace",
    "afr": "af",
    "aka": "ak",
    "alb": "sq",
    "amh": "am",
    "ara": "ar",
    "arg": "an",
    "arm": "hy",
    "arq": "arq",
    "asm": "as",
    "ast": "ast",
    "aym": "ay",
    "aze": "az",
    "bak": "ba",
    "bal": "bal",
    "baq": "eu",
    "bel": "be",
    "bem": "bem",
    "ben": "bn",
    "ber": "ber",
    "bho": "bho",
    "bis": "bi",
    "bli": "bli",
    "bos": "bs",
    "bre": "br",
    "bul": "bg",
    "bur": "my",
    "cat": "ca",
    "ceb": "ceb",
    "chr": "chr",
    "cht": "zh-hant",
    "chv": "cv",
    "cor": "kw",
    "cos": "co",
    "cre": "cr",
    "cri": "crh",
    "cs": "cs",
    "dan": "da",
    "de": "de",
    "div": "dv",
    "el": "el",
    "en": "en",
    "eno": "ang",
    "epo": "eo",
    "est": "et",
    "fao": "fo",
    "fil": "fil",
    "fin": "fi",
    "fra": "fr",
    "fri": "fur",
    "frm": "frm",
    "frn": "fr-CA",
    "fry": "fy",
    "ful": "ff",
    "geo": "ka",
    "gla": "gd",
    "gle": "ga",
    "glg": "gl",
    "glv": "gv",
    "gra": "grc",
    "grn": "gn",
    "guj": "gu",
    "hak": "cnh",
    "hau": "ha",
    "haw": "haw",
    "heb": "he",
    "hi": "hi",
    "hil": "hil",
    "hkm": "km",
    "hmn": "hmn",
    "hrv": "hr",
    "ht": "ht",
    "hu": "hu",
    "hup": "hup",
    "ibo": "ig",
    "ice": "is",
    "id": "id",
    "ido": "io",
    "iku": "iu",
    "ina": "ia",
    "ing": "inh",
    "ir": "pes",
    "it": "it",
    "jav": "jv",
    "jp": "ja",
    "kab": "kab",
    "kah": "csb",
    "kal": "kl",
    "kan": "kn",
    "kas": "ks",
    "kau": "kr",
    "kin": "rw",
    "kir": "ky",
    "kli": "tlh",
    "kok": "kok",
    "kon": "kg",
    "kor": "ko",
    "kur": "ku",
    "lag": "ltg",
    "lao": "lo",
    "lat": "la",
    "lav": "lv",
    "lim": "li",
    "lin": "ln",
    "lit": "lt",
    "log": "nds",
    "loj": "jbo",
    "los": "dsb",
    "ltz": "lb",
    "lug": "lg",
    "mac": "mk",
    "mah": "mh",
    "mai": "mai",
    "mal": "ml",
    "mao": "mi",
    "mar": "mr",
    "mau": "mfe",
    "may": "ms",
    "mg": "mg",
    "mlt": "mt",
    "mot": "cnr",
    "nbl": "nr",
    "nea": "nap",
    "nep": "ne",
    "nl": "nl",
    "nno": "nn",
    "nob": "nb",
    "nor": "no",
    "nqo": "nqo",
    "nya": "ny",
    "oci": "oc",
    "oji": "oj",
    "ori": "or",
    "orm": "om",
    "oss": "os",
    "pam": "pam",
    "pan": "pa",
    "pap": "pap",
    "ped": "nso",
    "per": "fa",
    "pl": "pl",
    "pot": "pt-br",
    "pt": "pt",
    "pus": "ps",
    "que": "qu",
    "ro": "rom",
    "roh": "rm",
    "rom": "ro",
    "ru": "ru",
    "ruy": "rue",
    "san": "sa",
    "sec": "sh",
    "sha": "shn",
    "sil": "sli",
    "sin": "si",
    "sk": "sk",
    "slo": "sl",
    "sm": "sm",
    "sme": "se",
    "sna": "sn",
    "snd": "sd",
    "sol": "son",
    "som": "so",
    "sot": "st",
    "spa": "es",
    "src": "sr-CYRL",
    "srd": "sc",
    "srp": "sr",
    "sun": "su",
    "swa": "sw",
    "swe": "sv",
    "syr": "syr",
    "tam": "ta",
    "tat": "tt",
    "tel": "te",
    "tet": "tet",
    "tgk": "tg",
    "tgl": "tl",
    "th": "th",
    "tir": "ti",
    "tr": "tr",
    "tso": "ts",
    "tua": "aeb",
    "tuk": "tk",
    "twi": "tw",
    "ukr": "uk",
    "ups": "hsb",
    "urd": "ur",
    "ven": "ve",
    "vie": "vi",
    "wel": "cy",
    "wln": "wa",
    "wol": "wo",
    "wyw": "lzh",
    "xho": "xh",
    "yid": "yi",
    "yor": "yo",
    "yue": "yue",
    "zaz": "zza",
    "zh": "zh",
    "zul": "zu"
}


/**
 * Helper object to map ISO 639-1 language codes to custom ISO 639-2/639-3 language codes
 * @remark Fanyi Baidu has its own weird ISO system for language codes, not quite 639-2,
 * @remark making up their own codes for some languages; it is more efficient to map them to standard ISO 639-1 codes, rather than to also add localizations for all the custom codes
 */
export const iso639_1to3: Record<string, string> = {
    "ace": "ach",
    "af": "afr",
    "ak": "aka",
    "sq": "alb",
    "am": "amh",
    "ar": "ara",
    "an": "arg",
    "hy": "arm",
    "arq": "arq",
    "as": "asm",
    "ast": "ast",
    "ay": "aym",
    "az": "aze",
    "ba": "bak",
    "bal": "bal",
    "eu": "baq",
    "be": "bel",
    "bem": "bem",
    "bn": "ben",
    "ber": "ber",
    "bho": "bho",
    "bi": "bis",
    "bli": "bli",
    "bs": "bos",
    "br": "bre",
    "bg": "bul",
    "my": "bur",
    "ca": "cat",
    "ceb": "ceb",
    "chr": "chr",
    "zh-hant": "cht",
    "cv": "chv",
    "kw": "cor",
    "co": "cos",
    "cr": "cre",
    "crh": "cri",
    "cs": "cs",
    "da": "dan",
    "de": "de",
    "dsb": "los",
    "dv": "div",
    "el": "el",
    "en": "en",
    "ang": "eno",
    "eo": "epo",
    "et": "est",
    "fo": "fao",
    "fil": "fil",
    "fi": "fin",
    "fr": "fra",
    "fur": "fri",
    "frm": "frm",
    "fr-CA": "frn",
    "fy": "fry",
    "ff": "ful",
    "ka": "geo",
    "gd": "gla",
    "ga": "gle",
    "gl": "glg",
    "gv": "glv",
    "grc": "gra",
    "gn": "grn",
    "gu": "guj",
    "cnh": "hak",
    "ha": "hau",
    "haw": "haw",
    "he": "heb",
    "hi": "hi",
    "hil": "hil",
    "km": "hkm",
    "hmn": "hmn",
    "hr": "hrv",
    "ht": "ht",
    "hu": "hu",
    "hup": "hup",
    "ig": "ibo",
    "is": "ice",
    "id": "id",
    "io": "ido",
    "iu": "iku",
    "ia": "ina",
    "inh": "ing",
    "pes": "ir",
    "it": "it",
    "jv": "jav",
    "ja": "jp",
    "kab": "kab",
    "csb": "kah",
    "kl": "kal",
    "kn": "kan",
    "ks": "kas",
    "kr": "kau",
    "rw": "kin",
    "ky": "kir",
    "tlh": "kli",
    "kok": "kok",
    "kg": "kon",
    "ko": "kor",
    "ku": "kur",
    "ltg": "lag",
    "lo": "lao",
    "la": "lat",
    "lv": "lav",
    "li": "lim",
    "ln": "lin",
    "lt": "lit",
    "nds": "log",
    "jbo": "loj",
    "lb": "ltz",
    "lg": "lug",
    "mk": "mac",
    "mh": "mah",
    "mai": "mai",
    "ml": "mal",
    "mi": "mao",
    "mr": "mar",
    "mfe": "mau",
    "ms": "may",
    "mg": "mg",
    "mt": "mlt",
    "cnr": "mot",
    "nr": "nbl",
    "nap": "nea",
    "ne": "nep",
    "nl": "nl",
    "nn": "nno",
    "nb": "nob",
    "no": "nor",
    "nqo": "nqo",
    "ny": "nya",
    "oc": "oci",
    "oj": "oji",
    "or": "ori",
    "om": "orm",
    "os": "oss",
    "pam": "pam",
    "pa": "pan",
    "pap": "pap",
    "nso": "ped",
    "fa": "per",
    "pl": "pl",
    "pt-br": "pot",
    "pt": "pt",
    "ps": "pus",
    "qu": "que",
    "rom": "ro",
    "rm": "roh",
    "ro": "rom",
    "ru": "ru",
    "rue": "ruy",
    "sa": "san",
    "sh": "sec",
    "shn": "sha",
    "sli": "sil",
    "si": "sin",
    "sk": "sk",
    "sl": "slo",
    "sm": "sm",
    "se": "sme",
    "sn": "sna",
    "sd": "snd",
    "son": "sol",
    "so": "som",
    "st": "sot",
    "es": "spa",
    "sr-CYRL": "src",
    "sc": "srd",
    "sr": "srp",
    "su": "sun",
    "sw": "swa",
    "sv": "swe",
    "syr": "syr",
    "ta": "tam",
    "tt": "tat",
    "te": "tel",
    "tet": "tet",
    "tg": "tgk",
    "tl": "tgl",
    "th": "th",
    "ti": "tir",
    "tr": "tr",
    "ts": "tso",
    "aeb": "tua",
    "tk": "tuk",
    "tw": "twi",
    "uk": "ukr",
    "hsb": "ups",
    "ur": "urd",
    "ve": "ven",
    "vi": "vie",
    "cy": "wel",
    "wa": "wln",
    "wo": "wol",
    "lzh": "wyw",
    "xh": "xho",
    "yi": "yid",
    "yo": "yor",
    "yue": "yue",
    "zza": "zaz",
    "zh": "zh",
    "zu": "zul"
}
