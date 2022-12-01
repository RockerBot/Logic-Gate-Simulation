import React, { Component } from 'react'
import '../css/signup.css'
import {SERVER_URL } from "../Constants"

export class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            pass:"",
            parent: props.parent,
        }
        this.sendToDb = this.sendToDb.bind(this);
    }
    sendToDb(email, pass){
        console.log(email, pass);
        // console.log(SERVER_URL+`/loginInfo/?email=${email}&pass=${pass}`)
        // var fetchurl = SERVER_URL+"/loginInfo/?email="+this.state.email+"&pass="+this.state.pass;
        var fetchh = fetch(SERVER_URL.base+SERVER_URL.login+"/?email="+this.state.email+"&pass="+this.state.pass);
        this.state.parent.setState({name: email});
        fetchh.then((response)=>{
            // console.log(response)
            // alert(JSON.stringify(response.body))
            response.json()
        }).then(data=>alert("DATa",JSON.stringify(data)))
    }
    render() {
        return (<div className={"page"} >
            {/* <br></br><br></br><br></br><br></br> */}
            <div className={"fieldset"}>
                <p id="heading">Login</p>
                {/* <form id="formtag" onSubmit={(e)=>this.sendToDb(this.state.email,this.state.pass)}> */}
                <form id="formtag" action={SERVER_URL.base+SERVER_URL.login+"/?email="+this.state.email+"&pass="+this.state.pass} method='GET'>
                    <div id="info">
                        <div>
                            {/* <label htmlFor="email">E-mail ID: </label> */}
                            <input required placeholder="Email" type="email" 
                            name="email" id="email" value={this.state.email}
                            onChange={e=>this.setState({email:e.target.value})}/>
                            <br></br><br></br>
                        </div>

                        <div>
                            {/* <label htmlFor="pass">Password: </label> */}
                            <input required placeholder="Password" type="password"
                            name="pass" id="pass" value={this.state.pass}
                            onChange={e=>this.setState({pass:e.target.value})}/>
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