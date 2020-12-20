import { MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBNav, MDBNavItem, MDBNavLink, MDBRow, MDBTabContent, MDBTable, MDBTableBody, MDBTableHead, MDBTabPane, MDBBtn } from 'mdbreact';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import OrderDetails from './OrderDetails';

class OrderTab extends Component {
	state = {
		activeItemOuterTabs: '1',
    activeItemInnerPills: '1',
    status : 'Pending'
	};

	componentDidMount() {
		let { startingStore: { getOrders } } = this.props;
		getOrders();
	}

	toggleOuterTabs = (tab) => (e) => {
		if (this.state.activeItemOuterTabs2 !== tab) {
			this.setState({
				activeItemOuterTabs: tab
			});
		}
	};

	toggleInnerPills = (tab) => (e) => {
		if (this.state.activeItemInnerPills !== tab) {
			this.setState({
				activeItemInnerPills: tab
			});
		}
  };
  
  setStatus = (status) => {
    this.setState({status: status})
  }


	render() {
		const { classes } = this.props;
		let { startingStore: { listOfOrder ,editOrder} } = this.props;
		console.log(listOfOrder, 'order');
		// let totalPrice = listOfOrder.reduce((total , item) => total + parseFloat(item.artworkPaymentAmount) , 0)

		console.log(listOfOrder, 'Order');
		return (
			<MDBContainer>
				<MDBNav tabs className="nav-justified" color="primary">
					<MDBNavItem>
						<MDBNavLink
							to="#"
							active={this.state.activeItemOuterTabs === '1'}
							onClick={this.toggleOuterTabs('1')}
							role="tab"
						>
							<MDBIcon icon="clipboard-list" /> My Orders
						</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem>
						<MDBNavLink
							to="#"
							active={this.state.activeItemOuterTabs === '2'}
							onClick={this.toggleOuterTabs('2')}
							role="tab"
						>
							<MDBIcon icon="history" /> Order History
						</MDBNavLink>
					</MDBNavItem>
				</MDBNav>
				<MDBTabContent className="card mb-5" activeItem={this.state.activeItemOuterTabs}>
					<MDBTabPane tabId="1" role="tabpanel">
						<MDBRow className="flex-center">
							<MDBCol md="10">
								<MDBCardBody>
									<MDBCardTitle className="flex-center">Order</MDBCardTitle>
									<MDBDropdown className= "flex-center">
										<MDBDropdownToggle caret size="sm" color="warning">
											Pending
										</MDBDropdownToggle>
										<MDBDropdownMenu basic>
											<MDBDropdownItem onClick={()=> {
                        this.setStatus('Pending')
                      }}>Pending</MDBDropdownItem>
											<MDBDropdownItem  onClick={()=> {
                        this.setStatus('Pending Printing')
                      }}>Printing</MDBDropdownItem>
											<MDBDropdownItem  onClick={()=> {
                        this.setStatus('Delivery')
                      }}>Delivery</MDBDropdownItem>
										</MDBDropdownMenu>
									</MDBDropdown>
                  <div>
                  <MDBRow className="cart-items-details">
										{listOfOrder.map((items, indexes) => {
											if (listOfOrder.length > 0) {
												return items.orderItems.map((item) => {
													return (
														<MDBCol md="12" className="cart-item">
															<MDBRow>
																<MDBCol md="3" className="flex-center">
																	{item.artworkImg !== '' ? (
																		<img className="item-image" src={item.artworkImg} alt='artwork'/>
																	) : (
																		''
																	)}
																</MDBCol>

																<MDBCol md="3" className="">
																	{item.artistName}
																	<br />
																	{item.artworkName}
																</MDBCol>

																<MDBCol md="3">x{item.artworkQuantity}</MDBCol>

																<MDBCol md="3">
																	&#8369;{' '}
																	{item.artworkPaymentAmount ? (
																		Number(
																			parseFloat(item.artworkPaymentAmount)
																		).toLocaleString('en')
																	) : (
																		''
																	)}
																</MDBCol>
                                <MDBBtn size='sm' onClick={()=> editOrder(items._id , 'Received', items.accID)} >Order Received</MDBBtn>
															</MDBRow>
														</MDBCol>
													);
												});
											} else {
												return '';
											}
										})}
									</MDBRow>
                  </div>
								

									{/* <MDBRow className="cart-items-details">
                 <MDBCol className="cart-item"> 
                    <div className="item-container">
                        <img src={art} className="item-image"></img>
                    </div>
                    <div className="item-details">
                        <MDBRow>Artist One <span className="item-quantity">x1</span><span className="item-price">&#8369; 5,000</span></MDBRow>
                        <MDBRow>Sample 1, 0000</MDBRow>
                    </div>
                 </MDBCol>
               </MDBRow> */}
									<MDBRow className="order-summary">
										<MDBCol className="order-price">
											<div className="checkout-text-subtotal">
												Subtotal (1 Item/s){' '}
												<span className="subtotal-price">&#8369; 5,000</span>
											</div>
											<div className="checkout-text-total">
												Total <span className="total-price">&#8369; 5,000</span>
											</div>
										</MDBCol>
									</MDBRow>
								</MDBCardBody>
							</MDBCol>
						</MDBRow>
					</MDBTabPane>
					<MDBTabPane tabId="2" role="tabpanel">
						<MDBRow className="flex-center">
							<MDBCol md="6">
								<MDBCardBody>
									<MDBTable>
										<MDBTableHead>
											<th>Date of Transaction</th>
											<th>Status</th>
											<th>Total Price</th>
											<th />
										</MDBTableHead>
										<MDBTableBody>
											<td>2020-02-20</td>
											<td>Paid</td>
											<td>&#8369; 5,000</td>
											<td>
												<OrderDetails />
											</td>
										</MDBTableBody>
									</MDBTable>
								</MDBCardBody>
							</MDBCol>
						</MDBRow>
					</MDBTabPane>
				</MDBTabContent>
			</MDBContainer>
		);
	}
}

export default withRouter(inject('startingStore')(observer(OrderTab)));
