import { rendernotes } from "./render.js";

let title=document.getElementById("title");
let note=document.getElementById("note");
let add=document.getElementById("add");
let othernotes=document.getElementById("othernote");
let pinnednotes=document.getElementById("pinnote");
let displaynotes=document.getElementById("displaynotes");
let notesarr=JSON.parse(localStorage.getItem("notes"))||[];

add.addEventListener("click",(e)=>
{
    if(title.value.trim()!='' || note.value.trim()!='')
    {
        notesarr=[...notesarr,{id:Date.now(), title: title.value.trim(), note:note.value.trim(), pin:false, archive:false}]
        othernotes.innerHTML=rendernotes(notesarr.filter(({pin,archive})=>!pin && !archive));
        note.value=title.value="";
        localStorage.setItem("notes",JSON.stringify(notesarr));
    }
});

displaynotes.addEventListener("click",(e)=>
{
    let type=e.target.dataset.type;
    let noteid=e.target.dataset.id;
    switch(type)
    {
        case "delete":
            notesarr=notesarr.filter(({id})=>id.toString()!==noteid);
            othernotes.innerHTML=rendernotes(notesarr);
            localStorage.setItem("notes",JSON.stringify(notesarr));
            break;
        case "pin":
            notesarr=notesarr.map(note=>note.id.toString()===noteid?{...note,pin:!note.pin}:note);
            pinnednotes.innerHTML=rendernotes(notesarr.filter(({pin,archive})=>pin && !archive));
            othernotes.innerHTML=rendernotes(notesarr.filter(({pin,archive})=>!pin && !archive));
            localStorage.setItem("notes",JSON.stringify(notesarr));
            break;
        case "archive":
            notesarr=notesarr.map(note=>note.id.toString()===noteid?{...note,archive:!note.archive, pin:false}:note);
            pinnednotes.innerHTML=rendernotes(notesarr.filter(({pin,archive})=>pin && !archive));
            othernotes.innerHTML=rendernotes(notesarr.filter(({pin,archive})=>!pin && !archive));
            localStorage.setItem("notes",JSON.stringify(notesarr));
    }
});

pinnednotes.innerHTML=rendernotes(notesarr.filter(({pin,archive})=>pin && !archive));
othernotes.innerHTML=rendernotes(notesarr.filter(({pin,archive})=>!pin && !archive));