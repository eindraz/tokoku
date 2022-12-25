import React, { Component, useState, useEffect } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	FlatList,
	Button,
	Image
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProdukImages from '../assets/images/produk/index';

const Home = ({ navigation }) => {
	const COLORS = {
		white: '#fff',
		dark: '#000',
		red: '#F52A2A',
		light: '#F1F1F1',
		green: '#00B761',
	};
	// const [catergoryIndex, setCategoryIndex] = React.useState(0);
	// const categories = ['POPULAR', 'ORGANIC', 'INDOORS', 'SYNTHETIC'];

	const [data, setData] = useState([]);

	const getDataAPI = async () => {
		try {
			let response = await fetch('http://192.168.1.7/api/api_produk.php?op=katalog');
			let json = await response.json();
			setData(json.data.result);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getDataAPI();
	}, []);

	// const CategoryList = () => {
	// 	return (
	// 		<View style={style.categoryContainer}>
	// 			{categories.map((item, index) => (
	// 				<TouchableOpacity
	// 					key={index}
	// 					activeOpacity={0.8}
	// 					onPress={() => setCategoryIndex(index)}>
	// 					<Text
	// 						style={[
	// 							style.categoryText,
	// 							catergoryIndex === index && style.categoryTextSelected,
	// 						]}>
	// 						{item}
	// 					</Text>
	// 				</TouchableOpacity>
	// 			))}
	// 		</View>
	// 	);
	// };

	const Card = ({ produk }) => {

		return (
			
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => navigation.navigate('Details', produk)}>
				<View style={style.card}>
					<View
						style={{
							height: 120,
							alignItems: 'center',
						}}>
						<Image
							source={{uri:produk.img}}
							style={{ width: 120, height: 120 }}
						/>
					</View>

					<Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10, color: '#000' }}>
						{produk.nama}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: 5,
						}}>
						<Text style={{ fontSize: 12, fontWeight: 'bold' }}>
							{produk.harga}
						</Text>

					</View>
					<Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10, color:'#85C1E9' }}>
						{produk.toko}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView
			style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#D6EAF8' }}>
			<View style={style.header}>
				<View>
					<Text style={{ fontSize: 14, fontWeight: 'bold' }}>Selamat Datang</Text>
					<Text style={{ fontSize: 20, color: '#3498DB', fontWeight: 'bold' }}>
						TokoKu
					</Text>
				</View>
				<Icon name="shopping-cart" size={28} />
			</View>
			<View style={{ marginTop: 20, flexDirection: 'row' }}>
				<View style={style.searchContainer}>
					<Icon name="search" size={25} style={{ marginLeft: 20 }} />
					<TextInput placeholder="Search" style={style.input} />
				</View>
				<View style={style.sortBtn}>
					<Icon name="sort" size={30} color={'#FFF'} />
				</View>
			</View>
			{/* <CategoryList /> */}
			<FlatList
				columnWrapperStyle={{ justifyContent: 'space-between' }}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					marginTop: 10,
					paddingBottom: 50,
				}}
				numColumns={2}
				data={data}
				renderItem={({ item }) => {
					return <Card produk={item} />;
				}}
			/>
			<View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row' }}>
				<View style={style.sortBtn}>
					<Icon
						name="storefront" size={30} color={'#FFF'}
						onPress={() => navigation.navigate('DataToko')}
					/>
				</View>
				<View style={style.sortBtn}>
					<Icon
						name="add" size={30} color={'#FFF'}
						onPress={() => navigation.navigate('DataProduk')}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const style = StyleSheet.create({
	header: {
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	searchContainer: {
		height: 40,
		backgroundColor: '#F1F1F1',
		borderRadius: 10,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		fontSize: 14,
		fontWeight: 'bold',
		flex: 1,
		color: '#000',
	},
	sortBtn: {
		marginLeft: 10,
		height: 40,
		width: 40,
		borderRadius: 10,
		backgroundColor: '#CACFD2',
		justifyContent: 'center',
		alignItems: 'center',
	},
	categoryContainer: {
		flexDirection: 'row',
		marginTop: 20,
		marginBottom: 10,
		justifyContent: 'space-between',
	},
	categoryText: { fontSize: 10, color: 'grey', fontWeight: 'bold' },
	categoryTextSelected: {
		color: '#00B761',
		paddingBottom: 5,
		borderBottomWidth: 2,
		borderColor: '#00B761',
	},
	card: {
		height: 225,
		backgroundColor: '#F1F1F1',
		width: 170,
		marginHorizontal: 2,
		borderRadius: 10,
		marginBottom: 20,
		padding: 15,
	},
	iconBtn: {
		marginLeft: 10,
		height: 40,
		width: 40,
		borderRadius: 10,
		backgroundColor: '#CACFD2',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Home;
