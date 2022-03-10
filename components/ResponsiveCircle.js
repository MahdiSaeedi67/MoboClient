import React, { useEffect, useState, useRef } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'

const { height, width } = Dimensions.get('window')

function roundOff(v) {
    return Math.round(v)
}

function dimensions() {

    var _borderRadius = roundOff((height + width) / 2),
        _height = roundOff(height),
        _width = roundOff(width)

    return { _borderRadius, _height, _width }
}

export default function ResponsiveCircle(props) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height:props.height,width:props.width,top:props.top,left:props.left,backgroundColor:props.backgroundColor, borderRadius: dimensions()._borderRadius}} >
                <Text style={styles.text}>
                    {props.children}
                </Text>
            </View>
        </SafeAreaView>
    )

}

const commonStyles = { alignItems: 'center', justifyContent: 'center', }

const styles = StyleSheet.create({
    container: { flex: 1, ...commonStyles },
    circleView: {  borderRadius: dimensions()._borderRadius, ...commonStyles },
    text: { textAlign: 'center', lineHeight: 25, color: 'black', fontWeight: 'bold' }
})