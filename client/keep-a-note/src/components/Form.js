import {Form} from "react-bootstrap";
import {addNotes} from "../services/services";
import {useState} from "react";
import { useDispatch,useSelector} from "react-redux";
import loader from "./loading.gif";
import changeNoteCount from "../actionCreators/changeNoteCount";
import FileBase from "react-file-base64"; 
import "./Form.css"

export default function AddNote(){
    const dispatch = useDispatch();
    const [image,imageUpdate]=useState("");
    const [loading,setLoading]=useState(false);
    const userData = useSelector((state)=>state.auth);
    const addThis = async (e)=>{
    e.preventDefault();
    const newNote={
        name:e.target.title.value,
        desc:e.target.desc.value,
        image: image,
        tag:e.target.tag.value,
        pinned: false,
    }
    const user=JSON.parse(userData);
    setLoading(true)
    await addNotes(user,newNote);
    dispatch(changeNoteCount());
    setLoading(false)
}

    return(<div>
        
        <Form className="form" onSubmit={addThis} style={{position:"relative"}}>
        {loading?<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",textAlign:"center"}}><img src={loader} width="75px" height="75px" alt="LOADING"/>Adding.....</div>:null}
            <Form.Group  controlId="title">
                <Form.Label  className="head-text">Title</Form.Label>
                <Form.Control required name="title" as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="tagline">
                <Form.Label className="head-text">Tagline</Form.Label>
                <Form.Control required name="tag" as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label className="head-text">Body</Form.Label>
                <Form.Control required name="desc" as="textarea" rows={3} />
            </Form.Group>
            <div>
                <FileBase  type="file" multiple={false} name="file" onDone={({ base64 }) => {imageUpdate(base64)}} />
            </div>
            <button className="btn-submit" type="submit">SUBMIT <i className="fas fa-check"></i></button>
        </Form>
        {/* <img src={image}/> */}
        </div>
    )
}