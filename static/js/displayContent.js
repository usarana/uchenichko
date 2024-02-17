// displayContent.js

// Намиране на общ брой уроци
function findTotalLessons(subject) {
    let total = 0;
    for (
        total++; 
        document.getElementById(
            subject + 
            total.toString()
        ) !== null; 
        total++
    );
    return --total;
}

// Намиране на общ брой задачи
function findTotalQuestions(lesson) {
    let total = 0;
    for (
        total++; 
        document.getElementById(
            lesson + 
            'q' + 
            total.toString() + 
            'a'
        ) !== null; 
        total++
    );
    return --total;
}

function shuffle(p) {
    /* Разбъркване чрез алгоритъма на Fisher-Yates */
    const shuffleArray = array => {
        return array.reduce(
            (newArray, _, i) => {
                var random = i + (Math.floor(Math.random() * (newArray.length - i)));
                [newArray[random], newArray[i]] = [newArray[i], newArray[random]];
                return newArray;
            },
        [...array]);
    };
  
    const shuffleArrayElements = (elements) => {
        const shuffled = shuffleArray(elements);
        let currentIndex = 0;
        elements.forEach((elem) => {
            $(elem).replaceWith($(shuffled[currentIndex]).get(0).outerHTML);
            currentIndex++;
        })
    };
    shuffleArrayElements(p);
}

// Изобразяване на урока
function display(subject) {
    // Параметри
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const divId = subject + id;

    // Избиране на div-а, в който се съдържат материалите, които ни трябват
    const div = document.getElementById(subject + id);
    let limit = findTotalLessons(subject); // Намиране общ брой уроци
    // console.log(limit);
    if(parseInt(id) > limit) document.getElementById('idErr').style.visibility = "visible";

    // Изтриване на всички други уроци
    for(let i = 1; i <= limit; i++) {
        if(i == parseInt(id)) continue;
        const div = document.getElementById(subject + i.toString());
        //console.log(subject + i.toString());
        div.remove();
    }

    // Разбъркване на отговорите на въпросите.
    for(let i = 0; i < findTotalQuestions(divId); i++) {
        let answersCurrQuestion = [];
        for(let j = 0; j < 4; j++) {
            answersCurrQuestion.push(
                document.getElementById(
                    divId + 'q' + 
                    (i + 1).toString() + 
                    String.fromCharCode('a'.charCodeAt(0) + j)
                )
            );
        }
        shuffle(answersCurrQuestion);
    }
    
    // Показване на избрания урок. 
    div.style.visibility = "visible";
    try { // Може и да няма LaTeX елементи, в такъв случай ще даде грешка
        renderMathInElement( // Изобразяване на LaTeX частите от страницата, ако има такива
            document.body,
            {
                strict: false,
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "\\[", right: "\\]", display: true},
                    {left: "$", right: "$", display: false},
                    {left: "\\(", right: "\\)", display: false}
                ]
            }
        );
    }
    catch {}
    // Готови сме!
}
