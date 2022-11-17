import React,{useState} from "react";
import '../css/signup.css'

const Form=()=>{
    const[first,setFirst]=useState("");
    const[last,setLast]=useState("");
    const[dob,setDob]=useState("");
    const[phone,setPhone]=useState("");
    const[prof,setProf]=useState("");
    const[college,setCollege]=useState("");
    const[email,setEmail]=useState(""); 
	const[passw,setPassw]=useState("");
    const[dataInput,setDataInput]=useState("");
    return(
        
        <div className={"page"} >
            {/* <br></br><br></br><br></br><br></br> */}
                <div className={"fieldset"}>
                    <p id="heading">Login</p>
                    <form action="" id="formtag">
                        <div id="info">
                            <div>
                                {/* <label htmlFor="email">E-mail ID: </label> */}
                                <input required placeholder="Email" type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                                <br></br><br></br>
                            </div>

                            <div>
                                {/* <label htmlFor="passw">Password: </label> */}
                                <input required placeholder="Password" type="password" name="passw" id="passw" value={passw} onChange={(e)=>setPassw(e.target.value)}></input>
                                <br></br><br></br>
                            </div>
                            <div className="login-button-container">
                                <button type="submit" id="but" className="lginbutton">Login</button>
                            </div>
                        
                        </div>
                    </form>
                </div>
        </div>
    )    
}

export default Form