// displayContent.js

// Изобразяване на урока
function display(subject) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const divId = subject + id;
    // Избиране на div-а, в който се съдържат материалите, които ни трябват
    const div = document.getElementById(subject + id);
    // Намиране на общ брой на уроци
    let limit = 6;
    if(subject == 'l') limit = 4;
    else if(subject == 'm') limit = 8;
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
    renderMathInElement( // Изобразяване на LaTeX частите от урока, ако има такива
        document.body,
        {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "\\[", right: "\\]", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false}
            ]
        }
    );
    // Готови сме!
}
