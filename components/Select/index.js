import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { AiFillCaretDown } from "react-icons/ai";
const { width } = Dimensions.get("window");

const Select = ({ options, onChangeSelect, text }) => {
  const [txt, setTxt] = useState(text);
  const [modalVisible, setModalVisible] = useState(false);

  function renderOption(item) {
    return (
      <touchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          padding: 10,
        }}
        onPress={() => {
          onChangeSelect(item.id);
          setTxt(item.title);
          setModalVisible(false);
        }}
      >
        <Text style={styles.optionTxt}>{item.title}</Text>
      </touchableOpacity>
    );
  }

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.txt} numberOfLines={1}>
          {txt}
        </Text>
        <AiFillCaretDown
          name="chevron-down"
          size={26}
          color="blue"
        ></AiFillCaretDown>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView>
          <View style={styles.headerModal}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AiFillCaretDown
                name="chevron-down"
                size={30}
                color={"#555"}
              ></AiFillCaretDown>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{text}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancel}>انصراف</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={options}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => renderOption(item)}
          ></FlatList>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    fontFamily:'Vazir',
    backgroundColor: "#F8F9FA",
    paddingLeft: 12,
    paddingHorizontal: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#CCC",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txt: {
    color: "#555",
    fontFamily:'Vazir',
    fontSize: 16,
    width: width - 90,
  },
  headerModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 12,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  modalTitle: {
    fontFamily:'Vazir',
    fontSize: 18,
    color: "#555",
  },
  modalCancel: {
    fontSize: 14,
    color: "blue",
    fontWeight: "600",
  },
  optionContainer: {
    //flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
    // borderBottomColor:'#eee',
    // borderBottomWidth:1,
    // padding:10,
  },
  optionTxt: {
    fontFamily:'Vazir',
    fontSize: 16,
    color: "#555",
  },
});
export default Select;
