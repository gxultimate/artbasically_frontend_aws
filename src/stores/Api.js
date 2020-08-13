import axios from 'axios';
import { action, decorate } from 'mobx';

class Api {
	api = axios.create({
		baseURL: '/api'
	});

	// ACCOUNT
	addaccount = (data) => {
		return this.api.post('addAccounts', {
			mode: 'cors',
			data: data
		});
	};

	getaccounts = () => {
		return this.api.get('getAccounts');
	};

	editAccount = (data) => {
		return this.api.post('editAccount', {
			mode: 'cors',
			data: data
		});
	};
	addOrder = (data) => {
		return this.api.post('addOrder', {
			mode: 'cors',
			data: data
		});
	};

	loginaccount = async (data) => {
		return this.api.post('loginAccounts', {
			mode: 'cors',
			data: data
		});
	};

	getOrder = (id) => {
		return this.api.get(`getOrder/${id}`, {
			mode: 'cors'
		});
	};

	// ARTWORK
	addartwork = (data) => {
		return this.api.post('addArtwork', {
			mode: 'cors',
			data: data
		});
	};

	getartwork = () => {
		return this.api.get('getArtworks');
	};

	getartworkInfo = () => {
		return this.api.get('getArtworkInfo');
	};

	getsingleartworkinfo = (id) => {
		return this.api.get(`getSingleArtworkInfo/${id}`);
	};

	editArtwork = (data) => {
		return this.api.post('editArtwork', {
			mode: 'cors',
			data: data
		});
	};

	getArtistArtwork = (id) => {
		return this.api.get(`getArtistArtwork/${id}`);
	};

	getRelatedWorkByCategory = (category) => {
		return this.api.get(`getRelatedWorkByCategory/${category}`);
	};

	// CATEGORY
	addCategory = (data) => {
		return this.api.post('categoryRoute/addCategory', {
			mode: 'cors',
			data: data
		});
	};

	editCategory = (data) => {
		return this.api.post('categoryRoute/editCategory', {
			mode: 'cors',
			data: data
		});
	};

	getCategories = () => {
		return this.api.get('categoryRoute/getCategories');
	};

	// STYLES
	addStyle = (data) => {
		return this.api.post('categoryRoute/addStyle', {
			mode: 'cors',
			data: data
		});
	};

	editStyle = (data) => {
		return this.api.post('categoryRoute/editStyle', {
			mode: 'cors',
			data: data
		});
	};

	getStyles = () => {
		return this.api.get('categoryRoute/getStyles');
	};

	//ARTIST
	getArtists = () => {
		return this.api.get('getArtists');
	};

	getSingleArtists = (id) => {
		return this.api.get(`getSingleArtists/${id}`);
	};

	// CART

	addToCart = (data) => {
		return this.api.post('addToCart', {
			mode: 'cors',
			data: data
		});
	};

	getToCart = (data) => {
		return this.api.post('getToCart', {
			mode: 'cors',
			data: data
		});
	};

	editToCart = (id) => {
		return this.api.delete(`editToCart/${id}`, {
			mode: 'cors'
		});
	};

	upload = (img) => {
		return this.api.post('upload', img, {
			mode: 'cors'
		});
	};

	getOrders = () => {
		return this.api.get('getAllOrders', {
			mode: 'cors'
		});
	};

	followAccount = (data, id) => {
		return this.api.post(`followAccount/${id}`, {
			mode: 'cors',
			data: data
		});
	};

	editOrder = (data) => {
		return this.api.put('editOrder', {
			mode: 'cors',
			data: data
		});
	};

	getEmergingArtist = () => {
		return this.api.get('getEmergingArtistArtwork', {
			mode: 'cors'
		});
	};

	getArtistFollowArtwork = (email) => {
		return this.api.get(`getArtistFollowArtwork/${email}`, {
			mode: 'cors'
		});
	};
}

decorate(Api, {
	getUsers: action,
	addaccount: action,
	getaccounts: action,
	loginaccount: action,
	editAccount: action,
	addartwork: action,
	getartwork: action,
	editArtwork: action,
	getartworkInfo: action,
	addCategory: action,
	editCategory: action,
	getCategories: action,
	getArtists: action,
	addToCart: action,
	getToCart: action,
	editToCart: action,
	addStyle: action,
	getStyles: action,
	editStyle: action,
	getsingleartworkinfo: action,
	getSingleArtists: action,
	getArtistArtwork: action,
	upload: action,
	getOrders: action,
	getOrder: action,
	followAccount: action,
	addOrder: action,
	editOrder: action,
	getEmergingArtist: action,
	getArtistFollowArtwork: action
});

export default Api;
