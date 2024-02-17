// displayContent.js

// Намиране на общ брой уроци
function findTotalLessons(subject) {
    let total = 0;
    for(total++; document.getElementById(subject + total.toString()) !== null; total++);
    return --total;
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
    if(parseInt(id)>limit) document.getElementById('idErr').style.visibility = "visible";
    // Изтриване на всички други уроци
    for(let i = 1; i <= limit; i++) {
        if(i == parseInt(id)) continue;
        const div = document.getElementById(subject + i.toString());
        //console.log(subject + i.toString());
        div.remove();
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
