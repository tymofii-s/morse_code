const UArray = ["а", "б", "в", "г", "ґ", "д", "е", "є", "ж", "з", "и", "і",
                "ї", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у",
                 "ф", "х", "ц", "ч", "ш", "щ", "ь", "ю", "я",
                 ".", ",", "!", "?", "<", ">", "/", "|", ";", ":", "+", "-",
                  "_", "*", "&", "^", "%", "$", "@"];

const morseCode = [".-", "-...", ".--", "....", "---.", "-..", ".", "..-..",
                  "...-", "--..", "-.--", "..", ".---.", ".---", "-.-", ".-..",
                   "--", "-.", "---", ".--.", ".-.", "...", "-", "..-", "..-.",
                    "----", "-.-.", "---.", "--.-", "--.--", "-..-", "..--", ".-.-",
                    "·-·-·-",   // .
                    "--··--",   // ,
                    "-·-·--",   // !
                    "··--··",   // ?
                    "-···-",    // <
                    "-·--·",    // >
                    "-··-",     // /
                    "-·-·-·",   // ;
                    "---···",   // :
                    "·-·-·",    // +
                    "-····-",    // -
                    "··--·-",   // _
                    "-·-·-",    // *
                    "·-···",    // &
                    "···-·",    // ^
                    "--··--",   // %
                    "···-··-",  // $
                    "·--·-·"    // @
                ];

const specialSymbols = ["[", "]", "{", "}", "(", ")", "=", "#"]


function checkSpecialSymbols(currentElement) {
    if (specialSymbols.includes(currentElement)) {
        return true;
    } else {
        return false;
    }
}

function symbolExist(currentElement) {
    if (checkSpecialSymbols(currentElement) || morseCode.includes(currentElement) || UArray.includes(currentElement)) {
        return true;
    } else {
        return false;
    }
}

function addP(symbolsThatNotExist) {
    deleteOldP()
    changeSectionHeight("unknownDiv", symbolsThatNotExist)
    changeSectionHeight("section1", symbolsThatNotExist)

    for (let i = 0; i < symbolsThatNotExist.length; i++) {
        let section = document.getElementById('unknownDiv')
        let newP = document.createElement("p")
        newP.textContent = symbolsThatNotExist[i];
        section.appendChild(newP);
    }
}

function deleteOldP() {
    let section = document.getElementById("unknownDiv");
    let paragraphs = section.querySelectorAll('p');
    paragraphs.forEach(function(p) {
        p.parentNode.removeChild(p);
    });
}

function changeSectionHeight(sectionId, symbolsThatNotExist) {
    let sectionToChange = document.getElementById(sectionId);
    if (sectionId === "unknownDiv") {
        sectionToChange.style.height = `${(symbolsThatNotExist.length) * 35 + 50}px`; 
    } else if (sectionId === "section1") {
        if (((symbolsThatNotExist.length) * 35 + 50 + 400) >= 500) {
            sectionToChange.style.height = `${(symbolsThatNotExist.length) * 35 + 50 + 400}px`;
        } else {
            sectionToChange.style.height = "500px";
        }
    }
}

function ukrMorseTransleteFunction() {
    let input = document.getElementById("ukr_morze").value;
    let result = [];
    let symbolsThatNotExist = [];

    for (let i = 0; i < input.length; i++) {
        if (checkSpecialSymbols(input[i])) {
            result.push(input[i])
        } else if (!symbolExist(input[i])) {
            symbolsThatNotExist.push(input[i])
        } else {
            let indexOfCurrentElement = UArray.indexOf(input[i])
            result.push(morseCode[indexOfCurrentElement])
        }
        
    }

    result = result.join(" ")
    document.getElementById("output1").innerHTML = result

    if (symbolsThatNotExist.length !== 0) {
        addP(symbolsThatNotExist);
    } else {
        deleteOldP()
        changeSectionHeight("unknownDiv", symbolsThatNotExist)
        changeSectionHeight("section1", symbolsThatNotExist)

        let section = document.getElementById('unknownDiv')
        let newP = document.createElement("p")
        newP.textContent = "Немає";
        section.appendChild(newP);

        section.style.height = "80px";
    }
}

function morseUkrTransleteFunction() {
    let input = document.getElementById("morze_ukr").value;
    input = input.split(" ")

    let result = []
    for (let i = 0; i < input.length; i++) {
        if (checkSpecialSymbols(input[i])) {
            result.push(input[i])
        } else {
            let indexOfCurrentElement = morseCode.indexOf(input[i])
        result.push(UArray[indexOfCurrentElement])
        }
    }

    result = result.join("")
    document.getElementById("output2").innerHTML = result
}