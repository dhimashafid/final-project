import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	KPUpass(){
		let passwd = "";
		passwd = window.prompt("Silahkan masukkan password: ","");
		while (passwd !== "0666120426"){
			passwd = window.prompt("Password yang dimasukkan salah, silahkan masukkan kembali","");
		}
	}
	KPSpass(){
		let passwd = "";
		passwd = window.prompt("Silahkan masukkan password: ","");
		while (passwd !== "0666120426"){
			passwd = window.prompt("Password yang dimasukkan salah, silahkan masukkan kembali","");
		}
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg ">
				
				<div id="content" className="col-md-12 d-flex justify-content-center ">
				<Link
					className="navbar-brand"
					to="/"
					rel="noopener noreferrer"
				>
					<img src={require('./img/navibar.PNG')} width="1050" height="140" className="d-inline-block align-center" alt="logobrand" margin = "0 auto" />
					<hr></hr>
				</Link>
				
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				</div>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					
					{/* <div className="d-flex flex-column">
						<small className="nav-link text-dark p-0"><span id="account">Account: <b>{this.props.account}</b></span></small>
						<small className="nav-link text-dark p-0"><span id="account">Balance: <b>{this.props.balance} ETH</b></span></small>
					</div> */}
				</div>
			</nav>
		);
	}
}

export default Navbar;