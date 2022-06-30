import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import GoogleLogin from 'react-google-login';
import AddNote from "./Form";
import changeUser from "../actionCreators/changeUser";
import {Navbar,Nav,Modal} from "react-bootstrap";
import "./Navbar.css";


//MODAL TO ALLOW NEW NOTE SUBMISSION -> BOOTSTRAP MODAL
function FormModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header style={{backgroundColor:"#d191df",textAlign:"center"}} closeButton>
          <Modal.Title >
            <span className="modal-head">Add A NOTE!</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#d191df"}}>
        {/*AddNote -> form to allow new submission */}
         <AddNote/>
        </Modal.Body>
      </Modal>
    );
  }
  
//NAVBAR COMPONENT EXPORTED
export default function Bar(){

  const dispatch = useDispatch();
  
  const [modalShow, setModalShow] =useState(false);//FOR MODAL VISIBILITY

  const note=useSelector((state)=>state.note);
  
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));//TO GET THE USER FROM LOCAL STORAGE AND SET IT TO "USER"
      const logout = () =>{
      dispatch({type:"LOGOUT"});
      setUser(null);
    }

  //IF THE USER IS LOGGED IN FROM BEFORE, THEN AN ACTION IS DISPATCHED TO UPDATE THE VALUE OF AUTH IN STORE
  if (user != null) {
    if (user.exp < new Date().getTime()) {
      logout();
    }
    dispatch(changeUser(user));
  }

  useEffect(()=>{
        setModalShow(false);
  },[note]);


  const loginSuccess = (res)=>{
    const result = res?.profileObj;
    const token = res?.tokenId;
    const exp=res?.tokenObj.expires_at;
    try {
      dispatch({type:"AUTH",data:{result,token,exp}});
      } catch (error) {
      }
      setUser(JSON.parse(localStorage.getItem('profile')));//IF LOGIN IS SUCCESSFUL, SET LOCAL PROFILE (LOCAL STORAGE)
    }
    const loginFail = (err)=>{
      console.log(err);
    }
    return( 
    <>
        <Navbar  variant="dark" className="nav-body ">
        <div className="container">
          <Navbar.Brand href="#home"> <span className="nav-txt" >Keep A Note</span></Navbar.Brand>
                <Nav className="ml-auto ">
                    {/* LOGIN WITH GOOGLE */}
                    {user?
                      <button className="login-text btn-g" onClick={logout}><span className="out-icon"> <i className="fas fa-sign-out-alt"></i><img src={user.result.imageUrl} alt={user.result.name} width="18px" height="18px" style={{borderRadius:"50%"}}/> </span> <span className="out-text">LOGOUT <img src={user.result.imageUrl} alt={user.result.name} width="22px" height="22px" style={{borderRadius:"50%"}}/></span> </button>
                      :
                      <GoogleLogin
                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENTID}`}
                        render={renderProps => (
                        <button className="btn-g" onClick={renderProps.onClick} id="btn-g-1" disabled={renderProps.disabled}><span className="login-text login-with login-text-2">LOGIN WITH </span><i className="fab fa-google"></i></button>
                        )}
                        buttonText="Login"
                        onSuccess={loginSuccess}
                        onFailure={loginFail}
                        cookiePolicy={'single_host_origin'}
                      />
                      
                    }
                    <button className={`login-text ${user?"btn-g":"btn-dis"}`} disabled={user?false:true}  onClick={() => setModalShow(true)}><span className="add-icon"><i className="fas fa-plus"></i></span><span className="add-text">ADD</span></button>
                </Nav>
        </div>
        </Navbar>
        <FormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
    </>
    )
}
