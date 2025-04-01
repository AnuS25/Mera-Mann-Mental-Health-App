import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const MealPlannerScreen = () => {
  const currentDate = moment();
  const startOfWeek = currentDate.clone().startOf('week');
  const [date, setDate] = useState('');
  const [nextDate, setNextDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation();
  const [menuData, setMenuData] = useState([]);

  const fetchAllMenuData = async () => {
    try {
      const response = await axios.get('https://mentalapp-backend.onrender.com/menu/all');
      setMenuData(response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const deleteItemsByDate = async () => {
  try {
        console.log('Selected date before encoding:', selectedDate);  // Log to check the date

    const encodedDate = encodeURIComponent(selectedDate); // Encoding date for URL
    console.log("Attempting to delete items for date:", encodedDate); // Debugging log

    const response = await axios.delete(`https://mentalapp-backend.onrender.com/deleteItems/${encodedDate}`);
    if (response.status == 200) {
      fetchAllMenuData(); // Re-fetch the menu data after deletion
    } else {
      console.log('Failed to delete the menu');
    }
  } catch (error) {
    console.log('Error deleting the items by date', error);
  }
};


  const copyItems = async () => {
    const formattedPrevDate = date;
    const formattedNextDate = nextDate;
    const response = await axios.post('https://mentalapp-backend.onrender.com/copyItems', {
      prevDate: formattedPrevDate,
      nextDate: formattedNextDate,
    });

    if (response.status == 200) {
      fetchAllMenuData();
      Alert.alert('Success', 'Items copied');
    } else {
      Alert.alert('Error', 'Failed to copy');
    }
  };

  // const deleteItems = date => {
  //   setSelectedDate(date.format('ddd') + ' ' + date.format('DD'));
  // };
const deleteItem = async (itemId) => {
  try {
        console.log("Attempting to delete item with ID:", itemId); // Debugging log

    const response = await axios.delete(`https://mentalapp-backend.onrender.com/deleteItem/${itemId}`);

    if (response.status === 200) {
      console.log('Item deleted:', itemId);
      fetchAllMenuData(); // Re-fetch the menu data after deletion
    }
  } catch (error) {
    console.log('Error deleting the item', error);
  }
};


  useEffect(() => {
    fetchAllMenuData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAllMenuData();
    }, []),
  );
// const handleDeleteOption = (itemId, date) => {
//     alert(
//       'Delete Options',
//       'Choose what you want to delete:',
//       [
//         {
//           text: 'Delete This Item',
//           onPress: () => deleteItem(itemId),
//         },
//         {
//           text: 'Delete All Items for This Date',
//           onPress: () => {
//             setSelectedDate(date); // Set selected date for delete action
//             deleteItemsByDate();
//           },
//         },
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//       ],
//       { cancelable: true }
//     );
//   };

const handleDeleteOption = (itemId, date) => {
    console.log("Handling delete for itemId:", itemId, "on date:", date); // Debugging log

  Alert.alert(
    'Delete Options',
    'Choose what you want to delete:',
    [
      {
        text: 'Delete This Item',
onPress: async () => {
          try {
            const response = await deleteItem(itemId); // Calls deleteItem
            console.log(response);
          } catch (error) {
            console.error("Error deleting item:", error);
          }
        },      },
      {
        text: 'Delete All Items for This Date',
       onPress: async () => {
          try {
            setSelectedDate(date); // Set selected date for delete action
            await deleteItemsByDate(); // Calls deleteItemsByDate
          } catch (error) {
            console.error("Error deleting items by date:", error);
          }
        },
      },
      {
        text: 'Cancel',
        style: 'cancel', // Adds a cancel option
      },
    ],
    { cancelable: true }
  );
};
  const renderWeekDates = startOfWeek => {
    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = startOfWeek.clone().add(i, 'days');

      const formattedDate = date.format('ddd DD');

      const menuForDate = menuData.find(menu => menu.date == formattedDate);

      const isCurrentDate = date.isSame(currentDate, 'day');

      weekDates.push(
        <View style={{ flexDirection: 'row', gap: 12, marginVertical: 10 }} key={i}>
          <View
            style={[
              {
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: 'white',
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              },
              isCurrentDate && { backgroundColor: 'black' },
            ]}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '500',
                color: isCurrentDate ? 'white' : 'black',
              }}
            >
              {date.format('DD')}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '500',
                color: isCurrentDate ? 'white' : 'black',
              }}
            >
              {date.format('ddd')}
            </Text>
          </View>
          <Pressable
            onPress={() =>
              navigation.navigate('Menu', {
                date: date.format('ddd') + ' ' + date.format('DD'),
                items: menuForDate?.items,
                deleteItem: deleteItem,  // Pass deleteItem function
              deleteItemsByDate: deleteItemsByDate,
                    handleDeleteOption: handleDeleteOption, // Pass handleDeleteOption function

              })
            }
            style={[
              {
                backgroundColor: 'white',
                borderRadius: 8,
                padding: 10,
                width: '85%',
              },
              menuForDate && {
                height: 'auto',
              },
              !menuForDate && {
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '600',
                color: 'gray',
              }}
            >
              {menuForDate ? 'Meal plan' : 'There is no menu'}
            </Text>
            {menuForDate && (
              <View>
                {menuForDate?.items.some(item => item.mealType == 'Breakfast') && (
                  <View>
                    <View
                      style={{
                        backgroundColor: '#E0E0E0',
                        paddingHorizontal: 12,
                        paddingVertical: 3,
                        marginVertical: 5,
                        width: 100,
                        borderRadius: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 13,
                          textAlign: 'center',
                        }}
                      >
                        Breakfast
                      </Text>
                    </View>
                    {menuForDate?.items
                      .filter(item => item.mealType == 'Breakfast')
                      .map((item, index) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 12,
                            marginVertical: 4,
                          }}
                          key={index}
                        >
                          <View
                            style={{
                              backgroundColor: '#fd5c63',
                              paddingHorizontal: 7,
                              paddingVertical: 4,
                              borderRadius: 20,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 11,
                                textAlign: 'center',
                                color: 'white',
                              }}
                            >
                              {item?.type}
                            </Text>
                          </View>

                          <Text style={{ fontWeight: '500' }}>{item?.name}</Text>
                        </View>
                      ))}
                  </View>
                )}
                {menuForDate?.items.some(item => item.mealType == 'Lunch') && (
  <View>
    <View
      style={{
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 12,
        paddingVertical: 3,
        marginVertical: 5,
        width: 100,
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          fontWeight: '600',
          fontSize: 13,
          textAlign: 'center',
        }}
      >
        Lunch
      </Text>
    </View>
    {menuForDate?.items
      .filter(item => item.mealType == 'Lunch')
      .map((item, index) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginVertical: 4,
          }}
          key={index}
        >
          <View
            style={{
              backgroundColor: '#fd5c63',
              paddingHorizontal: 7,
              paddingVertical: 4,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                textAlign: 'center',
                color: 'white',
              }}
            >
              {item?.type}
            </Text>
          </View>

          <Text style={{ fontWeight: '500' }}>{item?.name}</Text>
        </View>
      ))}
  </View>
)}

