'use strict';

import React, {
	Component,
} from 'react'

import {
	Image,
	ListView,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
} from 'react-native';

var ProgressBar = require('../common/widget/ProgressBar');

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 10;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

class MoviesList extends Component {

	constructor(props) {
		super(props);

		// Method bind
		// this.onPressSynopsis = this.onPressSynopsis.bind(this);
		this.renderMovie = this.renderMovie.bind(this);

		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			loaded: false
		}
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		fetch(REQUEST_URL)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
					loaded: true
				});
			}).done();
	}

	render() {
		if (!this.state.loaded) {
			return this.renderLoadingView();
		} else {
			return (
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderMovie}
					style={styles.movie_list}
				/>
			)
		}
	}

	renderLoadingView() {
		return (
			<ProgressBar />
		)
	}

	renderMovie(movie) {
		return (
			<View style={styles.container}>
				<Image
					source={{uri: movie.posters.original}}
					style={styles.thumbnail}/>

				<View style={styles.rightContainer}>
					<Text style={styles.title}>
						{movie.title}
					</Text>
					<Text style={styles.synopsis}
					      numberOfLines={3}
					      onPress={this.onPressSynopsis.bind(this, movie.synopsis)}>
						{movie.synopsis}
					</Text>
					<Text style={styles.year}>
						{movie.year}
					</Text>
				</View>
			</View>
		);
	}

	onPressSynopsis(movieInfo) {
		ToastAndroid.show(movieInfo, ToastAndroid.SHORT);
	};
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15
	},
	rightContainer: {
		marginLeft: 15,
		flex: 1
	},
	thumbnail: {
		width: 90,
		height: 120
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	synopsis: {
		fontSize: 15,
		marginTop: 5,
		overflow: 'hidden'
	},
	year: {
		textAlign: 'center',
		marginTop: 5
	},
	movie_list: {
		paddingTop: 10
	}
});

module.exports = MoviesList;