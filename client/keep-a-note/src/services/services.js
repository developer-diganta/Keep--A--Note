import axios from "axios";


export async function getNotes(user){
    const a=await axios.post("http://localhost:5000/api/getNotes",{token:user});
    if(a.data.length===0){
        return ([]);
    }
    else
    return await a.data[0].notes;
};

export async function addNotes(user,data){
    var a="sample";
    a=await axios.post("http://localhost:5000/api/addNotes",{token:user,data:data});
    console.log(a);
    return "SUCCESS";
}

export async function deleteNotes(user,id){
    var a=await axios.post("http://localhost:5000/api/deleteNotes",{token:user,id:id});
    return await a;
}

export async function editNotes(user,id,data){
    var a = await axios.post("http://localhost:5000/api/editNotes",{token:user,id:id,data});
}
