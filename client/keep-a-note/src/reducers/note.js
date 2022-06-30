export default  function note(state=0,action){
    switch(action.type){
        case "MODIFY_NOTE_COUNT":
            return ++state;
        default:
            return state;
    }
}