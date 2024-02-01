
window.addEventListener('load', loadnote);
window.addEventListener('change', loadnote);
if ('onvisibilitychange' in document)
    document.addEventListener('visibilitychange', storenotes);
else window.addEventListener('pagehide', storenotes);
var pin_key = false;
var color = ["#00A5E3", "#8DD7BF", "#FF96C5", "#FF5768", "#FFBF65", "#FC6238", "#FFD872", "#FFD872", "F2D4CC", "E77577", "6C88C4", "CO5780", "FF828B", "E7C582", "OOB0BA"];
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
const tempposition = document.createElement('div');
const ad = document.createElement('img');
const btn = document.createElement('img');
const CCM = document.createElement('div');
CCM.style.position = 'absolute';
CCM.style.width = 'fit-content';
// CCM.style.zIndex='10008'
const CustomContext = document.createElement('div');


const shadowRoot = CCM.attachShadow({ mode: 'open' });
const con_css = document.createElement('link');


con_css.href = chrome.runtime.getURL("note.css");
con_css.rel = "stylesheet";

shadowRoot.appendChild(con_css);
const adddiv = document.createElement('div');
const addspeek = document.createElement('div');

CustomContext.classList.add('custom');
adddiv.classList.add('addnotebtn');
addspeek.classList.add('addspeekbtn');

adddiv.appendChild(ad);
addspeek.appendChild(btn);

CustomContext.appendChild(adddiv);
CustomContext.appendChild(addspeek);
shadowRoot.appendChild(CustomContext);
// var i=0;
// function arro(){
//     window.addEventListener('pointerover',(e)=>{

//         console.log('Set'+i);
//         console.log('clientx:'+e.clientX,'clienty:'+e.clientY);
//         console.log('pageX:'+e.pageX,'pageY:'+e.pageY);
//         console.log('movementX:'+e.movementX,'movementY:'+e.movementY)
//         console.log('offsetX:'+e.offsetX,'offsetY'+e.offsetY);
//         i++;
//     })
// }
// arro();
function start() {

    window.addEventListener('contextmenu', (e) => {

        CCM.style.top = e.clientY + 'px';
        CCM.style.left = e.clientX - 85 + 'px';
        tempposition.style.top = e.pageY + 'px';
        tempposition.style.left = e.pageX - 120 + 'px';
        document.body.appendChild(CCM);
        // console.log(e.clientY);

    })
    ad.style.height = '30px'

    ad.style.cursor = "pointer";
    ad.style.zIndex = "100047";
    ad.src = chrome.runtime.getURL("images/add_icon-removebg-preview.png");

    ad.addEventListener("click", () => {
        addNote();

    })
    CustomContext.addEventListener('pointerout', () => {
        document.body.removeChild(CCM);
    })
}

