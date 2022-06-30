import './App.css';
import Bar from "./components/Navbar";
import Notes from "./components/Notes";
import Footer from "./components/Footer.js";

function App() {
  
  return (
    <div className="main-body">
      <Bar/>
      <div style={{margin:"20px"}}></div>
      <Notes/>
      <Footer/>   
    </div>
    );
  }
  export default App;