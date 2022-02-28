const courses = ['数学', '建模', '基物', '实验']

function apply_xor(left, right, chars) {
    if (left > right)
        for (let i = left - 1; i >= right; i--) chars[i] ^= chars[i + 1]
    if (right > left)
        for (let i = left + 1; i <= right; i++) chars[i] ^= chars[i - 1]
}

function encode(str) {
    if (str === "") return ""
    let reflect = [0, 1, 2, 3]
    Array(3).fill(0).forEach(() => reflect.sort(() => 0.5 - Math.random()))
    let url_code = encodeURI(str.split("").reverse().join(""))
    let chars = Array(url_code.length).fill(0).map((v, i) => url_code.charCodeAt(i))

    apply_xor(chars.length >> 1, 0, chars)
    apply_xor(chars.length >> 1, chars.length - 1, chars)
    apply_xor(chars.length - 1, 0, chars)
    apply_xor(0, chars.length - 1, chars)

    let index_list = Array((chars.length + 1) << 2).fill(-1)
    Array(4).fill(0).map((v, i) => i).forEach((i) =>
        index_list[(index_list.length >> 3) + (index_list.length >> 2) * i] = reflect[i])
    for (let i = 0, count = 0; i < chars.length; i++)
        Array(4).fill(0).map((v, i) => i).forEach((j) => {
            while (index_list[count] !== -1) count++
            index_list[count++] = reflect[chars[i] >> ((3 - j) << 1) & 3]
        })
    return index_list.map((i) => courses[i]).join("")
}

function unapply_xor(left, right, chars) {
    if (left > right)
        for (let i = left - 1, last = chars[left]; i >= right; i--) {
            let current = chars[i]
            chars[i] ^= last
            last = current
        }
    if (right > left)
        for (let i = left + 1, last = chars[left]; i <= right; i++) {
            let current = chars[i]
            chars[i] ^= last
            last = current
        }
}

function decode(str) {
    if (str === "") return ""
    let index_list = []
    for (let i = 0, index; i < str.length; i += courses[index].length) {
        index = Array(4).fill(0).map((v, i) => i).find((s) =>
            Array(courses[s].length).fill(0).map((v, i) => i).every((v) =>
                v + i < str.length && courses[s].charAt(v) === str.charAt(v + i)))
        if (index === undefined) throw new Error("invalid ciphertext")
        index_list.push(index)
    }

    let reflect = Array(4)
    Array(4).fill(0).map((v, i) => i).forEach((i) => {
        reflect[i] = index_list[(index_list.length >> 3) + (index_list.length >> 2) * i]
        index_list[(index_list.length >> 3) + (index_list.length >> 2) * i] = -1
    })
    let chars = Array((index_list.length >> 2) - 1)
    for (let i = 0, count = 0; i < chars.length; i++) {
        let value = 0
        Array(4).fill(0).map((v, i) => i).forEach((j) => {
            while (index_list[count] === -1) count++
            value |= reflect.indexOf(index_list[count++]) << ((3 - j) << 1)
        })
        chars[i] = value
    }

    unapply_xor(0, chars.length - 1, chars)
    unapply_xor(chars.length - 1, 0, chars)
    unapply_xor(chars.length >> 1, chars.length - 1, chars)
    unapply_xor(chars.length >> 1, 0, chars)
    str = decodeURI(chars.map((i) => String.fromCharCode(i)).join(""))
    return str.split("").reverse().join("")
}

function random(length) {
    return Array(length).fill(0).map(() => Math.random() < 0.5 ?
        String.fromCharCode(Math.floor(Math.random() * (127 - 32)) + 32) :
        String.fromCharCode(Math.floor(Math.random() * (40869 - 19968)) + 19968)
    ).join("")
}

export {encode, decode, random}
