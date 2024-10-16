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

// function addP(symbolsThatNotExist) {
//     deleteOldP()
//     changeSectionHeight("unknownDiv1", symbolsThatNotExist)
//     changeSectionHeight("section1", symbolsThatNotExist)

//     for (let i = 0; i < symbolsThatNotExist.length; i++) {
//         let section = document.getElementById('unknownDiv1')
//         let newP = document.createElement("p")
//         newP.textContent = symbolsThatNotExist[i];
//         section.appendChild(newP);
//     }
// }

// function deleteOldP() {
//     let section = document.getElementById("unknownDiv1");
//     let paragraphs = section.querySelectorAll('p');
//     paragraphs.forEach(function(p) {
//         p.parentNode.removeChild(p);
//     });
// }

function addP(symbolsThatNotExist, sectionId1, sectionId2) {
    deleteOldP(sectionId1)
    changeSectionHeight(sectionId1, symbolsThatNotExist)
    changeSectionHeight(sectionId2, symbolsThatNotExist)

    for (let i = 0; i < symbolsThatNotExist.length; i++) {
        let section = document.getElementById(sectionId1)
        let newP = document.createElement("p")
        newP.textContent = `${i+1}. ${symbolsThatNotExist[i]}`;
        section.appendChild(newP);
    }
}

function deleteOldP(sectionId) {
    let section = document.getElementById(sectionId);
    let paragraphs = section.querySelectorAll('p');
    paragraphs.forEach(function(p) {
        p.parentNode.removeChild(p);
    });
}

function changeSectionHeight(sectionId, symbolsThatNotExist) {
    let sectionToChange = document.getElementById(sectionId);

    switch (sectionId) {
        case "unknownDiv1":
            sectionToChange.style.height = `${(symbolsThatNotExist.length) * 35 + 50}px`; 
            break;

        case "section1":
            if (((symbolsThatNotExist.length) * 35 + 50 + 400) >= 500) {
                sectionToChange.style.height = `${(symbolsThatNotExist.length) * 35 + 50 + 400}px`;
                break
            } else {
                sectionToChange.style.height = "500px";
                break
            }

        case "unknownDiv2":
            sectionToChange.style.height = `${(symbolsThatNotExist.length) * 35 + 50}px`; 
            break;

        case "section2":
            if (((symbolsThatNotExist.length) * 35 + 50 + 400) >= 500) {
                sectionToChange.style.height = `${(symbolsThatNotExist.length) * 35 + 50 + 400}px`;
                break
            } else {
                sectionToChange.style.height = "500px";
                break
            }
    }
}

function ukrMorseTransleteFunction() {
    let unformatedInput = document.getElementById("ukr_morze").value;
    input = unformatedInput.toLowerCase();
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
        addP(symbolsThatNotExist, "unknownDiv1", "section1");
    } else {
        deleteOldP("unknownDiv1")
        changeSectionHeight("unknownDiv1", symbolsThatNotExist)
        changeSectionHeight("section1", symbolsThatNotExist)

        let section = document.getElementById('unknownDiv1')
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
    let symbolsThatNotExist = [];

    for (let i = 0; i < input.length; i++) {
        if (checkSpecialSymbols(input[i])) {
            result.push(input[i])
        } else if (!symbolExist(input[i])) {
            symbolsThatNotExist.push(input[i])
        } else {
            let indexOfCurrentElement = morseCode.indexOf(input[i])
            result.push(UArray[indexOfCurrentElement])
        }
    }

    result = result.join("")
    document.getElementById("output2").innerHTML = result

    if (symbolsThatNotExist.length !== 0) {
        addP(symbolsThatNotExist, "unknownDiv2", "section2");
    } else {
        deleteOldP("unknownDiv2")
        changeSectionHeight("unknownDiv2", symbolsThatNotExist)
        changeSectionHeight("section2", symbolsThatNotExist)

        let section = document.getElementById('unknownDiv2')
        let newP = document.createElement("p")
        newP.textContent = "Немає";
        section.appendChild(newP);

        section.style.height = "80px";
    }
}