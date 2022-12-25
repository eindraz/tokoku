import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

class DataToko extends Component {
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

    klikSimpan() {
        if (this.state.nama == '' || this.state.alamat == '') {
            alert('Silahkan masukkan nama dan alamat');
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
                body:"nama="+this.state.nama+"&alamat="+this.state.alamat
            })
            .then((response)=>response.json())
            .then((json)=>{
                this.setState({nama:''});
                this.setState({alamat:''});
                this.ambilListData();
            })
        }
    }

    async klikEdit(id){
        await fetch(this.url+"/?op=detail&id="+id)
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({nama:json.data.result[0].nama});
            this.setState({alamat:json.data.result[0].alamat});
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
                    <Text>Input Data Toko</Text>
                    <TextInput 
                        style={style.textInput}
                        placeholder="  Nama Toko"
                        value={this.state.nama}
                        onChangeText={(text)=>this.setState({nama:text})}
                        >
                    </TextInput>
                    <TextInput
                        style={style.textInput}
                        placeholder="  Alamat Toko"
                        value={this.state.alamat}
                        onChangeText={(text)=>this.setState({alamat:text})}
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
        padding:5,
        fontSize:15,
        borderRadius:10,
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

export default DataToko;