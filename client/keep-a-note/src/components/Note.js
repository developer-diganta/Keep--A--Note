import {Card} from "react-bootstrap";
import { deleteNotes } from "../services/services";
import { useSelector,useDispatch } from "react-redux";
import {useState,useEffect} from "react";
import EditForm from "./EditForm"; 
import changeNoteCount from "../actionCreators/changeNoteCount";
import { editNotes } from "../services/services";
import {Modal} from "react-bootstrap";
import "./Note.css";

function EditFormModal(props) {
    return (
      <Modal
        s{...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter2"
        centered
      >
        <Modal.Header style={{backgroundColor:"#d191df",textAlign:"center"}} closeButton>
          <Modal.Title >
            <span className="modal-head">Edit Note!</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#d191df"}}>
        <EditForm key={props.id} id={props.id} title={props.title} desc={props.desc} image={props.image} pinned={props.pinned} />
        </Modal.Body>
      </Modal>
    );
}
  
export default function Note(props){
    const dispatch = useDispatch();
    const userData = useSelector((state)=>state.auth);
    const user = JSON.parse(userData);
    const note=useSelector((state)=>state.note);
    const [modalEditShow, setModalEditShow] =useState(false);//FOR MODAL VISIBILITY
    const deleteThis =async ()=>{
        await deleteNotes(user,props.id);
        dispatch(changeNoteCount())
    }
    const [formDisplay,setFormDisplay] = useState("none");
    useEffect(()=>{
            setModalEditShow(false);
    },[note]);

    const addPin = async () => {
        const data = { ...props };
        data.pinned = true;
        data.name=props.title;
        await editNotes(user,props.id,data);
        dispatch(changeNoteCount());
    }

    const removePin = async () => {
        const data = { ...props };
        data.pinned = false;
        data.name = props.title;
        await editNotes(user, props.id, data);
        dispatch(changeNoteCount());
    }

    return (
        <div className="col-lg-4 col-md-6 col-xs-12 d-flex justify-content-center" >
            <Card style={{ width: '18rem', height: "30rem", overflow: "auto", margin: "10px", backgroundColor: "#3cf2ff" }}>
                <Card.Img variant="top" src={props.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCGFwGjXf7R4e7uMFvXxcXyiLCdM_G5mmPLA&usqp=CAU"} height="40%" />
                {props.pinned?<button onClick = {()=>removePin()}><i class="fas fa-thumbtack"></i></button>:<span></span>}
            <Card.Body  >
                <Card.Title style={{padding:"5px"}}><h3 style={{fontWeight:"900",textAlign:"center"}}>{props.title}</h3></Card.Title>
                <Card.Text >
                    <span style={{fontWeight:"bold"}}>{props.desc}</span>
                </Card.Text>
                <button onClick={deleteThis}><i className="fas fa-trash ico"></i></button>
                    <button onClick={() => setModalEditShow(true)} ><i className="fas fa-edit ico"></i></button>
                {!props.pinned?<button onClick = {()=>addPin()}><i class="fas fa-thumbtack"></i></button>:<span></span>}
                <div style={{padding:"3%"}}>
                <span style={{display:formDisplay,backgroundColor:"#d191df",padding:"2%",borderRadius:"5%"}}> 
                <button className="btn-close" onClick={()=>setFormDisplay("none")}>CLOSE <i className="fas fa-times"></i></button> 
                </span>
                </div>
            </Card.Body>
            </Card>
            <EditFormModal
                show={modalEditShow}
                onHide={() => setModalEditShow(false)}
                key={props.id} id={props.id} title={props.title} desc={props.desc} image={props.image} pinned={props.pinned} 
            />
        </div>   
    )
}

