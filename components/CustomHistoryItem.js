import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HistoryStyles } from '../styles/styles'
import { FontAwesome } from '@expo/vector-icons'
import moment from 'moment/moment'

const CustomHistoryItem = ({ id, logDescription, createdAt }) => {
  let dates = []
  dates = moment(createdAt.toDate()).format('MMMM Do YYYY')
  return (
    <View style={HistoryStyles.container} id={id}>
        <FontAwesome
                name='history'
                color='#ea071d'
                style={HistoryStyles.historyIcon}
              />
        <Text style={HistoryStyles.text}>{logDescription}</Text>
        <Text style={HistoryStyles.date}>{dates}</Text>
    </View>
  )
}

export default CustomHistoryItem

const styles = StyleSheet.create({})