start();
function addNote(
    url = '',
    content = ' ',
    id = get_id(),
    left = tempposition.style.left,
    top = tempposition.style.top
) {
    // console.log('left'+left,'top'+top);
    // ad.style.visibility = 'hidden';


    let note = document.createElement('high-notes');
    // note.onmousedown = selectnote;
    // note.ontouchstart = selectnote;
    const shadowRoot = note.attachShadow({ mode: 'open' });

    note.classList.add('note');
    note.id = id;
    var linkcss = document.createElement('link');
    linkcss.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css";
    linkcss.rel = "stylesheet";
    var notecss = document.createElement('link');
    notecss.href = chrome.runtime.getURL("note.css");
    notecss.rel = "stylesheet";
    shadowRoot.appendChild(linkcss);
    shadowRoot.appendChild(notecss);

    //note box

    const notebox = document.createElement('div');
    notebox.classList.add("note-box");
    notebox.style.zIndex = "10004";
    notebox.style.top = top;
    notebox.style.left = left;


    let textBox = document.createElement('div');
    textBox.contentEditable = true + "";
    textBox.classList.add('note-content');
    // textBox.onkeydown = keyDown;
    textBox.innerHTML = content;

    const noteBoxContent = document.createElement('div');
    noteBoxContent.classList.add("note-box-Content");
    noteBoxContent.style.backgroundColor = color[randomNumber(0, 14)];
    textBox.style.backgroundColor = noteBoxContent.style.backgroundColor;
    // console.log(noteBoxContent.style.backgroundColor);
    const bottombar = document.createElement('div');
    // console.log(noteBoxContent.style.backgroundColor);

    /** Logic for speek to write*/
    const micimage = document.createElement('img');
    micimage.src = chrome.runtime.getURL("images/mic.svg");
    micimage.role = 'img';
    micimage.classList.add('mic');
    micimage.addEventListener("click", () => {
        var speech = true;
        window.SpeechRecognition = window.webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
        recognition.interimResults = true;

        recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
            textBox.innerHTML = transcript;
            console.log(transcript);
        });

        if (speech == true) {
            recognition.start();
        }
    });



    //Logic of delet note
    const deletNote = document.createElement('img');
    deletNote.src = chrome.runtime.getURL("images/trash.svg");
    deletNote.classList.add('trash');
    deletNote.addEventListener("click", () => {
        document.body.removeChild(note);
        // deletenote(note.id);
        // console.log(note.id);
    })

    //Logic of saveAs.
    const save = document.createElement('img');
    save.classList.add('save');
    save.src = chrome.runtime.getURL("images/download.svg");
    save.addEventListener('click', () => {
        var data = textBox.innerHTML;
        //data.replace('<div>',' ');

        // console.log(data);
        var c = document.createElement("a");

        c.download = "user-text.txt";

        var t = new Blob([data], {
            type: "text/plain"
        });
        c.href = window.URL.createObjectURL(t);
        c.click();
    })


    const pin = document.createElement('img');
    pin.src = chrome.runtime.getURL("images/pin-angle-fill.svg");
    pin.classList.add('pin');
    deletNote.classList.add("bi-trash");
    bottombar.classList.add("Bottom-bar");
    bottombar.appendChild(micimage);
    bottombar.appendChild(deletNote);
    bottombar.appendChild(save)
    bottombar.appendChild(pin);

    noteBoxContent.appendChild(textBox);
    noteBoxContent.appendChild(bottombar);
    notebox.appendChild(noteBoxContent);
    shadowRoot.appendChild(notebox);

    document.body.appendChild(note);




    const bookmark = document.createElement('img');
    bookmark.classList.add('bookmarks');
    notebox.appendChild(bookmark);
    bookmark.style.left = noteBoxContent.style.left;
    bookmark.style.top = noteBoxContent.style.top;
    bookmark.src = chrome.runtime.getURL("images/bookmarks-fill.svg");
    bookmark.style.visibility = 'hidden';



    //Logic of pin and drag notes.
    pin.addEventListener('click', () => {
        pin_key = !pin_key;
        if (pin_key) {
            pin.src = chrome.runtime.getURL("images/pin-angle.svg");
        }
        else {
            pin.src = chrome.runtime.getURL("images/pin-angle-fill.svg");
        }

        if (!pin_key) {

            note.addEventListener('pointerout', () => {
                hidd();

            })
        }
        else {
            note.addEventListener('pointerout', () => {
                notebox.style.visibility = 'visible';
                bookmark.style.visibility = 'hidden';
            })
        }
        bookmark.addEventListener('click', () => {
            notebox.style.visibility = 'visible';
            bookmark.style.visibility = 'hidden';
        })
        notebox.addEventListener('pointerover', () => {
            notebox.style.zIndex = 100004;
        })
        notebox.addEventListener('pointerout', () => {
            notebox.style.zIndex = 10004;
        })

        if (pin_key) {
            notebox.onmousedown = function (e) {
                let shiftx = e.clientX - notebox.getBoundingClientRect().left;
                let shiftY = e.clientY - notebox.getBoundingClientRect().top;

                notebox.style.position = 'absolute';

                moveAt(e.pageX, e.pageY);

                function moveAt(pageX, pageY) {
                    notebox.style.left = pageX - shiftx + 'px';
                    notebox.style.top = pageY - shiftY + 'px';
                }

                function onMouseMove(event) {
                    moveAt(event.pageX, event.pageY);
                }

                // move the ball on mousemove
                document.addEventListener('mousemove', onMouseMove);

                // drop the ball, remove unneeded handlers
                notebox.onmouseup = function () {
                    document.removeEventListener('mousemove', onMouseMove);
                    notebox.onmouseup = null;
                };
                notebox.ondragstart = function () {
                    return false;
                }

            }
        }
        else {

            notebox.onmousedown = null;
        }
    });

    storenotes();
    function hidd() {
        notebox.style.visibility = 'hidden';
        bookmark.style.visibility = 'visible';
    }
}




function get_id() {
    var id = Math.floor(Math.random() * 1000);
    return `notes-id-${id}`;
}
/**
 * @typedef Note
 * @type {object}
 * @property {string} id
 * @property {string} content
 * @property {string} color
 */
class Note {
    constructor(url = ' ', content = ' ', id, left = ' ', top = ' ') {
        this.url = url;
        this.content = content;
        this.id = id;
        this.left = left;
        this.top = top;
    }
}
/**
 * storeNotes stores any notes that are on the
 * screen in local storage
 *
 * @returns {void}
 */
