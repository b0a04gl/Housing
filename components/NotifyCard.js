import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tailwind from 'tailwind-rn';

const NotifyCard = ({itemData}) => {
  console.log("notifycard");
console.log(itemData);

  return (

      <View
        style={
          tailwind('h-4/5 py-5')
        }>
        <TouchableOpacity
          style={tailwind('bg-blue-600 px-0 pt-1 py-1 rounded')}
          onPress={() => {}}>
          <View style={tailwind('py-3 px-4')}>
            <Text style={tailwind('text-white text-lg font-bold mb-1 self-center')} numberOfLines={1}>
              {itemData.title.toUpperCase()}
            </Text>
            <Text style={tailwind('text-white text-sm')} numberOfLines={4}>
            {itemData.body}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

  );
}

export default NotifyCard;
