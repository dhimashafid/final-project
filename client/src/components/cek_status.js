import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class cek_status extends Component {
	constructor(props) {
		super(props)
		this.state = {
			nik:'',
			value: '', 
			watching: false
		}
		this.onFind = this.onFind.bind(this)
	}
	
	onFind (value) {
		this.setState({ value, watching: false })
	}
	printpage(){
		window.print()
	}

	render() {
		return (				
			<div className="col-md-12">
				<h3><b>Cek Status Memilih</b></h3>	
				<div className="col-md-9">
								
					<p>    </p>
					<form 
						onSubmit={(event) => {
							event.preventDefault()
							const nik = this.nik.value
							this.setState({nik:nik})
						}}>
						<div className="form-group mr-sm-2">
							<label htmlFor="nik">Masukkan NIK</label>
							<input
							id="nik"
							type="text"
							ref={(input) => { this.nik = input }}
							className="form-control"
							placeholder="Tempelkan smart card pada reader"
							required />
						</div>
						<button type="submit" className="btn btn-info">Check</button>
					</form>
				</div>
				
				<hr className="my-7"/>
				<h5><b>Data Suara</b></h5>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th scope="col"></th>
							<th scope="col">Nomor</th>
							<th scope="col">Alamat</th>
							<th scope="col">Kota</th>
							<th scope="col">Provinsi</th>							
							{/* <th scope="col">Hash Data</th> */}
							<th scope="col">Hash</th>
							<th scope="col">Status</th>
						</tr>
					</thead>
					<tbody>
						
						{(this.props.sertifikats.filter(p => p.owner === this.props.account).length > 0)
							? this.props.sertifikats
								.filter(p => p.owner === this.props.account && p.nik === this.state.nik)
								.map((sertifikat, key) => {
								return (									
									<tr key={key}>
										<th scope="row">{key+1}</th>
										<td>{sertifikat.nik}</td>
										<td>{sertifikat.alamat}</td>
										<td>{sertifikat.kota}</td>
										<td>{sertifikat.prov}</td>										
										<td>{sertifikat.hash_sertifikat}</td>
										<td><button type="button" className="btn btn-success" onClick={this.printpage}>Valid</button></td>										
									</tr>
								)
								})
							: <tr><td colSpan="6" className="text-center">Data sertifikat suara tidak ditemukan.</td></tr>
						}							
					</tbody>
						
				</table>
				<Link to="/Data_suara"><button className="btn btn-warning" button-inline="true">back</button></Link> <span></span>
			</div>
		)
	}
}


export default cek_status

