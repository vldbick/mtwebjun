

let notesValid = gN()
let notes;
notesValid ?
    notes = notesValid :
    notes = [
        {
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam voluptatem soluta voluptates nostrum optio assumenda quia quo saepe, perferendis, odiodoloremque eaque expedita",
            state: 'active',
            time: '22.01.2012'
        },
        {
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam voluptatem soluta voluptates nostrum optio assumenda quia quo saepe, perferendis, odiodoloremque eaque expedita",
            state: 'active',
            time: '22.01.2012'
        }
    ]


sN(notes);

window.addEventListener("load", () => {
    updateNotes()

    document.querySelector('#i-btn').addEventListener('click', (ev) => {
        const inp = document.querySelector('#i-text')
        const val = inp.value;
        const notes = gN();
        inp.value = '';

        if (val.length > 0) {
            const note = new Note(val, 'active');
            if (ev.target.value == 'EDIT') {
                const id = ev.target.alt;
                ev.target.value = 'ADD';
                notes.splice(id, 1, note);
            } else {
                notes.push(note);
            }

            sN(notes);
            updateNotes()
        }

    })
})



class Note {
    constructor(content, state) {
        this.content = content;
        this.state = state;
        this.time = howTime();
    }
}

function howTime() {
    let today = new Date();
    let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    let month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1); // Додаємо 1, оскільки місяці в JavaScript нумеруються з 0
    let year = today.getFullYear();

    return day + '.' + month + '.' + year;
}

function createNote({ content, state, time }, id) {
    const tr = document.createElement('tr');
    state == 'active' ? tr.classList.add('note-active') : tr.classList.add('note-archive');

    tr.innerHTML = `<td class="td-id">${id + 1}</td>
    <td class="td-content">${content}</td>
    <td class="td-tools">
        <div class="tools-container">
            <div class="t-edit" onclick={editNote(${id})}><img src="./img/edit.png" alt=""></div>
            <div class="t-archive" onclick={archiveNote(${id})}><img src="./img/envelope.png" alt=""></div>
            <div class="t-del" onclick={deleteNote(${id})}><img src="./img/cross.png" alt=""></div>
        </div>
    </td>
    <td class="td-date">${time}</td>`;

    return tr;
}

function updateNotes() {
    const holder = document.querySelector('.t-body');
    holder.innerHTML = '';

    const notes = gN()

    notes.forEach((el, id) => {
        const note = createNote(el, id)
        holder.append(note);
    });
}

function deleteNote(id) {
    const notes = gN();
    notes.splice(id, 1);
    sN(notes)
    updateNotes()
}

function archiveNote(id) {
    const notes = gN();
    const obj = notes[id];
    if (obj.state == 'active') {
        obj.state = 'archive'
    } else {
        obj.state = 'active'
    }
    notes.splice(id, 1, obj);
    sN(notes)
    updateNotes()
}

function editNote(id) {
    const inp = document.querySelector('#i-text');
    const btn = document.querySelector('#i-btn');
    const obj = notes[id];
    inp.value = obj.content;
    btn.value = 'EDIT'
    btn.alt = id;
}

function gN() {  //get notes
    const notesStr = sessionStorage.getItem("notes");
    return JSON.parse(notesStr);
}

function sN(cont) {   //set notes
    sessionStorage.setItem("notes", JSON.stringify(cont));
}


