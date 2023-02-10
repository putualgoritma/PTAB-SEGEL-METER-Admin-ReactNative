import {ImageHeader,Images} from '../../assets'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, View, Image, Text,Dimensions, Button,TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import API from '../../service';
import { Btn, Txt,TxtArea,Title } from '../../component';
import Select2 from 'react-native-select-two';
import { useSelector } from 'react-redux';
import ScreenLoading from '../loading/ScreenLoading';


const History = ({ navigation, route }) => {
  const TOKEN = useSelector((state) => state.TokenReducer);
  const USER = useSelector((state) => state.UserReducer);
  const USER_ID = useSelector((state) => state.UserReducer.id);
  const [search, setSearch] = useState("");
  const [page,setPage] = useState("1");
  const [img, setImg] = useState([]);
  const [amount, setAmount] = useState(0);
  const [statusName, setStatusName] = useState('');
  const [todos, setTodos] = useState([{'id' : 'notice','name' : 'Penyampaian Surat'},{'id' : 'lock','name' : 'Penyegelan'},{'id' : 'notice2','name' : 'Kunjungan'},{'id' : 'unplug','name' : 'Cabutan'}])
  const [data, setData] = useState([]);
  const [dataShow, setDataShow] = useState({'nomorrekening' : '', 'namapelanggan' : '', 'alamat' : '', 'idgol' : '',
  'nomorhp' : '', 'tglentry' : '', 'wmnomor' : '', 'wmukuran' : ''
  });
  const [date, setDate] = useState("0000-00-00");
  const [loading, setLoading] = useState(true)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState([]);
  const [nextPage, setNextPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [lastPage, setLastPage] = useState([]);
  const [totalPage, settotalPage] = useState([]);
  let number = [];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
 const handleConfirm = (date) => {
    // setLoading(true);
    const dated = date.getFullYear() + "-" + ('0' + (date.getMonth()+1)).slice(-2) + "-" + ('0' + (date.getDate())).slice(-2);
    console.log('ssssssaa',dated)
    // Axios.get(API_URL+'installment/installmenthistorysearch/'+contact_id+'/'+dated,
    // {
    //   headers :{
    // otherHeader : "foo",
    //     Authorization: (`Bearer ${token}`),
    //     'Accept' : 'application/json'
    //   }
    // }
    // )
    //   .then(res => {
    //     // console.log('ssssddd',res.data.data)
    //     setData(res.data.data);

    //   }).catch(err => console.log('err: ', err))
    //   .finally(() => {
    //     setLoading(false);
    //   })
    setDate(dated);
    hideDatePicker();
  
  };


  // real
  function toRupiah(amount){
    const rupiah = String(amount)
     .replace(/\B(?=(\d{3})+(?!\d))/g, '.')+',00';
     return rupiah;
   }

   const actionStaffListsAPi = () => {
    console.log(String(1))
    setLoading(true)
    if(date == "0000-00-00"){
      API.historyLock(USER_ID+'?page='+1+'&status='+status+'&search='+search+'&date='+"", TOKEN).then((result) => {
        // setStaffs(result.data)
        console.log('staff',result)
        console.log('staff1',result.message)
        console.log('staff2',result.data.current_page)
        setData(result.data.data)
        setCurrentPage(result.data.current_page)
        setLastPage(result.data.last_page)
        settotalPage(result.data.total)
        setPreviousPage(result.data.current_page-1)
        setNextPage(result.data.current_page+1)
        setLoading(false)
    }).catch((e) => {
        console.log(e.request);
        setLoading(false)
    })
    }
else{
  API.historyLock(USER_ID+'?page='+1+'&status='+status+'&search='+search+'&date='+date, TOKEN).then((result) => {
    // setStaffs(result.data)
    console.log('staff',result)
    console.log('staff1',result.message)
    console.log('staff2',result.data.current_page)
    setData(result.data.data)
    setCurrentPage(result.data.current_page)
    setLastPage(result.data.last_page)
    settotalPage(result.data.total)
    setPreviousPage(result.data.current_page-1)
    setNextPage(result.data.current_page+1)
    setLoading(false)
}).catch((e) => {
    console.log(e.request);
    setLoading(false)
})
}
}

const ShowDetail = (lock_id) => {
  console.log(lock_id)
  setPage('2')
  setLoading(true)
  API.sealHistoryShow(lock_id,TOKEN).then((result) => {
      setDataShow(result.data)
      console.log('data',result.data)
      // console.log('rrr',result.data.image);
      // console.log('rrr',number);
      // number = result.data.image;
      setImg(result.data2)
      // console.log('ss',img);
      // setListPayment(result.data2)
      // setTotalPayment(result.data3)
      setLoading(false)
  }).catch((e) => {
      console.log(e.request);
      setLoading(false)
  })
}

const handleSearch = (value) => {
   setStatus(value)
    console.log('1', value);
}

const searchBy = () => {
  actionStaffListsAPi();
}

const deleteLock = (id_costumer) => {
  
  Alert.alert(
    'Peringatan',
    `Anda Yakin Menghapus Data Penyegelan ? `,
    [
        {
            text: 'Tidak',
            // onPress : () => console.log('tidak')
        },
        {
            text: 'Ya',
            // onPress : () => {generateCodeOTP(); setModalVisible(true)}
            onPress: () =>
            {
              setLoading(true)
  API.deleteLock(id_costumer,TOKEN).then((result) => {
      // setStaffs(result.data)
      setPage("1")
      actionStaffListsAPi();
      // setLoading(false)
  }).catch((e) => {
      console.log(e.request);
      setLoading(false)
  })
            }

        }
      ]
  )
 
}


const reset = () => {
  setDate("00-00-0000");
  setStatus('');
  setSearch('');
  setTodos([{'id' : 'notice','name' : 'Penyampaian Surat'},{'id' : 'lock','name' : 'Penyegelan'},{'id' : 'notice2','name' : 'Kunjungan'},{'id' : 'unplug','name' : 'Cabutan'}]);
  setLoading(true)
  API.historyLock(USER_ID+'?page='+previousPage+'&status='+''+'&search='+''+'&date='+'',TOKEN).then((result) => {
      // setStaffs(result.data)
      console.log('staff',result)
      console.log('staff1',result.message)
      console.log('staff2',result.data.current_page)
      setData(result.data.data)
      setCurrentPage(result.data.current_page)
      setLastPage(result.data.last_page)
      settotalPage(result.data.total)
      setPreviousPage(result.data.current_page-1)
      setNextPage(result.data.current_page+1)
      setLoading(false)
  }).catch((e) => {
      console.log(e.request);
      setLoading(false)
  })
}

const AddPag = (val)=>{
  if(val === 0){
    if(currentPage > 1){
      console.log(previousPage)
      setLoading(true)
      if(date == "0000-00-00"){
        API.historyLock(USER_ID+'?page='+previousPage+'&status='+status+'&search='+search+'&date='+"", TOKEN).then((result) => {
          // setStaffs(result.data)
          console.log('staff',result)
          console.log('staff1',result.message)
          console.log('staff2',result.data.current_page)
          setData(result.data.data)
          setCurrentPage(result.data.current_page)
          setLastPage(result.data.last_page)
          settotalPage(result.data.total)
          setPreviousPage(result.data.current_page-1)
          setNextPage(result.data.current_page+1)
          setLoading(false)
      }).catch((e) => {
          console.log(e.request);
          setLoading(false)
      })
      }
      else{
      API.historyLock(USER_ID+'?page='+previousPage+'&status='+status+'&search='+search+'&date='+date,TOKEN).then((result) => {
          // setStaffs(result.data)
          console.log('staff',result)
          console.log('staff1',result.message)
          console.log('staff2',result.data.current_page)
          setData(result.data.data)
          setCurrentPage(result.data.current_page)
          setLastPage(result.data.last_page)
          settotalPage(result.data.total)
          setPreviousPage(result.data.current_page-1)
          setNextPage(result.data.current_page+1)
          setLoading(false)
      }).catch((e) => {
          console.log(e.request);
          setLoading(false)
      })
    }
  }
    else{

    }
  }
  else{
    if(currentPage < lastPage){
      console.log('test',nextPage)
      setLoading(true)
      if(date == "0000-00-00"){
        API.historyLock(USER_ID+'?page='+nextPage+'&status='+status+'&search='+search+'&date='+"", TOKEN).then((result) => {
          // setStaffs(result.data)
          console.log('staff',result)
          console.log('staff1',result.message)
          console.log('staff2',result.data.current_page)
          setData(result.data.data)
          setCurrentPage(result.data.current_page)
          setLastPage(result.data.last_page)
          settotalPage(result.data.total)
          setPreviousPage(result.data.current_page-1)
          setNextPage(result.data.current_page+1)
          setLoading(false)
      }).catch((e) => {
          console.log(e.request);
          setLoading(false)
      })
      }
      else{
      API.historyLock(USER_ID+'?page='+nextPage+'&status='+status+'&search='+search+'&date='+date,TOKEN).then((result) => {
          // setStaffs(result.data)
          console.log('staff',result)
          console.log('staff1',result.message)
          console.log('staff2',result.data.current_page)
          setData(result.data.data)
          setCurrentPage(result.data.current_page)
          setLastPage(result.data.last_page)
          settotalPage(result.data.total)
          setPreviousPage(result.data.current_page-1)
          setNextPage(result.data.current_page+1)
          setLoading(false)
      }).catch((e) => {
          console.log(e.request);
          setLoading(false)
      })
    }
    }
    else{
      // actionStaffListsAPi();
    }
  }

}
  

useEffect(() => {
  // if(isFocused){
  console.log('test')
  // ShowDetail();
  // ShowDetail(6);
  actionStaffListsAPi();
  //    }
}, [])


  return (
    <View style={styles.container}> 
      
      {/* <View style={{ flexDirection : "row" }}></View> */}
{page == "1" &&<View style={styles.content}>
<View style={{ flexDirection : "row", borderBottomWidth:1, paddingBottom:10 }}><Text style={styles.label1H}>Histori Penyegelan</Text></View>
<Text style={styles.label4}>Bulan Catat</Text>


                    <TouchableOpacity style={{borderColor: '#000000', borderWidth: 1, height:50,fontSize : 14,borderRadius:0, }} onPress={showDatePicker} ><Text style={{fontSize : 14, paddingTop: 10, paddingLeft : 10}} >{date}</Text></TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                 
<Txt title='Pilih Status:'/>

{loading &&
  <View style = {{borderColor: '#000000', borderWidth: 1, height:50,fontSize : 14,borderRadius:0, }}>
<Text style={{fontSize : 14, paddingTop: 10, paddingLeft : 10}}>
 {status == 'notice' &&
<View>
<Text style={{fontSize : 14, paddingTop: 10, paddingLeft : 10}}>Penyampaian Surat</Text>
</View>
  }
  {status == 'lock' &&
<View>
<Text style={{fontSize : 14, paddingTop: 10, paddingLeft : 10}}>Penyegelan</Text>
</View>
  }
   {status == 'notice2' &&
<View>
<Text style={{fontSize : 14, paddingTop: 10, paddingLeft : 10}}>Kunjungan</Text>
</View>
  }
   {status == 'unplug' &&
<View>
<Text style={{fontSize : 14, paddingTop: 10, paddingLeft : 10}}>Cabutan</Text>
</View>
  }

</Text>

</View>
}


                                    {!loading && todos && 
                                        <Select2
                                        
                                            searchPlaceHolderText='Cari Status'
                                            title='Status'
                                            
                                            isSelectSingle
                                            style={{  
                                                borderRadius: 0,
                                                borderColor: '#000000',
                                                borderWidth: 1,
                                                height:50
                                            }}
                                            buttonStyle={{ 
                                                backgroundColor:'#0C5CBF',
                                                height:45,
                                                borderRadius:0
                                            }}
                                            buttonTextStyle={{
                                                color:'#FFFFFF'                                        
                                            }}
                                            colorTheme={'#0C5CBF'}
                                            popupTitle='Pilih Status'
                                            data={todos}
                                            onSelect={data => {
                                                handleSearch(data[0])
                                            }}
                                            onRemoveItem={data => {
                                                handleSearch(data[0])
                                            }} 
                                            selectButtonText ='Simpan'
                                            cancelButtonText='Batal'
                                      
                                        />
                                    } 
      <Text style={styles.label4}>No. SBG/Nama</Text>
      {loading &&
 <View style={styles.searchGroup}>
 <TextInput
  style={styles.search}
     placeholder="No. SBG/Nama"
     editable={false}
     value={search}
     onChangeText ={(value)=>  setSearch(value)}
 ></TextInput>

<View style={{ flexDirection :"row" }}>
<TouchableOpacity style={styles.button2}>
   <Text style={styles.label2white}>Reset</Text>
 </TouchableOpacity>
<TouchableOpacity style={styles.button2}>
   <Text style={styles.label2white}>Cari</Text>
 </TouchableOpacity>
</View>
</View>
      }
        {!loading &&
 <View style={styles.searchGroup}>
 <TextInput
  style={styles.search}
     placeholder="No. SBG/Nama"
     value={search}
     onChangeText ={(value)=>  setSearch(value)}
 ></TextInput>

<View style={{ flexDirection :"row" }}>
<TouchableOpacity style={styles.button2} onPress={()=> reset()}>
   <Text style={styles.label2white}>Reset</Text>
 </TouchableOpacity>
<TouchableOpacity style={styles.button2} onPress={()=> searchBy()}>
   <Text style={styles.label2white}>Cari</Text>
 </TouchableOpacity>
</View>

</View>
      }
      
      <ScrollView style={styles.data}>
        {loading &&
        <ScreenLoading/>
        }

{!loading && data.map((item, key)=>{
  return <View key ={key} style={styles.data1}>
  <View style={styles.col1}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>{key + 1+(10*(currentPage-1))}). {item.nomorrekening}</Text>
    <Text style={styles.label3}>{item.namapelanggan}</Text>
    <Text style={styles.label3}>{item.alamat}</Text>
    {item.type == 'notice' &&
    <View>
    <Text style={[styles.label3,{fontWeight:"bold"}, {textAlign : "center"}]}>
      P.Surat
    </Text>
    </View>
    }
       {item.type == 'lock' &&
    <View>
    <Text style={[styles.label3,{fontWeight:"bold"}, {textAlign : "center"}]}>
      Penyegelan
    </Text>
    </View>
    }
       {item.type == 'notice2' &&
    <View>
    <Text style={[styles.label3,{fontWeight:"bold"}, {textAlign : "center"}]}>
      Kunjungan
    </Text>
    </View>
    }
       {item.type == 'unplug' &&
    <View>
    <Text style={[styles.label3,{fontWeight:"bold"}, {textAlign : "center"}]}>
      Cabutan
    </Text>
    </View>
    }
  </View>
  <View style={styles.col2}>
    <TouchableOpacity onPress={()=> ShowDetail(item.id)}>
<Text>Buka <Icon name='chevron-forward-outline' size={12}/></Text>
</TouchableOpacity>
  </View>
</View>

})}

      </ScrollView>

      
{loading &&
  <View style ={styles.footer}> 
<View style={styles.paginate}>
<Text>{currentPage} of {lastPage} from {totalPage} data</Text>
<TouchableOpacity disabled={true}>
<Icon name='chevron-back-outline' size={20} color = {"rgb(255,0,0)"}/>
</TouchableOpacity>
<TouchableOpacity disabled={true}>
<Icon name='chevron-forward-outline' size={20} color = {"rgb(255,0,0)"}/>
</TouchableOpacity>
</View>
</View>
}
{!loading &&
  <View style ={styles.footer}> 
<View style={styles.paginate}>
<Text>{currentPage} of {lastPage} from {totalPage} data</Text>
<TouchableOpacity onPress={()=>AddPag(0)}>
<Icon name='chevron-back-outline' size={20} color = {"rgb(255,0,0)"}/>
</TouchableOpacity>
<TouchableOpacity onPress={()=>AddPag(1)}>
<Icon name='chevron-forward-outline' size={20} color = {"rgb(255,0,0)"}/>
</TouchableOpacity>
</View>
</View>
}
      </View>
    }

{page == "2" && <View style={styles.content}>
<View style={{ flexDirection : "row", borderBottomWidth:1, paddingBottom:10 }}>
  <TouchableOpacity onPress={()=> setPage('1')}><Text style={{ color : "rgb(255,0,0)" }}><Icon name='chevron-back-outline' size={12} color = {"rgb(255,0,0)"}/>BACK</Text></TouchableOpacity>
  <Text style={styles.label1H}>Histori Penyegelan</Text></View>
  <View style={styles.top}>
      <Text style={[styles.label4, {textAlign:"center"}]}>{new Date().getDate() + "-"+ parseInt(new Date().getMonth()+1) +"-"+new Date().getFullYear()}</Text>
      </View>
      <View style={styles.top}>
      <Text style={styles.label1}>PERUMDA TIRTA AMERTHA BUANA TABANAN</Text>
      </View>
      <View style={styles.top}>
      <Text style={{  fontSize: 16, color : "#000000", fontWeight : "bold" }}>Data Pelanggan</Text>
      </View>
      {loading &&
        <ScreenLoading/>
        }
          {!loading &&
       
      <ScrollView style={styles.formData}>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>No. SBG</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    {dataShow.nomorrekening}</Text>
    </View>
  </View>
  
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Nama</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    {dataShow.namapelanggan}</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Alamat</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    {dataShow.alamat}</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Golongan</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    {dataShow.idgol}</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>No Telp</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    {dataShow.nomorhp}</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Tgl Pasang</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    {dataShow.tglentry}</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>No. WM</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    {dataShow.wmnomor}</Text>
    </View>
  </View>
  </View>

  <View style={styles.formGroup}>
  <View style={styles.formField}>
    <View style={styles.col21}>
    <Text style={[styles.label3,{fontWeight:"bold"}]}>Diameter WM</Text>
    </View>
    <View style={styles.col22}>
    <Text style={styles.label3}>:    {dataShow.wmukuran}</Text>
    </View>
  </View>
  </View>
  <View style={styles.formGroup}>
    <View style={styles.formField}>
      <View style={styles.col21}>
      <Text style={[styles.label3,{fontWeight:"bold"}]}>Catatan</Text>
      </View>
      <View style={styles.col22}>
      <Text style={styles.label3}>:    {dataShow.memo}</Text>
      </View>
    </View>
    </View>
  {dataShow.type == 'notice' &&
<View>
<Text style ={styles.label1}>Penyampaian Surat</Text>
</View>
  }
  {dataShow.type == 'lock' &&
<View>
<Text style ={styles.label1}>Penyegelan</Text>
</View>
  }
   {dataShow.type == 'notice2' &&
<View>
<Text style ={styles.label1}>Kunjungan</Text>
</View>
  }
   {dataShow.type == 'unplug' &&
<View>
<Text style ={styles.label1}>Cabutan</Text>
</View>
  }

  {!loading &&
  console.log('ksksk'+dataShow.image)}
  {
   
   img && img.map((item, key)=>{
    return <View key={key}>
      {/* <Text>{item}</Text> */}
       <Image source={{uri : (`https://simpletabadmin.ptab-vps.com${item}`)}} style={styles.images}/>
    </View>
  })
  }
    <TouchableOpacity style={styles.buttonRed} onPress={()=>{deleteLock(dataShow.id)}}>
  <Text style={styles.label2white}>Hapus Penyegelan</Text>
</TouchableOpacity>
      </ScrollView>
}
      </View>
    }



      </View>
 
  )
}

