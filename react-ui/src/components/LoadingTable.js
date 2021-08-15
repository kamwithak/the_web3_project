import React from 'react';
import { Table } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

class LoadingTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			tokenSupplyOrdered: false,
			firstNameOrdered: false,
			lastNameOrdered: false,
			countryOrdered: false,
			creationDataOrdered: false,
			birthDateOrdered: false
		};
	}

	render() {
		const {
			tokenSupplyOrdered,
			firstNameOrdered,
			lastNameOrdered,
			countryOrdered,
			creationDataOrdered,
			birthDateOrdered
		} = this.state;

		return (
			<div>
				<Table
					onSortColumn={
						(key) => {
							/*
								Order by amount of Ledn Tokens held in each account
							*/
							if (key === "amt" && !tokenSupplyOrdered) {
								this.props.tableData.sort((a,b) => a.amt - b.amt);
							} else if (key === "amt" && tokenSupplyOrdered) {
								this.props.tableData.sort((a,b) => b.amt - a.amt);
							}

							/*
								Order by First Name of each account
							*/
							if (key === "First Name" && !firstNameOrdered) {
								this.props.tableData.sort((a,b) => {
									if (a['First Name'] < b['First Name']) { return -1; }
									if (a['First Name'] > b['First Name']) { return 1; }
									return 0
								});
							} else if (key === "First Name" && firstNameOrdered) {
								this.props.tableData.sort((a,b) => {
									if (a['First Name'] < b['First Name']) { return 1; }
									if (a['First Name'] > b['First Name']) { return -1; }
									return 0
								});
							}

							/*
								Order by Last Name of each account
							*/
							if (key === "Last Name" && !lastNameOrdered) {
								this.props.tableData.sort((a,b) => {
									if (a['Last Name'] < b['Last Name']) { return -1; }
									if (a['Last Name'] > b['Last Name']) { return 1; }
									return 0
								});
							} else if (key === "Last Name" && lastNameOrdered) {
								this.props.tableData.sort((a,b) => {
									if (a['Last Name'] < b['Last Name']) { return 1; }
									if (a['Last Name'] > b['Last Name']) { return -1; }
									return 0
								});
							}
							
							/*
								Order by Country of each account
							*/
							if (key === "Country" && !countryOrdered) {
								this.props.tableData.sort((a,b) => {
									if (a['Country'] < b['Country']) { return -1; }
									if (a['Country'] > b['Country']) { return 1; }
									return 0
								});
							} else if (key === "Country" && countryOrdered) {
								this.props.tableData.sort((a,b) => {
									if (a['Country'] < b['Country']) { return 1; }
									if (a['Country'] > b['Country']) { return -1; }
									return 0
								});
							}

							/*
								Order by Creation Date of each account
							*/
							if (key === "createdDate" && !creationDataOrdered) {
								this.props.tableData.sort((a,b) => new Date(b.createdDate) - new Date(a.createdDate));
							} else if (key === "createdDate" && creationDataOrdered) {
								this.props.tableData.sort((a,b) => new Date(a.createdDate) - new Date(b.createdDate));
							}

							/*
								Order by Birth Date of each account holder
							*/
							if (key === "dob" && !birthDateOrdered) {
								this.props.tableData.sort((a,b) => new Date(b.dob) - new Date(a.dob));
							} else if (key === "dob" && birthDateOrdered) {
								this.props.tableData.sort((a,b) => new Date(a.dob) - new Date(b.dob));
							}

							this.setState({
								tokenSupplyOrdered: !tokenSupplyOrdered,
								firstNameOrdered: !firstNameOrdered,
								lastNameOrdered: !lastNameOrdered,
								countryOrdered: !countryOrdered,
								creationDataOrdered: !creationDataOrdered,
								birthDateOrdered: !birthDateOrdered
							})
							
							console.log(this.props.accountsData);
						}
					}
					loading={!this.props.fetchedAccountsData}
					autoHeight
					data={this.props.tableData}
					bordered
					hover
					>
					<Column width={200} align="center" sortable>
						<HeaderCell>Account Created</HeaderCell>
						<Cell dataKey="createdDate" />
					</Column>

					<Column width={150} align="center" sortable>
						<HeaderCell>First Name</HeaderCell>
						<Cell dataKey="First Name" />
					</Column>

					<Column width={150} align="center" sortable>
						<HeaderCell>Last Name</HeaderCell>
						<Cell dataKey="Last Name" />
					</Column>

					<Column width={110} align="center" sortable>
						<HeaderCell>Country</HeaderCell>
						<Cell dataKey="Country" />
					</Column>

					<Column width={250} align="center">
						<HeaderCell>Email</HeaderCell>
						<Cell dataKey="email" />
					</Column>

					<Column width={250} align="center" sortable>
						<HeaderCell>Birth Date</HeaderCell>
						<Cell dataKey="dob" />
					</Column>

					<Column width={150} align="center">
						<HeaderCell>MFA Type</HeaderCell>
						<Cell dataKey="mfa" />
					</Column>

					<Column width={150} align="center" sortable>
						<HeaderCell>Ledn Supply</HeaderCell>
						<Cell dataKey="amt" />
					</Column>

					<Column width={250} align="center" >
						<HeaderCell>Reference (Email)</HeaderCell>
						<Cell dataKey="ReferredBy" />
					</Column>
				</Table>
			</div>
		);
	}
}

export default LoadingTable;