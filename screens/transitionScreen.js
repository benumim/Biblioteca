import React, {Component} from "react"
import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground, ToastAndroid} from "react-native"
import * as Permissions from "expo-permissions"
import {BarCodeScanner} from "expo-barcode-scanner"
import db from "../config"

export default class TransitionScreen extends Component{
    constructor(props){
        super(props)
        this.state ={
            domState: "normal",
            hasCameraPermissions: null,
            scanned: false,
            scannedData: "",
            bookId: "",
            studentId: ""
        }
    }
    getCameraPermission = async domState =>{
        const{status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({hasCameraPermissions: status === "granted", domState: domState, scanned: false})
    }
    handleBarcodeScanned = async ({type, data}) =>{
        this.setState({
            scannedData: data,
            domState: "normal",
            scanned: true
        })
    }
    handleTransition =async()=> {
        var {bookId, studentId}= this.state
        await this.getBookDetails(bookId)
        await this.getStudentDetails(studentId)
        db.collection("books")
        .doc(bookId)
        .get()
        .then(doc =>{
            var book = doc.data()
            if(book.is_book_available){
                var{bookName, studentName}=this.state
                this.initiateBookIssue(bookId, studentId, bookName, studentName)
                ToastAndroid.show("Livro emprestado com sucesso", ToastAndroid.SHORT)
            }
            else{
                var{bookName, studentName}= this.state
                this.initiateBookReturn(bookId, studentId, bookName, studentName)
                ToastAndroid.show("Livro devolvido com sucesso", ToastAndroid.SHORT)
            }
        })
    }
    initiateBookIssue=async(bookId, studentId, bookName, studentName)=>{
        console.log("Livro emprestado")
    }
    initiateBookReturn=async(bookId,studentId, bookName, studentName)=>{
        console.log("Livro devolvido")
    }
    getBookDetails =bookId=>{
        console.log("Informações do livro")
    }
    getStudentDetauls =studentId=>{
        console.log("Informações do aluno")
    }
    render(){
        const {domState, hasCameraPermissions, scannedData, scanned} = this.state
        if (domState === "scanner"){
            return(
                <BarCodeScanner onBarCodeScanned={scanned?undefined: this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>
            )
        }
        return(
            <View style={{flex: 1}}>
                <ImageBackground source={require("../assets/background.png")} style={{flex: 1}}>
                 <Image source={require("../assets/logo.png")} style={{alignSelf: "center", width: 90, height: 100, marginTop: 20}}></Image>
                 <Image source={require("../assets/name.png")} style={{alignSelf: "center", width: 350, height: 40, marginTop: 20}}></Image>
                 <TouchableOpacity onPress={()=>this.getCameraPermission("scanner")} style={{textAlign: "CENTER",borderWidth:3, borderColor: "green", backgroundColor: "lightgreen", width: "40%", position: "absolute", marginTop: 183, marginLeft: 820, height: 30}}>
                     <Text>Leitor de Código QR</Text>
                 </TouchableOpacity>
                 <TextInput style={{borderWidth: 3, borderColor: "white", width: "60%", height: 35}} placeholder={"Digite o ID do livro"}></TextInput>
                 <TouchableOpacity onPress={()=>this.getCameraPermission("scanner")} style={{textAlign: "CENTER",borderWidth:3, borderColor: "green", backgroundColor: "lightgreen", width: "40%", position: "absolute", marginTop: 218, marginLeft: 820, height: 30}}>
                     <Text>Leitor de Código QR</Text>
                 </TouchableOpacity>
                 <TextInput style={{borderWidth: 3, borderColor: "white", width: "60%", height: 35}} placeholder={"Digite o ID do livro"}></TextInput>
                 <TouchableOpacity style={{width: 70,height: 20, marginTop: 10, backgroundColor: "orange", alignSelf: "CENTER", textAlign: "CENTER"}} onPress={this.handleTransition}>
                    <Text>Enviar</Text>
                 </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}