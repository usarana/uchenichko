// contentResolver.js

// Маркираме уроците, които са изгледани
function markWatched(subject) {
    window.addEventListener("pageshow", function (event) { // Ако използваме бутон за връщане назад, страницата се 
                                                           // рефрешва, защото урока няма да се маркира като изгледан
        var historyTraversal = event.persisted || 
            (typeof window.performance != "undefined" && 
            window.performance.getEntriesByType("navigation")[0].type === 2 );
        
        if (historyTraversal) {
            window.location.reload();
        }
    });
    let lessonsCnt = document.getElementsByClassName("lesson").length; // Намиране брой уроци
    for(let i = 1; i <= lessonsCnt; i++) {
        if(localStorage.getItem(subject + i.toString()) == 1) { // Ако е маркиран като изгледан
            const watched = document.createElement("p"); // Създаваме елемент "Изгледано"
            watched.innerHTML = "<strong>&check; Изгледано</strong>";
            watched.style.color = "green"; // Зелен цвят
            let lastLesson = document.getElementsByClassName("lesson")[i-1]; // i-1вия елемент (броенето започва от 0) 
            if(lastLesson.children.length == 1) lastLesson.appendChild(watched); // Ако няма hr, добавяме го като последен елемент
            else lastLesson.insertBefore(watched, lastLesson.lastChild); // Иначе добави преди hr
        }
    }
    try {
        renderMathInElement( // Изобразяване на LaTeX частите от урока, ако има такива
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
}

// Зарежда страницата с избрания урок и предава id-то му като аргумент.
function resolve(contentId) {
    let loc = "content/";
    // Страницата по съответния клиент
    if(contentId.startsWith('m')) loc += 'math.html';
    else if(contentId.startsWith('l')) loc += 'literature.html';
    else if(contentId.startsWith('b')) loc += 'bulgarian.html';
    // Добавяне на аргумент, премахване на буквата на дадения предмет.
    loc += "?id=" + contentId.slice(1);
    // Отваряне
    window.location.href = loc;
    // Готови сме!
}