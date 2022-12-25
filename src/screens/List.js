import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama:'',
            alamat:'',
            listData:[],
            idEdit:null,
        };
        this.url = "http://192.168.1.7/api/api_toko.php";
    }

    componentDidMount(){
        this.ambilListData();
    }

    async ambilListData(){
       await fetch(this.url)
       .then((response)=>response.json())
       .then((json)=>{
           console.log(json.data.result);
           this.setState({listData:json.data.result})
       })
       .catch((error)=>{console.log(error);
        })
    }

    render() {
        return (
            <View style = {style.viewWrapper}>
                <View style={style.viewData}>
                    {
                        this.state.listData.map((val,index)=>(
                        <View style={style.viewList} key={index}>
                            <Text style={style.textListNama}>{val.nama}</Text>
                        </View>
                        ))
                    }
                </View>
                <View>
                    <Button title='Data Toko' onPress={()=>navigation.navigate('DataToko')} />               
                    <Button title='Data Produk' onPress={()=>navigation.navigate('DataProduk')} />

                </View>
            </View>


        )
    }
}

const style = StyleSheet.create({
    viewWrapper:{
        flex:1
    },
    viewData:{
        flex:4
    },

});

export default List;