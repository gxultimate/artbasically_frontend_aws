import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

class PendingtoDelivery extends Component {
	state = {
		modal14: false
	};

	toggle = (nr) => () => {
		let modalNumber = 'modal' + nr;
		this.setState({
			[modalNumber]: !this.state[modalNumber]
		});
	};

	submitHandler = (event) => {
		event.preventDefault();
		event.target.className += ' was-validated';

		let { startingStore: { addAccount, account } } = this.props;
		account.setProperty('accID', this.getUniqueID());
		addAccount();
	};

	changeHandler = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { classes } = this.props;
		let { startingStore: { account } } = this.props;
		return (
			<MDBDropdown>
				<MDBDropdownToggle caret color="#FAE933">
					Action
				</MDBDropdownToggle>
				<MDBDropdownMenu basic>
					<MDBDropdownItem type="button">Accept</MDBDropdownItem>
					<MDBDropdownItem type="button">Decline</MDBDropdownItem>
					<MDBDropdownItem type="button">View Art</MDBDropdownItem>
				</MDBDropdownMenu>
			</MDBDropdown>
		);
	}
}

export default inject('startingStore')(observer(PendingtoDelivery));
