import { Steps } from 'antd';
import { MDBBtn, MDBCol, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBRow } from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const { Step } = Steps;

class OrderDetails extends Component {
	state = {
		modal1: false,
		pendingOrders: undefined,
		steps: 0
	};
	checkSteps = (status) => {
		console.log(status);
		if (status === 'Pending') {
			this.setState({
				steps: 1
			});
		} else if (status === 'Pending Print' || status === 'Pending Printing') {
			this.setState({
				steps: 2
			});
		} else if (status === 'Delivery') {
			this.setState({
				steps: 3
			});
		} else if (status === 'Completed' || status === 'Received') {
			this.setState({
				steps: 4
			});
		} else if (status === 'PrintRejected' || status === 'Rejected') {
			this.setState({
				steps: 5
			});
		}
	};
	toggle = (nr) => {
		let modalNumber = 'modal' + nr;
		this.setState({
			[modalNumber]: !this.state[modalNumber],
			pendingOrders: this.props.pendingOrders
			// steps: this.checkSteps(this.props.steps),
		});
		this.checkSteps(this.props.steps);
	};

	render() {
		return (
			<div className="orderdetails">
				<MDBBtn size="sm" className="det" onClick={() => this.toggle(1)} color="#fae933">
					Order Details
				</MDBBtn>
				<MDBModal isOpen={this.state.modal1} toggle={() => this.toggle(1)} size="lg" centered>
					<MDBModalHeader toggle={() => this.toggle(1)}>Order Details</MDBModalHeader>
					<MDBModalBody>
						<div className="float-right">
							<p>
								ORDER ID:{' '}
								{this.state.pendingOrders !== undefined ? (
									this.state.pendingOrders.orderID
								) : (
									'00-000-XXXX'
								)}
							</p>
						</div>

						{this.state.steps === 5 ? (
							<Steps progressDot current={3}>
								<Step
									status={this.state.steps >= 1 ? 'finish' : 'wait'}
									title="Order Placed"
									description="04-20-2020 09:20"
								/>
								<Step
									status={this.state.steps >= 1 ? 'finish' : 'wait'}
									title="Order Rejected"
									description="04-20-2020 09:20"
								/>
							</Steps>
						) : (
							<Steps progressDot current={3}>
								<Step
									status={this.state.steps >= 1 ? 'finish' : 'wait'}
									title="Order Placed"
									description="04-20-2020 09:20"
								/>
								<Step
									status={this.state.steps >= 2 ? 'finish' : 'wait'}
									title="Verified"
									description="04-20-2020 09:20"
								/>
								<Step
									status={this.state.steps >= 3 ? 'finish' : 'wait'}
									title="Shipped"
									description="04-20-2020 09:20"
								/>
								<Step status={this.state.steps === 4 ? 'finish' : 'wait'} title="Completed" />
							</Steps>
						)}

						<div className="artlist">
							<div className="cartord">
								{this.state.pendingOrders !== undefined ? (
									this.state.pendingOrders.orderItems.map((item) => {
										return (
											<MDBRow className="artlistorder">
												<MDBCol md="3" className="artimg colpad">
													{item.artworkImg !== null ? (
														<img class="item-image" src={item.artworkImg} alt="" />
													) : (
														''
													)}
												</MDBCol>
												<MDBCol md="5" className="artdet colpad">
													<a
														href="#!"
														onClick={() => {
															this.props.history.push({
																pathname: `/Artist/${item.accFname} ${item.accLname}`,
																state: {
																	artistName: `${item.accFname} ${item.accLname}`,
																	accImg: this.state.artistImg,
																	artistDescription: this.state.accDescription,
																	accBday: this.state.accBday,
																	accFollowers: this.state.accFollowers
																}
															});
														}}
													>
														{' '}
														{item.artistName} <MDBIcon icon="arrow-right" />{' '}
													</a>
													<br />
													<p>"{item.artworkName}"</p>
													<p>
														Variations: {item.artworkMaterial}, {item.artworkSize},{' '}
														{item.artworkFramingOptions}
													</p>
													<p>&#8369; {item.artworkPaymentAmount}</p>
												</MDBCol>
												<MDBCol md="1" className="quan colpad">
													x{item.artworkQuantity}
												</MDBCol>
												<MDBCol md="3" className="colpad">
													<MDBRow>
														<MDBCol md="6" className="colpad2">
															Subtotal
														</MDBCol>
														<MDBCol md="6" className="colpad2">
															&#8369;{' '}
															{item.artworkPaymentAmount ? (
																Number(
																	parseFloat(item.artworkPaymentAmount)
																).toLocaleString('en')
															) : (
																''
															)}
														</MDBCol>
													</MDBRow>
												</MDBCol>
											</MDBRow>
										);
									})
								) : (
									''
								)}
							</div>

							<div className="acts clearfix">
								{/* <MDBRow>
											<MDBCol md="6" className="colpad2">Shipping Fee</MDBCol>
											<MDBCol md="6" className="colpad2">
												&#8369; 500
											</MDBCol>
										</MDBRow> */}
								<MDBRow className="actsrow">
									<MDBCol md="2" className="total">
										Total
									</MDBCol>
									<MDBCol md="10" className="total">
										{this.state.pendingOrders !== undefined ? (
											'PHP ' +
											this.state.pendingOrders.orderItems.reduce(
												(a, b) => parseFloat(a) + parseFloat(b.artworkPaymentAmount),
												0
											)
										) : (
											'0'
										)}
									</MDBCol>
								</MDBRow>
								{/* <div className='actsbtn'>
                  <MDBBtn size='sm' className='recieve'>
                    Order Received
                  </MDBBtn>
                </div> */}
							</div>
						</div>
						{/* <MDBTable style={{ textAlign: "center" }}>
            <MDBTableHead>
              <th>Material</th>
              <th>Size</th>
              <th>Framing Options</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Price</th>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>Canvas</td>
                <td>30.48 cm x 45.72 cm</td>
                <td>Rustic Barnwood Distressed Wood</td>
                <td>x1</td>
                <td>Paid</td>
                <td>&#8369; 150,000</td>
              </tr>
              <tr>
                <td>Canvas</td>
                <td>30.48 cm x 45.72 cm</td>
                <td>Rustic Barnwood Distressed Wood</td>
                <td>x1</td>
                <td>Paid</td>
                <td>&#8369; 150,000</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total Price</td>
                <td>&#8369; 300,000</td>
              </tr>
            </MDBTableBody>
          </MDBTable> */}
					</MDBModalBody>
					{/* <MDBModalFooter>
          <MDBBtn color="danger" onClick={this.toggle(1)}>Close</MDBBtn>
        </MDBModalFooter> */}
				</MDBModal>
			</div>
		);
	}
}

export default withRouter(inject('startingStore')(observer(OrderDetails)));
