import React, { Component } from 'react'



export class Input_kandidat extends Component {
	render() {
		return (
			<div className="col-md-12">
				<div className="col-md-4">
					<h3><b>Input Kandidat</b></h3>
					<form 
						onSubmit={(event) => {
							event.preventDefault()
							const name = this.userName.value
							const no_user = this.no_user.value
							this.props.createUser(name, no_user)
						}}>
						<div className="form-group mr-sm-2">
							<label htmlFor="userName">Nama Kandidat</label>
							<input
							id="userName"
							type="text"
							ref={(input) => { this.userName = input }}
							className="form-control"
							placeholder="Masukkan nama kandidat"
							required />
						</div>
						<div className="form-group mr-sm-2">
							<label htmlFor="no_user">No Urut</label>
							<input
							id="no_user"
							type="text"
							ref={(input) => { this.no_user = input }}
							className="form-control"
							placeholder="Masukkan nomor urut kandidat"
							required />
						</div>
						<button type="submit" className="btn btn-info">Submit</button>
					</form>
				</div>
				<hr className="my-4"/>
				<h5><b>Daftar Kandidat</b></h5>
				<table className="table table-bordered">
					<thead>
						<tr>
							
							<th scope="col">Nama Kandidat</th>
							<th scope="col">No Urut</th>
						</tr>
					</thead>
					<tbody>
						{this.props.users.filter(p => p.owner === this.props.account).length > 0
							? this.props.users
								.filter(p => p.owner === this.props.account)
								.map((user, key) => {
								return (
									<tr key={key}>
										
										<td>{user.name}</td>
										<td>{user.no_user}</td>
									</tr>
								)
								})
							: <tr><td colSpan="3" className="text-center">Data tidak tersedia.</td></tr>
						}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Input_kandidat