export default History


const windowWidht =Dimensions.get('window').width;
const windowHeight =Dimensions.get('window').height;

const styles = StyleSheet.create({

  footer : {
    windowWidht : windowWidht*0.8,
    marginTop : windowHeight*0.01,
    padding : windowWidht*0.02,
    margin : "auto",
    borderWidth : 1,
    backgroundColor : "#FFFFFF",
    },
      paginate : {
        flexDirection : "row",
    marginLeft : "auto",
      },
  container:
  {
    flex: 1,

  },
  date: {
    width : windowWidht*0.9,
    height : windowHeight*0.03,
    borderWidth : 1,
    marginHorizontal : windowWidht*0.04,
color : "#000000",
backgroundColor : "#FFFFFF",
  },
  formField:{
flexDirection : "row",
paddingVertical : windowHeight*0.015,
  },
  data : {
    marginTop : windowHeight*0.02,
    width: windowWidht*1,
    height : windowHeight*0.44,
    backgroundColor : '#FFFFFF',
  },
  dataCollom : {
    flexDirection : "row",
    marginTop : windowHeight*0.05,
    width: windowWidht*0.9,
    marginHorizontal : windowWidht*0.025,
    backgroundColor : '#FFFFFF',
  },
  top : {
    marginTop : windowHeight*0.01,
  },

  formData : {
    marginTop : windowHeight*0.02,
    width: windowWidht*0.95,
    marginHorizontal : windowWidht*0.005,
    height : windowHeight*0.75,
    backgroundColor : '#FFFFFF',
  },
  data1 : {
    flexDirection : "row",
   marginHorizontal : windowWidht*0.01,
    width :windowWidht*1,
    // paddingBottom : windowHeight*0.03,
borderBottomWidth : 1,
  },
  formGroup : {
    width :windowWidht*0.8,
  },
  col1 : {
    width :windowWidht*0.68,
  },
  col2 : {
    marginVertical : windowHeight*0.05,
    width :windowWidht*0.3,
  },
  col3 : {
    width :windowWidht*0.3,
  },
  col4 : {
    width :windowWidht*0.3,
  },

  col21 : {
    width :windowWidht*0.3,
  },
  col22 : {
    width :windowWidht*0.64,
  },
  content : {
    paddingTop : windowHeight*0.02,
    paddingHorizontal : windowWidht*0.02,
  },
  loadingImg :{ 
    alignItems : "center", 
    paddingTop:  windowHeight*0.04,
},
loading :{ 
  alignItems : "center", 
},
historyDay :{
  backgroundColor : "#FFFFFF",
height:  windowHeight*0.18,
width:  windowWidht*0.9,
borderWidth: 1,
borderColor: "rgba(0,0,0,0.5)",
},
  floatingScreen :{
    marginTop : windowHeight*0.02,
    width : windowWidht *0.9,
    height:  windowWidht*0.12,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor : "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",

  },
  labelTitle :{
    fontSize: 30,
    color : "#FFFFFF",
    marginBottom : windowHeight*0.03,
    textAlign: "center",
    fontWeight : "bold"
  },
  label1 :{
    fontSize: 14,
    color : "#000000",
    textAlign: "center",
    fontWeight : "bold"
  },

  label1H :{
    width : windowWidht*0.8,
    fontSize: 20,
    color : "#000000",
    textAlign: "center",
    fontWeight : "bold"
  },
  label2 :{
    fontSize: 20,
  },
  label2white :{
    color:'#FFFFFF',
    fontSize: 20,
  },
  label2whitecenter :{
    textAlign : "center",
    color:'#FFFFFF',
    fontSize: 20,
  },
  label3 :{
    color:"#000000",
    fontSize: 16,

  },
  label4 :{
    color:"#000000",
    fontSize: 12,

  },
  label3white :{
    color:'#FFFFFF',
    fontSize: 16,
  },
  label2blue :{
    fontSize: 20,
    color:'rgba(0,0,255,1)',
  },
  center : {
    // marginTop: windowHeight*0.1,
    alignItems: 'center',
  },
  header:{
    alignItems: 'center',
  },

  iconGroup:{
    flexDirection: 'row',
  },

  square:{
    alignItems : "center",
    height:  windowWidht*0.22,
    width: windowWidht*0.22,
    marginTop : windowWidht*0.05,
    marginHorizontal : windowWidht*0.1,
    backgroundColor : "rgba(0,191,255,0.1)",
    borderRadius : 2,
    borderWidth: 0.5,
    borderColor : "rgba(0,191,255,0.01)",

  },

  iconBack:{
    alignItems : "center",
    height:  windowWidht*0.6,
    width: windowWidht*0.8,
    marginVertical : windowWidht*0.1,
    marginHorizontal : windowWidht*0.1,
    backgroundColor : "#FFFFFF",

  },
  imageSend:{
    marginVertical : windowHeight*0.01,
    marginHorizontal : windowWidht*0.022,
    width: windowWidht*0.4,
    height:  windowWidht*0.2,
    borderWidth: 5,
    borderColor: "red",

  },

  icon:{
    marginVertical : windowHeight*0.01,
    width: windowWidht*0.78,
    height:  windowWidht*0.58,
    borderWidth: 5,
    borderColor: "red",

  },
  images :{
    width: windowHeight*0.42,
    height:  windowHeight*0.36,
    marginHorizontal : windowHeight*0.02,
    marginTop:windowHeight*0.01,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "red",
  
  },
  imagesLoading :{
    width: windowHeight*0.12,
    height:  windowHeight*0.12,
    marginRight:10,
    // borderRadius : 150/2,
    marginTop:windowHeight*0.01,
    overflow: "hidden",
    // borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
  
  },
 

  centerModal : {
    marginTop: windowHeight*0.19,

    alignItems: 'center',
  },
  marginH : {
    marginHorizontal : windowWidht*0.04,
    marginTop : windowHeight*0.02,
  },
  leftButton : {
    width:  windowWidht*0.9,
  },
  marginTop : {
    marginTop : windowHeight*0.05,
  },
  search:{
    width: windowWidht*0.95,
    borderRadius: 1,
    borderBottomWidth: 0.5,
    color:'#000000',
    borderColor: "rgba(0,0,0,0.5)",
    backgroundColor : "#FFFFFF",
    marginHorizontal: windowWidht*0.05,
    marginVertical : windowHeight*0.01
  },
  searchGroup:{
   alignItems : "center",
  },
  button:{
    marginHorizontal : windowWidht*0.05,
    marginTop : windowHeight*0.01,
    width: windowWidht*0.87,
    borderRadius : 3,
    // borderWidth : 1,
    // borderColor : "red",
    height : windowHeight*0.05,
    backgroundColor:'#1DA0E0',
    alignItems : "center",
  },
  button2:{
    marginHorizontal : windowWidht*0.05,
    marginTop : windowHeight*0.01,
    width: windowWidht*0.4,
    borderRadius : 3,
    // borderWidth : 1,
    // borderColor : "red",
    height : windowHeight*0.05,
    backgroundColor:'#1DA0E0',
    alignItems : "center",
  },
  buttonRed:{
    marginHorizontal : windowWidht*0.01,
    marginTop : windowHeight*0.01,
    width: windowWidht*0.95,
    borderRadius : 3,
    // borderWidth : 1,
    // borderColor : "red",
    height : windowHeight*0.05,
    backgroundColor:'red',
    alignItems : "center",
  },
})