import { rendernotes } from "./render.js";
let archivecontainer=document.getElementById("archivecontainer");
let notesarr=JSON.parse(localStorage.getItem("notes"))||[];

archivecontainer.addEventListener("click",(e)=>
{
    let type=e.target.dataset.type;
    let noteid=e.target.dataset.id;
    switch(type)
        {
            case "delete":
                notesarr=notesarr.filter(({id})=>id.toString()!==noteid);
                archivecontainer.innerHTML=rendernotes(notesarr.filter(({archive})=>archive));
                localStorage.setItem("notes",JSON.stringify(notesarr));
                break;
            case "archive":
                notesarr=notesarr.map(note=>note.id.toString()===noteid?{...note,archive:!note.archive}:note);
                archivecontainer.innerHTML=rendernotes(notesarr.filter(({archive})=>archive));
                localStorage.setItem("notes",JSON.stringify(notesarr));
            case "pin":
                break;
        }
});
archivecontainer.innerHTML=rendernotes(notesarr.filter(({archive})=>archive));