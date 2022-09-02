import React from "react";
import './Header.css';


class Header extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="Header">
            <h3>Cadastro de Serviços</h3>
            </div>
        );
    }
}
export default Header;