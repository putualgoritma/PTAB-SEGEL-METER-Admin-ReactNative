import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, Pressable, TouchableOpacity, Modal, BackHandler, Alert, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { ImageHeader, Images, logo512, history, waterMeter, mapping, lock, bill } from '../../assets'
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
// const date = new Date();

// const hours = date.getHours();
// const minutes = date.getMinutes();
// const seconds = date.getSeconds();
// const time = hours+':'+minutes+':'+seconds;
const Home = ({ navigation }) => {
  const TOKEN = useSelector((state) => state.TokenReducer);
    const USER = useSelector((state) => state.UserReducer);
  // console.log(TOKEN);
  // console.log(USER);
  const [name, setName] = useState('');
  const [time, setTime] = React.useState();

  React.useEffect(() => {
    console.log('sudah home',USER);
    setName(USER.name)
    // const timer = setInterval(() => {
    //   setTime(new Date().getDate() + "-" + parseInt(new Date().getMonth() + 1) + "-" + new Date().getFullYear() + " " + (new Date().getHours()) + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
    // }, 1000);

    // return () => {
    //   clearInterval(timer);
    // };

  }, []);
  return (
    <ScrollView style={styles.container} >
      <ImageBackground style={styles.imgBg} source={ImageHeader}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}><Text style={{ color: "rgb(255,255,255)" }}><Icon name="menu-outline" size={35} color={"rgb(255,255,255)"} /></Text></TouchableOpacity>
        {/* <View>
      <TouchableOpacity>   <Text> <Icon name="menu-outline" size={35} color = {"rgb(255,255,255)"}/></Text></TouchableOpacity>
      </View> */}
        <View style={{ alignItems: "center" }}>
          <Text style={styles.labelTitle}>METER SEGEL</Text>
          <Text style={styles.label3white}>PERUMDA TIRTA AMERTHA BUANA</Text>
          <View><Image source={logo512} style={styles.images} /></View>
          <Text style={styles.label3white}>{time}</Text>
          <Text style={styles.label3white}>Ver : 22-12-2022</Text>
          <View style={styles.floatingScreen}><Text style={styles.label1}>{name}</Text></View>
        </View>
      </ImageBackground>


    <View>
    {USER.subdapertement_id != 9 &&
      <View style={styles.iconGroup}>
        <View>
          <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate("Daftar Segel")}>
            <View>
              <Image style={styles.icon} source={lock} />
            </View>
          </TouchableOpacity>
          <Text style={{ color: "#000000", textAlign: "center", fontSize: 16 }}>Daftar Segel</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate("History Segel")}>
            <View>
              <Image style={styles.icon} source={history} />
            </View>

          </TouchableOpacity>
          <Text style={{ color: "#000000", textAlign: "center", fontSize: 16 }}>History Segel</Text>
        </View>
      </View>
}

      <View style={styles.iconGroup}>
        <View>
          <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate("Mapping Pelanggan")}>
            <View>
              <Image style={styles.icon} source={mapping} />
            </View>

          </TouchableOpacity>
          <Text style={{ color: "#000000", textAlign: "center", fontSize: 16 }}>Mapping</Text>
        </View>

        <View>
          <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate('Tagihan Pelanggan')}>
            <View>
              <Image style={styles.icon} source={bill} />
            </View>
          </TouchableOpacity>
          <Text style={{ color: "#000000", textAlign: "center", fontSize: 16 }}>Tagihan Pelanggan</Text>
        </View>
      </View>
        </View>



      <View style={styles.iconGroup}>
        <View>
          <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate("Wm")}>
            <View>
              <Image style={styles.icon} source={waterMeter} />
            </View>

          </TouchableOpacity>
          <Text style={{ color: "#000000", textAlign: "center", fontSize: 16 }}>Pergantian WM</Text>
        </View>

        {/* <View>
          <TouchableOpacity style={styles.iconBack} onPress= {()=>navigation.navigate('Tagihan Pelanggan')}>
            <View>
            <Image style={styles.icon} source={bill} />
            </View>
          </TouchableOpacity>
          <Text style = {{ color : "#000000",textAlign : "center", fontSize : 16 }}>Tagihan Pelanggan</Text>
          </View> */}
      </View>
    </ScrollView>



  )
}

export default Home

const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

  imgBg: {
    height: windowHeight * 0.4,
    marginBottom: windowHeight * 0.05,
  },
  container:
  {
    flex: 1,
  },
  loadingImg: {
    alignItems: "center",
    paddingTop: windowHeight * 0.04,
  },
  loading: {
    alignItems: "center",
  },
  historyDay: {
    backgroundColor: "#FFFFFF",
    height: windowHeight * 0.18,
    width: windowWidht * 0.9,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
  },
  floatingScreen: {
    marginTop: windowHeight * 0.02,
    width: windowWidht * 0.9,
    height: windowWidht * 0.12,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",

  },
  labelTitle: {
    fontSize: 30,
    color: "#FFFFFF",
    marginBottom: windowHeight * 0.03,
    textAlign: "center",
    fontWeight: "bold"
  },
  label1: {
    fontSize: 35,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold"
  },
  label2: {
    fontSize: 20,
  },
  label2white: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  label2whitecenter: {
    textAlign: "center",
    color: '#FFFFFF',
    fontSize: 20,
  },
  label3: {
    color: "#000000",
    fontSize: 16,

  },
  label3white: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  label2blue: {
    fontSize: 20,
    color: 'rgba(0,0,255,1)',
  },
  center: {
    // marginTop: windowHeight*0.1,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },

  iconGroup: {
    flexDirection: 'row',
  },

  square: {
    alignItems: "center",
    height: windowWidht * 0.22,
    width: windowWidht * 0.22,
    marginTop: windowWidht * 0.05,
    marginHorizontal: windowWidht * 0.1,
    backgroundColor: "rgba(0,191,255,0.1)",
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "rgba(0,191,255,0.01)",

  },

  iconBack: {
    alignItems: "center",
    height: windowWidht * 0.36,
    width: windowWidht * 0.36,
    marginTop: windowWidht * 0.05,
    marginHorizontal: windowWidht * 0.06,
    backgroundColor: "#FFFFFF",

  },
  icon: {
    marginVertical: windowHeight * 0.01,
    width: windowWidht * 0.34,
    height: windowWidht * 0.34,
    borderWidth: 5,
    borderColor: "red",

  },
  images: {
    width: windowHeight * 0.12,
    height: windowHeight * 0.12,
    marginRight: 10,
    borderRadius: 150 / 2,
    marginTop: windowHeight * 0.01,
    overflow: "hidden",
    // borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",

  },
  imagesLoading: {
    width: windowHeight * 0.12,
    height: windowHeight * 0.12,
    marginRight: 10,
    // borderRadius : 150/2,
    marginTop: windowHeight * 0.01,
    overflow: "hidden",
    // borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",

  },


  centerModal: {
    marginTop: windowHeight * 0.19,

    alignItems: 'center',
  },
  marginH: {
    marginHorizontal: windowWidht * 0.04,
    marginTop: windowHeight * 0.02,
  },
  leftButton: {
    width: windowWidht * 0.9,
  },
  marginTop: {
    marginTop: windowHeight * 0.05,
  },
  //dari react native
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    padding: 10,
    elevation: 2,
    marginLeft: "auto"
  },
  button2: {
    padding: 10,
    elevation: 2,
    marginRight: "auto"

  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#FF3131",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: "auto"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})