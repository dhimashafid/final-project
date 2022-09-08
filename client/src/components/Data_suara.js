import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Data_suara extends Component {
	inputpassword(){
		let passwd = "";
		passwd = window.prompt("Silahkan masukkan password Admin :","");
		while (passwd !== "password"){
			passwd = window.prompt("Password yang dimasukkan salah, silahkan masukkan kembali","");
		}
	}
	render() {
		return (
			<div className="col-md-13">
				<h3><b>Data Suara</b></h3>
				<hr className="my-4"/>

						<Link to="/filter_alamat"><button className="btn btn-dark" button-inline="true" onClick={this.KPSpass}>Filter Alamat</button></Link> <span></span>
						<Link to="/filter_kota"><button className="btn btn-primary" data-inline="true" onClick={this.KPSpass}>Filter Kota</button></Link> <span></span>
						<Link to="/filter_provinsi"><button className="btn btn-outline-secondary" data-inline="true" onClick={this.KPSpass}>Filter Provinsi</button></Link> <span></span>
						<Link to="/filter_nourut"><button className="btn btn-secondary" data-inline="true" onClick={this.KPSpass}>Filter No Urut</button></Link> <span></span>
						<Link to="/datapemohon"><button className="btn btn-success" data-inline="true">Cek Status</button></Link> <span></span>
						
				<table className="table table-bordered">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Alamat</th>
							<th scope="col">Kota</th>
							<th scope="col">Provinsi</th>
							<th scope="col">Hash</th>
							{/* <th scope="col">Hash</th> */}
						</tr>
					</thead>
					<tbody>
						{this.props.sertifikats.filter(p => p.owner === this.props.account).length > 0
							? this.props.sertifikats
								.filter(p => p.owner === this.props.account)
								.map((sertifikat, key) => {
								return (
									<tr key={key}>
										<th scope="row">{key+1}</th>
										<td>{sertifikat.alamat}</td>
										<td>{sertifikat.kota}</td>
										<td>{sertifikat.prov}</td>
										<td>{sertifikat.hash_sertifikat}</td>
										{/* <td></td>										 */}
									</tr>
								)
								})
							: <tr><td colSpan="7" className="text-center">Data sertifikat suara tidak ditemukan.</td></tr>
						}
					</tbody>
				</table>
				
			</div>
		)
	}
}

export default Data_suara