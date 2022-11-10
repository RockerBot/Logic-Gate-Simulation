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
        
        <div class="page">
            <div id="navbar"><h1>Logic Gate Simulator</h1></div>
            <br></br><br></br><br></br>
            <center>
                <fieldset class="fieldset">
                <center><h1 id="heading">Sign Up</h1></center>
                    <form action="">
                        <div id="info">

                        <div>
                            <label htmlFor="first">First Name<span id="star">*</span>: </label>
                            <input required type="text" placeholder="Abc" name="first" id="first" value={first} onChange={(e)=>setFirst(e.target.value)}></input><br></br><br></br>
                        </div>
                        
                        <div>
                            <label htmlFor="last">Last Name<span id="star">*</span>: </label>
                            <input required type="text" placeholder="Xyz" name="last" id="last" value={last} onChange={(e)=>setLast(e.target.value)}></input><br></br><br></br>
                        </div>

                        <div>
                            <label htmlFor="dob">Date of Birth<span id="star">*</span>: </label>
                            <input required type="date" name="dob" id="dob" value={dob} onChange={(e)=>setDob(e.target.value)}></input><br></br><br></br>
                        </div>

                        <div>
                            <label htmlFor="prof">Profession: </label>
                            <select name="prof">
                                <option value="0" selected disabled hidden>Select</option>
                                <option value={prof} onChange={(e)=>setProf(e.target.value)}>Developer/Engineer</option>
                                <option value={prof} onChange={(e)=>setProf(e.target.value)}>Student</option>
                                <option value={prof} onChange={(e)=>setProf(e.target.value)}>Other</option>
                            </select><br></br><br></br>
                        </div>

                        <div>
                            <label htmlFor="college">Institution/Company: </label>
                            <input type="text" name="college" id="college" value={college} onChange={(e)=>setCollege(e.target.value)}></input><br></br><br></br>
                        </div>

                        <div>
                            <label htmlFor="phone">Phone No.: </label>
                            <input type="tel" name="phone" id="phone" placeholder="xxxxxxxxxx" pattern="+[0-9]{2}-[0-9]{10}" value={phone} onChange={(e)=>setPhone(e.target.value)}></input><br></br><br></br>
                        </div>

                        <div>
                            <label htmlFor="email">E-mail ID<span id="star">*</span>: </label>
                            <input required placeholder="abc@def.com"type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input><br></br><br></br>
                        </div>

                        <div>
                            <label htmlFor="passw">Password<span id="star">*</span>: </label>
                            <input required type="password" name="passw" id="passw" value={passw} onChange={(e)=>setPassw(e.target.value)}></input><br></br><br></br>
                        </div>
                        
                        <center><button type="submit" id="but">Sign Up</button></center>
                        
                        </div>
                    </form>
                </fieldset>
                
            </center>
            
        </div>
    )    
}

export default Form