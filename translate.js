const UArray = ["а", "б", "в", "г", "ґ", "д", "е", "є", "ж", "з", "и", "і", "ї", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ь", "ю", "я"];
const morseCode = [".-", "-...", ".--", "....", "---.", "-..", ".", "..-..", "...-", "--..", "-.--", "..", ".---.", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", ".-.", "...", "-", "..-", "..-.", "----", "-.-.", "---.", "--.-", "--.--", "-..-", "..--", ".-.-"];

function ukrMorseTransleteFunction() {
    let input = document.getElementById("ukr_morze").value;
    let result = []

    for (let i = 0; i < input.length; i++) {
        let indexOfCurrentElement = UArray.indexOf(input[i])
        result.push(morseCode[indexOfCurrentElement])
    }

    result = result.join(" ")
    document.getElementById("output1").innerHTML = result
}

function morseUkrTransleteFunction() {
    let input = document.getElementById("morze_ukr").value;
    input = input.split(" ")

    let result = []
    for (let i = 0; i < input.length; i++) {
        let indexOfCurrentElement = morseCode.indexOf(input[i])
        result.push(UArray[indexOfCurrentElement])
    }

    result = result.join("")
    document.getElementById("output2").innerHTML = result
}