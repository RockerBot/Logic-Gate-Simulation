import React, { Component } from 'react'
import '../css/signup.css'
import {SERVER_URL } from "../Constants"

// function sendToDb(email, passw){
//     console.log(email, passw);
//     // var response = await fetch(SERVER_URL+`/signs?${email}&${passw}`);
//     // response = await response.json();

// }
export class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            passw:"",
            parent: props.parent,
        }
        this.sendToDb = this.sendToDb.bind(this);
    }
    sendToDb(email, passw){
        console.log(email, passw);
        // console.log(SERVER_URL+`/loginInfo/?email=${email}&pass=${passw}`)
        // var fetchurl = SERVER_URL+"/loginInfo/?email="+this.state.email+"&pass="+this.state.passw;
        var fetchh = fetch(SERVER_URL+"/loginInfo/?email="+this.state.email+"&pass="+this.state.passw);
        this.state.parent.setState({name: email});
        fetchh.then((response)=>{
            console.log(response)
        })
    }
    render() {
        return (<div className={"page"} >
            {/* <br></br><br></br><br></br><br></br> */}
            <div className={"fieldset"}>
                <p id="heading">Login</p>
                <form id="formtag" onSubmit={(e)=>this.sendToDb(this.state.email,this.state.passw)}>
                    <div id="info">
                        <div>
                            {/* <label htmlFor="email">E-mail ID: </label> */}
                            <input required placeholder="Email" type="email" 
                            name="email" id="email" value={this.state.email}
                            onChange={(e)=>this.setState({email:e.target.value})}/>
                            <br></br><br></br>
                        </div>

                        <div>
                            {/* <label htmlFor="passw">Password: </label> */}
                            <input required placeholder="Password" type="password"
                            name="passw" id="passw" value={this.state.passw}
                            onChange={(e)=>this.setState({passw:e.target.value})}/>
                            <br></br><br></br>
                        </div>
                        <div className="login-button-container">
                            <button type="submit" id="but" className="lginbutton">Login</button>
                        </div>
                    
                    </div>
                </form>
            </div>
        </div>)
    }
}

export default Form