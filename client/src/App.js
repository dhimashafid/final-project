import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Web3 from 'web3';
import './App.css';
// import axios from 'axios'

import Contract_Sertifikat from './contracts/Contract_Sertifikat.json'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Data_suara from './components/Data_suara'
import Filter_alamat from './components/Filter_alamat'
import Input_suara from './components/Input_suara'
import Input_kandidat from './components/Input_kandidat'
import Filter_nourut from './components/filter_nourut'
import Filter_kota from './components/Filter_kota'
import Filter_provinsi from './components/Filter_provinsi'
import Datapemohon from './components/cek_status';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			account: '',
			user_count: 0,
			sertifikat_count: 0,
			users: [],
			sertifikats :[],
			status_valid :false,
			loading: true
		}

		this.createUser = this.createUser.bind(this)
		this.createSertif = this.createSertif.bind(this)
	}

	async componentWillMount() {
		await this.loadWeb3()
		await this.loadBlockchainData()
	}

	async loadWeb3() {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable()
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
		} else {
			window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
		}
	}

	async loadBlockchainData() {
		const web3 = window.web3
		// Load account
		const accounts = await web3.eth.getAccounts()
		this.setState({ account: accounts[0] })
		let balance = await web3.eth.getBalance(accounts[0]);
		await this.setState({balance: web3.utils.fromWei(balance, 'Ether')})
		const networkId = await web3.eth.net.getId()
		const networkData = Contract_Sertifikat.networks[networkId]
		if(networkData) {
			const contract_sertifikat = new web3.eth.Contract(Contract_Sertifikat.abi, networkData.address)
			this.setState({ contract_sertifikat })
			const user_count = await contract_sertifikat.methods.user_count().call()
			this.setState({ user_count })
			const sertifikat_count = await contract_sertifikat.methods.sertifikat_count().call()
			this.setState({ sertifikat_count })

			// Load User
			for (var i = 1; i <= user_count; i++) {
				const user = await contract_sertifikat.methods.users(i).call()
				this.setState({
				users: [...this.state.users, user]
				})
			}
			
			//Load Sertifikat
			for (var j = 1; j <= sertifikat_count; j++) {
				const sertifikat = await contract_sertifikat.methods.sertifikats(j).call()
				this.setState({
				sertifikats: [...this.state.sertifikats, sertifikat]
				})
			}
			this.setState({ loading: false})
		} else {
			window.alert('contract_sertifikat contract not deployed to detected network.')
		}
	}

	createUser(name, no_user) {
		this.setState({ loading: true })
		this.state.contract_sertifikat.methods.createUser(name, no_user).send({ from: this.state.account })
		.once('receipt', async (receipt) => {
			this.setState({
				users: [...this.state.users, receipt.events.UserCreated.returnValues]
			})
			window.location.reload()
		})
	}
	createSertif(nik, no_user, alamat, kota, prov) {
		this.setState({ loading: true })
		this.state.contract_sertifikat.methods.createSertif(nik, no_user, alamat, kota, prov).send({ from: this.state.account })
		.once('receipt', async (receipt) => {
			this.setState({
				sertifikats: [...this.state.sertifikats, receipt.events.SertifikatCreated.returnValues]
			})
			window.location.reload()
		})
	}
	search_sertifikat(alamat) {
		this.setState({ loading: true })
		this.state.contract_sertifikat.methods.search_sertifikat(alamat).send({ from: this.state.account })
		.once('receipt', async (receipt) => {
			this.setState({
				status_valid: [receipt.events.search_sertifikat.returnValues]
			})
			window.location.reload()
		})
	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route 
						exact
						path="/"
						render={props => {
							return (
								<div>
									<Navbar account={this.state.account} balance={this.state.balance} active="home" />
									<div className="container" style={{marginTop: '50px'}}>
										<div className="row">
											<main role="main" className="col-lg-12 d-flex">
											{ this.state.loading
												? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
												: <Main />
											}
											</main>
										</div>
									</div>
								</div>
							)
						}}
					/>
					<Route 
						exact
						path="/Data_suara"
						render={(props) => {
							return (
								<div>
									<Navbar account={this.state.account} balance={this.state.balance} active="Data_suara"/>
									<div className="container" style={{marginTop: '50px'}}>
										<div className="row">
											<main role="main" className="col-lg-12 d-flex">
											{ this.state.loading
												? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
												: <Data_suara 
													sertifikats={this.state.sertifikats}
													account={this.state.account}
													// search_sertifikat={this.search_sertifikat} 
													/>
											}
											</main>
										</div>
									</div>
								</div>
							)
						}}
					/>
					<Route 
						exact
						path="/Filter_alamat"
						render={(props) => {
							return (
								<div>
									<Navbar account={this.state.account} balance={this.state.balance} active="Filter_alamat"/>
									<div className="container" style={{marginTop: '50px'}}>
										<div className="row">
											<main role="main" className="col-lg-12 d-flex">
											{ this.state.loading
												? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
												: <Filter_alamat
													sertifikats={this.state.sertifikats}
													account={this.state.account}
													// search_sertifikat={this.search_sertifikat} 
													/>
											}
											</main>
										</div>
									</div>
								</div>
							)
						}}
					/>
					<Route 
						exact
						path="/filter_kota"
						render={(props) => {
							return (
								<div>
									<Navbar account={this.state.account} balance={this.state.balance} active="Filter_kota"/>
									<div className="container" style={{marginTop: '50px'}}>
										<div className="row">
											<main role="main" className="col-lg-12 d-flex">
											{ this.state.loading
												? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
												: <Filter_kota
													sertifikats={this.state.sertifikats}
													account={this.state.account}
													// search_sertifikat={this.search_sertifikat} 
													/>
											}
											</main>
										</div>
									</div>
								</div>
							)
						}}
					/>
					<Route 
						exact
						path="/filter_provinsi"
						render={(props) => {
							return (
								<div>
									<Navbar account={this.state.account} balance={this.state.balance} active="Filter_provinsi"/>
									<div className="container" style={{marginTop: '50px'}}>
										<div className="row">
											<main role="main" className="col-lg-12 d-flex">
											{ this.state.loading
												? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
												: <Filter_provinsi
													sertifikats={this.state.sertifikats}
													account={this.state.account}
													// search_sertifikat={this.search_sertifikat} 
													/>
											}
											</main>
										</div>
									</div>
								</div>
							)
						}}
					/>

					<Route 
						exact
						path="/input_kandidat"
						render={(props) => {
							return (
								<div>
									<Navbar account={this.state.account} balance={this.state.balance} active="Input_kandidat"/>
									<div className="container" style={{marginTop: '50px'}}>
										<div className="row">
											<main role="main" className="col-lg-12 d-flex">
											{ this.state.loading
												? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
												: <Input_kandidat 
													users={this.state.users}
													account={this.state.account}
													createUser={this.createUser} 
													/>
											}
											</main>
										</div>
									</div>
								</div>
							)
						}}
					/>
					<Route 
						exact
						path="/input_suara"
						render={(props) => {
							return (
								<div>
									<Navbar account={this.state.account} balance={this.state.balance} active="Input_suara"/>
									<div className="container" style={{marginTop: '50px'}}>
										<div className="row">
											<main role="main" className="col-lg-12 d-flex">
											{ this.state.loading
												? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
												: <Input_suara 
													sertifikats={this.state.sertifikats}
													account={this.state.account}
													createSertif={this.createSertif} 
													/>
											}
											</main>
										</div>
									</div>
								</div>
							)
						}}
					/>
					<Route 
						exact
						path="/Filter_nourut"
						render={(props) => {
							return (
								<div>
									<Navbar account={this.state.account} balance={this.state.balance} active="Filter_nourut"/>
									<div className="container" style={{marginTop: '50px'}}>
										<div className="row">
											<main role="main" className="col-lg-12 d-flex">
											{ this.state.loading
												? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
												: <Filter_nourut 
													sertifikats={this.state.sertifikats}
													account={this.state.account}
													
													/>
											}
											</main>
										</div>
									</div>
								</div>
							)
						}}
					/>
					<Route 
						exact
						path="/datapemohon"
						render={(props) => {
							return (
								<div>
									<Navbar account={this.state.account} balance={this.state.balance} active="datapemohon"/>
									<div className="container" style={{marginTop: '50px'}}>
										<div className="row">
											<main role="main" className="col-lg-12 d-flex">
											{ this.state.loading
												? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
												: <Datapemohon 
													sertifikats={this.state.sertifikats}
													account={this.state.account}
													
													/>
											}
											</main>
										</div>
									</div>
								</div>
							)
						}}
					/>
					
					
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;