function storenotes() {
    // /**
    //  * @type {HTMLDivElement[]}
    //  */

    const noteElement = Array.from(document.getElementsByClassName('note'));

    url = window.location.pathname;
    const noteObject = [];
    noteElement.forEach((note) => {

        noteObject.push(
            new Note(
                url,
                note.shadowRoot.children[2].children[0].children[0].innerHTML,
                note.id,
                note.shadowRoot.children[2].style.left,
                note.shadowRoot.children[2].style.top
            )
        );
    });


    localStorage.setItem('notes', JSON.stringify(noteObject));
}

function loadnote() {
    const data = localStorage.getItem('notes');
    if (data === null) return;
    const url = window.location.pathname;
    const noteObject = JSON.parse(data);
    noteObject.forEach((note) => {
        if (url === note.url) {
            addNote(note.url, note.content, note.id, note.left, note.top);

        }
    });
}

//delete logic for  local Storage
// function deletenote(notes) {
//     const data = localStorage.getItem('notes');
//     if (data === null) return;
//     const noteObject = JSON.parse(data);
//     noteObject.forEach((note) => {
//         if (notes === note.id) {
//              console.log(noteObject);
//              console.log(note)
//             console.log( noteObject.indexOf(note));
//             var idex= noteObject.indexOf(note);
//             console.log(noteObject.splice(idex,1));
//             console.log(noteObject);
//             storenotes();
//         }
//     });
// }

//logic of speak

var voiceName = 'Microsoft David - English (United States) (en-US) -- DEFAULT';
var selectedText;

btn.src = chrome.runtime.getURL("images/text-speech.png");

btn.style.height = 42 + 'px';
btn.style.width = 36 + 'px';
btn.style.cursor = 'pointer';




btn.addEventListener('click', () => {
    readText(selectionText = window.getSelection().toString());
})

function readText(text) {
    if (text.length == 0) { text = "Please select text"; };

    speechSynthesis.cancel();
    selectedText = text;


    speakText();
}




function speakText(language) {


    {
        var readSpeed = 0.94;

        var voices = speechSynthesis.getVoices();

        var voiceObj = voices.filter(function (voice) { return voice.name == voiceName; })[0];


        selectedText = selectedText.replace(/: /g, ". ");
        selectedText = selectedText.replace(/- /g, ". ");
        selectedText = selectedText.replace(/\?/g, ". ");
        selectedText = selectedText.replace(/!/g, ". ");
        selectedText = selectedText.replace(/  /g, ". ");
        selectedText = selectedText.replace(/\n/g, ". ");
        selectedText = selectedText.replace(/\r/g, ". ");
        selectedText = selectedText.replace(/\f/g, ". ");
        var textParts = selectedText.split('. ');



        const MAX_LENGTH = 200;
        for (i = 0; i < textParts.length; i++) {
            var subParts = [];
            var remText = textParts[i];
            while (remText.length > MAX_LENGTH) {
                remSlice = remText.substr(0, MAX_LENGTH);
                if (remSlice.lastIndexOf(',') > 0) {
                    lastIndex = remSlice.lastIndexOf(',');
                } else if (remSlice.lastIndexOf(' or ') > 0) {
                    lastIndex = remSlice.lastIndexOf(' or ');
                } else if (remSlice.lastIndexOf(' but ') > 0) {
                    lastIndex = remSlice.lastIndexOf(' but ');
                } else if (remSlice.lastIndexOf(' because ') > 0) {
                    lastIndex = remSlice.lastIndexOf(' because ');
                } else if (remSlice.lastIndexOf(' nor ') > 0) {
                    lastIndex = remSlice.lastIndexOf(' nor ');
                } else if (remSlice.lastIndexOf(' yet ') > 0) {
                    lastIndex = remSlice.lastIndexOf(' yet ');
                } else if (remSlice.lastIndexOf(' so ') > 0) {
                    lastIndex = remSlice.lastIndexOf(' so ');
                } else if (remSlice.lastIndexOf(' ') > 0) {
                    lastIndex = remSlice.lastIndexOf(' ');
                } else {
                    lastIndex = MAX_LENGTH;
                }

                subParts.push(remText.substr(0, lastIndex));
                remText = remText.substr(lastIndex, remText.length);
            }
            subParts.push(remText);

            for (j = 0; j < subParts.length; j++) {
                //	console.log("SPEAK: " + subParts[j] + " [" + textLanguage + "- " + readSpeed + "]");
                var utterance = new SpeechSynthesisUtterance(subParts[j]);
                utterance.voice = voiceObj;
                utterance.rate = readSpeed;
                speechSynthesis.speak(utterance);
                if (i == (textParts.length - 1) && j == (subParts.length - 1)) {
                    utterance.onend = function () {
                        speechSynthesis.cancel();
                    };
                }
            }
        }
    }

}


