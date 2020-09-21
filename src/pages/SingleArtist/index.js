import React, { Component } from 'react';
import { MDBNavLink, MDBIcon, MDBBtn } from 'mdbreact';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import art from '../../images/artworks/art1.png';
import { inject, observer } from 'mobx-react';
import { Skeleton, message } from 'antd';
import { Link ,withRouter} from 'react-router-dom';
import _ from 'lodash';

class SingleArtist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			condition: false,
			isToggleOn: true,
			followStatus: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
    let {
			startingStore: {  followed,setFollowed }
    } = this.props;
    setFollowed()
	}

	componentDidMount() {
		window.scrollTo(0,0)
		let { startingStore: { getSingleArtists, getArtistArtwork, getArtists, getArtworkInfo }} = this.props;
		let userData = JSON.parse(sessionStorage.getItem('userData'));
		getSingleArtists(this.props.match.params.name);
		getArtistArtwork(this.props.match.params.name);
		getArtworkInfo();
		getArtists();
	}

	checkFollower = (follower) => {
		if (follower !== undefined && follower[0] !== '') {
			return follower.length;
		} else {
			return 0;
		}
	};

	followArtist = () => {
		message.loading({ content: 'Loading...' });
		setTimeout(() => {
			message.success({ content: 'Loaded!', duration: 2 });
		}, 1000);
	};

	render() {
		let {
			startingStore: { listofArtistInfo, listofArtistArtwork, listofArtistCategories, followArtist, followed }
		} = this.props;

		return (
			<div className="home">
				<Navbar />
				<div className="maincon con">
					<div className="artist">
						<div className="artistprofile clearfix">
							<div className="left">
								<div className="artistpp">
									{listofArtistInfo !== undefined ? (
										<img src={listofArtistInfo.profile_Img} alt="" />
									) : (
										<Skeleton active />
									)}
								</div>
								<div className="artistInfo">
									{listofArtistInfo.accFname !== undefined ? (
										<h2 className="title">
											{`${listofArtistInfo.accFname} ${listofArtistInfo.accLname}`}
											<MDBBtn
												className={followed  ? 'followed' : 'ifollow'}
												color="transparent"
												floating
												rounded
												// title={this.state.isToggleOn ? 'Follow' : 'Unfollow'}
												onClick={() => this.handleClick(followArtist(listofArtistInfo._id))}
											>
												{!followed ? <MDBIcon icon="plus" /> : 'Following'}
											</MDBBtn>
										</h2>
									) : (
										<Skeleton active />
									)}
									{listofArtistInfo !== undefined ? (
										<span className="bday">
											{listofArtistInfo.accAddress}, born {listofArtistInfo.birthYear}
										</span>
									) : (
										<Skeleton active />
									)}
									<span className="estart">Established Artist</span>
								</div>
							</div>
							<div className="right">
								<ul>
									<li>
										{listofArtistInfo !== undefined ? (
											this.checkFollower(listofArtistInfo.accFollowers)
										) : (
											0
										)}

										<span>Followers</span>
									</li>
									<li>
										4.8/5
										<span>528k Ratings</span>
									</li>
									<li>
										No. 1<span>Best Seller</span>
									</li>
								</ul>
							</div>
						</div>
						<div className="artistbio clearfix">
							<h4 className="paddh4">Biography</h4>
							{listofArtistInfo !== undefined ? (
								<p>{listofArtistInfo.artistDescription}</p>
							) : (
								<Skeleton active />
							)}
						</div>
						<div className="relatedcat clearfix">
							<h4 className="paddh4">Related Categories</h4>
							<div className="catlist">
								{listofArtistCategories[0] !== [] || listofArtistCategories[0] !== undefined ? (
									_.uniqBy(listofArtistCategories).map((cat) => (
										<MDBNavLink to="#!">{cat}</MDBNavLink>
									))
								) : (
									<MDBNavLink to="#!">No Categories</MDBNavLink>
								)}
							</div>
							<a href="#!" className="seemore">
								See More &nbsp;
								<MDBIcon icon="caret-right" />
							</a>
						</div>
					</div>
					<section className="bestsellers">
						<h3>Best Sellers of {this.props.location.state.artistName}</h3>
						<a href="#!" className="seemore">
							See More &nbsp;
							<MDBIcon icon="caret-right" />
						</a>
						<ul className="col3img clearfix">
							{listofArtistArtwork !== undefined ? (
								listofArtistArtwork.reverse().slice(0, 3).map((art) => (
									<li>
										<a href="#!" className="artlink">
											<div className="artlabel">
												<span className="new">NEW</span>
												<span className="hot">HOT</span>
											</div>
											<Link
												to={{
													pathname: `/Art/${art.artworkID}/${art.artistName}`
												}}
											>
												 <img src={art.artworkImg} alt='artwork'/>
											</Link>
										</a>
										<div className="artistinfo">
											<p>{art.artName}</p>
											<MDBBtn
												className="ifollow"
												color="transparent"
												floating
												rounded
												onClick={() => followArtist(listofArtistInfo._id)}
											>
												<MDBIcon icon="plus" />
											</MDBBtn>
										</div>
									</li>
								))
							) : (
								<Skeleton active />
							)}
						</ul>
					</section>
					<section className="latestwork">
						<h3>Latest Work by {this.props.location.state.artistName}</h3>
						<a href="#!" className="seemore">
							See More &nbsp;
							<MDBIcon icon="caret-right" />
						</a>
						<ul className="col3img clearfix">
							{listofArtistArtwork !== undefined ? (
								listofArtistArtwork.reverse().slice(0, 3).map((art) => (
									<li>
										<a href="#!" className="artlink">
											<div className="artlabel">
												<span className="new">NEW</span>
												<span className="hot">HOT</span>
											</div>
											<Link
												to={{
													pathname: `/Art/${art.artworkID}/${art.artistName}`
												}}
											>
												 <img src={art.artworkImg} alt='artwork'/>
											</Link>
										</a>
										<div className="artistinfo">
											<p>{art.artName}</p>
											<MDBBtn
												className="ifollow"
												color="transparent"
												floating
												rounded
												onClick={() => followArtist(listofArtistInfo._id)}
											>
												<MDBIcon icon="plus" />
											</MDBBtn>
										</div>
									</li>
								))
							) : (
								<Skeleton active />
							)}
						</ul>
					</section>
					<section className="latestwork">
						<h3>Related Artist</h3>
						<a href="#!" className="seemore">
							See More &nbsp;
							<MDBIcon icon="caret-right" />
						</a>
						<ul className="col3img clearfix">
							<li>
								<a href="#!" className="artlink">
									<div className="artlabel">
										<span className="new">NEW</span>
										<span className="hot">HOT</span>
									</div>
									<img src={art} alt="" />
								</a>
								<div className="artistinfo">
									<p>Rene Gagnon</p>
									<MDBBtn
										className="ifollow"
										color="transparent"
										floating
										rounded
										onClick={() => followArtist(listofArtistInfo._id)}
									>
										<MDBIcon icon="plus" />
									</MDBBtn>
								</div>
							</li>
							<li>
								<a href="#1" className="artlink">
									<img src={art} alt="" />
								</a>
								<div className="artistinfo">
									<p>Eelus</p>
									<MDBBtn
										className="ifollow"
										color="transparent"
										floating
										rounded
										onClick={() => followArtist(listofArtistInfo._id)}
									>
										<MDBIcon icon="plus" />
									</MDBBtn>
								</div>
							</li>
							<li>
								<a href="#!" className="artlink">
									<img src={art} alt="" />
								</a>
								<div className="artistinfo">
									<p>Banksy</p>
									<MDBBtn
										className="ifollow"
										color="transparent"
										floating
										rounded
										onClick={() => followArtist(listofArtistInfo._id)}
									>
										<MDBIcon icon="plus" />
									</MDBBtn>
								</div>
							</li>
						</ul>
					</section>
				</div>
				<Footer />
			</div>
		);
	}
}

export default withRouter(inject('startingStore')(observer(SingleArtist)))
