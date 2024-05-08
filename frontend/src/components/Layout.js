import React from "react";
import SideBar from './Sidebar'

const Layout=(props)=>{
    return(
        <SideBar>
            <div style={{marginTop:'4rem'}}>
            {props.children}
            </div>
        </SideBar>
    )
}

export default Layout;