// import React, { Component } from 'react'
// import "../css/TopNav.css"
// import Form from './signup'
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'


// export class TopNav extends Component {
//   render() {
//     return (<div className='top_nav'>
//         {/* <div ><a href='https://www.google.com/'> */}
//         <BrowserRouter>
//           <Link to={"/signup"}><img width="30px" height="30px" src={require("../res/Person.png")}/></Link>
      
//               <Routes>
//                 <Route exact path='/signup' element={<Form/>}></Route>
//               </Routes>
//         </BrowserRouter>

            
//     </div>)
//   }
// }

// export default TopNav


import React, { Component } from 'react'
import "../css/TopNav.css"

export class TopNav extends Component {
  render() {
    return (<div className='top_nav'>
        <div >
          <a href='https://www.google.com/'><img width="30px" height="30px" src={require("../res/Person.png")}/></a>
          </div>
    </div>)
  }
}

export default TopNav