import {Form} from "react-bootstrap";
import { editNotes } from "../services/services";
import FileBase from "react-file-base64"; 
import {useState} from "react";
import { useDispatch } from "react-redux";
import changeNoteCount from "../actionCreators/changeNoteCount";
import "./EditForm.css";

export default function EditForm(props){
    const [image,imageUpdate]=useState(props.image);
    const dispatch = useDispatch();
    const editThis = async (e)=>{
        const user =JSON.parse(localStorage.getItem('profile'));
        e.preventDefault();
        const id = props.id;
        const data={
            name:e.target.title.value,
            desc:e.target.desc.value,
            image: image,
            tag:e.target.tag.value,
            pinned:props.pinned
        }
        dispatch(changeNoteCount());
        await editNotes(user,id,data);
        dispatch(changeNoteCount());
    }

    return (
        <Form  onSubmit={editThis}> 
            <Form.Group controlId="title">
                <Form.Label style={{fontWeight:"bold"}}>Title</Form.Label>
                <Form.Control required name="title" defaultValue={props.title} as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="tag">
                <Form.Label style={{fontWeight:"bold"}}>Tagline</Form.Label>
                <Form.Control required name="tag" defaultValue={props.tag} as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label style={{fontWeight:"bold"}}>Description</Form.Label>
                <Form.Control required name="desc" defaultValue={props.desc} as="textarea" rows={3} />
            </Form.Group>
            <div>
                <FileBase required type="file" multiple={false} name="file" onDone={({ base64 }) => {imageUpdate(base64);console.log("DONE")}} />
            </div>
            <button className="btn-submit">SUBMIT <i className="fas fa-check"></i></button>
        </Form>
    );
}