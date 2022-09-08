import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
	KPUpass(){
		let passwd = "";
		passwd = window.prompt("Silahkan masukkan password :","");
		while (passwd !== "0666120426"){
			passwd = window.prompt("Password yang dimasukkan salah, silahkan masukkan kembali","");
		}
	}
	KPSpass(){
		let passwd = "";
		passwd = window.prompt("Silahkan masukkan password :","");
		while (passwd !== "0666120426"){
			passwd = window.prompt("Password yang dimasukkan salah, silahkan masukkan kembali","");
		}
	}
	render() {
		return (
			<div id="content" className="col-md-12 d-flex justify-content-center text-center align-items-center">
				<div className="col-md-4 d-flex flex-column">
					<hr className="my-7"/>
					<h2><b>Login Sebagai</b></h2>
					<Link to="/input_kandidat"><button className="btn btn-danger btn-lg mt-4" style={{minWidth: '100px'}} onClick={this.KPUpass}>Admin KPU</button></Link>
					<span>or</span>
					<Link to="/data_suara"><button className="btn btn-outline-dark btn-lg" style={{minWidth: '100px'}} onClick={this.KPSpass}>Admin KPPS</button></Link>
					<span>or</span>
					<Link to="/input_suara"><button className="btn btn-warning btn-lg" style={{minWidth: '100px'}}>Masyarakat</button></Link>
				</div>
			</div>
		);
	}
}

export default Main;