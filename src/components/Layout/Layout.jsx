import { Outlet } from "react-router-dom"

import Header from "../header/Header"
import {FC} from "react"
import Footer from "../Footer/Footer"


const Layout = ()=>{
    return(<>  <Header/>
         <div style={{
            marginTop:"100px",
            minHeight:"700px"
         }}>
        <Outlet/>
         </div>
         <Footer/>
   </>)
}

export default Layout;
