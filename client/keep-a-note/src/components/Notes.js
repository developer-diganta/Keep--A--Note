import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import Note from "./Note";
import {getNotes} from "../services/services";
import loaderGif from "./note-loader.gif";
import "./Notes.css";

  function createNote(x,i){
    return <Note id={x.id} key={i} title={x.name} desc={x.desc} image={x.image} pinned={x.pinned} tag={x.tag} />
  }

  export default function Notes(props){
    const [note,updateNote]=useState([]);
    const [loader,updateLoader]=useState(true);
    const user=useSelector((state)=>state.auth);
    const noteCount = useSelector((state) => state.note);
    const noOfNotes = 6;
    const [activePage,updateActivePage]=useState(1);
    const [notesPerPage, updateNotesPerPage] = useState([]);
    const [noOfPages, updateNoOfPages] = useState(0);
    const start = (1- 1) * 6;
    useEffect(()=>{
        async function fetchNotes(){
            updateLoader(true)
          const userFetch = JSON.parse(user);
          if (user===null){
              updateLoader(false)
            updateNote([]);
          }
          else{
            const n = await getNotes(userFetch);
            const pinnedNotes = n.filter(x=>x.pinned===true);
            const unPinnedNotes = n.filter(x => !x.pinned);
            const structuredNotes = pinnedNotes.concat(unPinnedNotes);
            console.log("qqqqq",structuredNotes);
            updateNote(structuredNotes); 
            updateLoader(false);
            console.log(note)
            updateNotesPerPage(structuredNotes.slice(start, start + 6));
          }
        }
        fetchNotes();
        },[user,noteCount]);

    const pageClick = (i) => {
      console.log("WWW", i);
      const up = i + 1;
      updateActivePage(i);
      updateNotesPerPage(note.slice((i - 1) * 6, (i - 1) * 6 + 6));
    }

        return( 
            <div className="container">
                <div className="row">
                {loader?<div className="loader-gif"><img  src={loaderGif} alt="LOADING"/><br/>Loading Your Notes!</div>:""}
              {notesPerPage.map(createNote)}
            </div>
            <div class={`${note.length > 0 && Math.ceil(note.length/6)!==1 ? "show" : "hide"}`}>
                  <nav aria-label="Page navigation example" className="cnt">
                    <ul class="pagination">
                  {Array.from(Array(Math.ceil(note.length/6)), (e, i) => <li class="page-item"><span class={`${activePage===i+1?"activepage page-link" : "page-link"} `} onClick={() => { pageClick(i+1) }}>{i+1}</span></li>)}
                    </ul>
                  </nav>
              </div>
            </div>
        )
}