{menuForDate?.items.some(item => item.mealType == 'Dinner') && (
  <View>
    <View
      style={{
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 12,
        paddingVertical: 3,
        marginVertical: 5,
        width: 100,
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          fontWeight: '600',
          fontSize: 13,
          textAlign: 'center',
        }}
      >
        Dinner
      </Text>
    </View>
    {menuForDate?.items
      .filter(item => item.mealType == 'Dinner')
      .map((item, index) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginVertical: 4,
          }}
          key={index}
        >
          <View
            style={{
              backgroundColor: '#fd5c63',
              paddingHorizontal: 7,
              paddingVertical: 4,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                textAlign: 'center',
                color: 'white',
              }}
            >
              {item?.type}
            </Text>
          </View>

          <Text style={{ fontWeight: '500' }}>{item?.name}</Text>
        </View>
      ))}
  </View>
)}

              </View>
            )}
          </Pressable>
        </View>
      );
    }

    return weekDates;
  };

  const renderWeeks = numWeeks => {
    const weeks = [];
    for (let i = 0; i < numWeeks; i++) {
      weeks.push(
        <View key={i}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 10 }}>
            {startOfWeek
              .clone()
              .add(i * 7, 'days')
              .format('DD MMM')}
          </Text>
          <View>{renderWeekDates(startOfWeek.clone().add(i * 7, 'days'))}</View>
        </View>,
      );
    }
    return weeks;
  };

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ flex: 1, padding: 12 }}>
        {renderWeeks(3)}
      </View>
    </ScrollView>
  );
};

export default MealPlannerScreen;

const styles = StyleSheet.create({});