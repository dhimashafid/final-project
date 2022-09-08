import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Filter_alamat extends Component {
	constructor(props) {
		super(props)
		this.state = {
			alamat:'',
			value: '', 
			watching: false
		}
		this.onFind = this.onFind.bind(this)
	}
	
	onFind (value) {
		this.setState({ value, watching: false })
	}

	render() {
		return (				
			<div className="col-md-12">
				<h3><b>Filter Berdasarkan Alamat</b></h3>	
				<div className="col-md-9">
								
					<p>    </p>
					<form 
						onSubmit={(event) => {
							event.preventDefault()
							const alamat = this.alamat.value
							this.setState({alamat:alamat})
						}}>
						<div className="form-group mr-sm-2">
							<label htmlFor="alamat">Masukkan alamat</label>
							<input
							id="alamat"
							type="text"
							ref={(input) => { this.alamat = input }}
							className="form-control"
							placeholder="Masukkan alamat tinggal"
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
						<th scope="col">#</th>
							<th scope="col">Kota</th>
							<th scope="col">Provinsi</th>
							<th scope="col">Hash</th>
						</tr>
					</thead>
					<tbody>
						
						{(this.props.sertifikats.filter(p => p.owner === this.props.account).length > 0)
							? this.props.sertifikats
								.filter(p => p.owner === this.props.account && p.alamat === this.state.alamat)
								.map((sertifikat, key) => {
								return (									
									<tr key={key}>
										<th scope="row">{key+1}</th>
										<td>{sertifikat.kota}</td>
										<td>{sertifikat.prov}</td>										
										<td>{sertifikat.hash_sertifikat}</td>
										<td>Valid</td>									
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

export default Filter_alamat