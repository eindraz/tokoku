import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

class DataProduk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama:'',
            harga:'',
            img:'',
            id_toko:'',
            listData:[],
            idEdit:null,
        };
        this.url = "http://192.168.1.7/api/api_produk.php";
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

    klikSimpan() {
        if (this.state.nama == '' || this.state.harga == '') {
            alert('Silahkan masukkan nama dan harga');
        } else {
            if(this.state.idEdit){
                var urlAksi = this.url+"/?op=update&id="+this.state.idEdit;
            } else {
                var urlAksi = this.url+"/?op=create";
            }
         
            fetch (urlAksi,{
                method:'post',
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body:"nama="+this.state.nama+"&harga="+this.state.harga+"&img="+this.state.img+"&id_toko="+this.state.id_toko
            })
            .then((response)=>response.json())
            .then((json)=>{
                this.setState({nama:''});
                this.setState({harga:''});
                this.setState({img:''});
                this.setState({id_toko:''});
                this.ambilListData();
            })
        }
    }

    async klikEdit(id){
        await fetch(this.url+"/?op=detail&id="+id)
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({nama:json.data.result[0].nama});
            this.setState({harga:json.data.result[0].harga});
            this.setState({img:json.data.result[0].img});
            this.setState({id_toko:json.data.result[0].id_toko});
            this.setState({idEdit:id});
        })
    }

    async klikDelete(id){
        await fetch(this.url+"/?op=delete&id="+id)
        .then((response)=>response.json())
        .then((json)=>{
            alert('Data berhasil didelete');
            this.ambilListData();
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
                            <Text style={style.textListEdit} onPress={()=>this.klikEdit(val.id)}>Edit</Text>
                            <Text style={style.textListDelete} onPress={()=>this.klikDelete(val.id)}>Delete</Text>
                        </View>
                        ))
                    }
                </View>
                <View style={style.viewForm}>
                    <Text style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 10 }}>
                        >> Input Data Produk
                        </Text>
                    <TextInput 
                        style={style.textInput}
                        placeholder="  Nama Produk"
                        value={this.state.nama}
                        onChangeText={(text)=>this.setState({nama:text})}
                        >
                    </TextInput>
                    <TextInput
                        style={style.textInput}
                        placeholder="  Harga Produk"
                        value={this.state.harga}
                        onChangeText={(text)=>this.setState({harga:text})}
                        >
                    </TextInput>
                    <TextInput
                        style={style.textInput}
                        placeholder="  Url Gambar"
                        value={this.state.img}
                        onChangeText={(text)=>this.setState({img:text})}
                        multiline={true}
                        numberOfLines={3}
                        >
                    </TextInput>
                    <TextInput
                        style={style.textInput}
                        placeholder="  ID Toko"
                        value={this.state.id_toko}
                        onChangeText={(text)=>this.setState({id_toko:text})}
                        >
                    </TextInput>
                    <Button 
                        title="Simpan"
                        onPress={()=>this.klikSimpan()}
                    ></Button>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    viewWrapper:{
        flex:1
    },
    viewForm:{
        flex:2,
        padding:10
    },
    viewData:{
        flex:4
    },
    textInput:{
        padding:2,
        fontSize:12,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#CCCCCC',
        marginBottom:10,
        backgroundColor:'#dedede',
    },
    viewList:{
        flexDirection:'row',
        padding:5,
        borderBottomWidth:1,
        borderBottomColor:'#dedede',
    },
    textListNama:{
        flex:3,
        fontSize:14,
        fontWeight:'bold',

    },
    textListEdit:{
        color:'blue',
        marginRight:20,
    },
    textListDelete:{
        color:'red',
    },
})

export default DataProduk;