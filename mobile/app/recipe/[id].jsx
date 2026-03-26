import { View, Text } from 'react-native'
import React from 'react'
import {useLocalSearchParams} from "expo-router"

const RecipeDetailScreen = () => {
    const {} = useLocalSearchParams()
  return (
    <View>
      <Text>RecipeDetailScreen</Text>
    </View>
  )
}

export default RecipeDetailScreen