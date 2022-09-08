import React, { Component } from 'react';
// var QRCode = require('qrcode.react');

export class Input_suara extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	handleChange = e => {
		const { name, value } = e.target;
	
		this.setState({
		  [name]: value
		});
	  };
	
	render() {
		return (
			<div className="col-md-12" >
				<div className="col-md-4">
					<h3><b>Input Suara</b></h3>
					<hr></hr>
					<form 
						className="form-horizontal"
						onSubmit={(event) => {
							event.preventDefault()
							const nik = this.nik.value
							const no_user = this.no_user.value
							const alamat = this.alamat.value
							const kota = this.kota.value
							const prov = this.prov.value
							this.props.createSertif(nik, no_user, alamat, kota, prov)
						}}>
						
						
						<div className="form-group mr-sm-2">
							<label htmlFor="no urut">No Urut</label>
							<input
							id="no urut"
							type="text"
							ref={(input) => { this.no_user = input }}
							className="form-control"
							placeholder="Masukkan no urut kandidat dipilih"
							required />
						</div>
						
						<div className="form-group mr-sm-2">
							<label htmlFor="alamat">Alamat</label>
							<input
							id="alamat"
							type="text"
							ref={(input) => { this.alamat = input }}
							className="form-control"
							placeholder="Masukkan alamat tinggal"
							required />
						</div>
						<div className="form-group mr-sm-2">
							<label htmlFor="kota">Kota</label>
							<input
							id="kota"
							type="text"
							ref={(input) => { this.kota = input }}
							className="form-control"
							placeholder="Masukkan kota tinggal"
							required />
						</div>
						<div className="form-group mr-sm-2">
							<label htmlFor="prov">Provinsi</label>
							<input
							id="prov"
							type="text"
							ref={(input) => { this.prov = input }}
							className="form-control"
							placeholder="Masukkan provinsi tinggal"
							required />
						</div>
						
						<div className="form-group mr-sm-2">
							<label htmlFor="nik" >NIK</label>
							<input
							id="nik"
							type="text"
							ref={(input) => { this.nik = input }}
							className="form-control"
							placeholder="Tempelkan smart card pada reader"
							required />
						</div>
						
						<button type="submit" className="btn btn-info" >Submit Otomatis</button>
					</form>
				</div>	
							
			</div>
			
		)
	}
}

export default Input_suara