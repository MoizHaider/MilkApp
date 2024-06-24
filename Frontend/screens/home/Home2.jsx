import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const goToToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const selectedYear = new Date(selectedDate).getFullYear();
  const selectedMonth = new Date(selectedDate).toLocaleString("default", {
    month: "long",
  });
  const selectedDay = new Date(selectedDate).getDate();
  
  function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  var day = getDayName(selectedDate, "en");

  // Create a marked dates object
  const getMarkedDates = (startDate, endDate) => {
    let dates = {};
    let currentDate = new Date(startDate);
    let end = new Date(endDate);

    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split('T')[0];
      if (currentDate.getTime() === new Date(startDate).getTime()) {
        dates[dateString] = { startingDay: true, color: '#50cebb', textColor: 'white' }; // Pure green
      } else if (currentDate.getTime() === new Date(endDate).getTime()) {
        dates[dateString] = { endingDay: true, color: '#50cebb', textColor: 'white' }; // Pure green
      } else {
        dates[dateString] = { color: '#70d7c7', textColor: 'white' }; // Light green
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const markedDates = getMarkedDates('2024-06-03', '2024-06-15');

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Calendar
          style={styles.calendar}
          current={selectedDate}
          minDate={"2022-01-01"}
          maxDate={"2025-12-31"}
          onDayPress={onDayPress}
          monthFormat={"yyyy MM"}
          hideArrows={false}
          hideExtraDays={true}
          disableMonthChange={false}
          hideDayNames={false}
          showWeekNumbers={false}
          markedDates={markedDates}
          markingType={'period'}
          onPressArrowLeft={(subtractMonth) => {
            subtractMonth();
            setSelectedDate((date) => {
              const newDate = new Date(date);
              newDate.setMonth(newDate.getMonth() - 1);
              return newDate;
            });
          }}
          onPressArrowRight={(addMonth) => {
            addMonth();
            setSelectedDate((date) => {
              const newDate = new Date(date);
              newDate.setMonth(newDate.getMonth() + 1);
              return newDate;
            });
          }}
          disableArrowLeft={false}
          disableArrowRight={false}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
          renderHeader={() => (
            <View style={styles.header}>
              <Text style={styles.dateText}>{selectedYear}</Text>
              <Text style={styles.dateText}>
                {selectedDay} {selectedMonth}
              </Text>
              <Text style={styles.dateText}>{day}</Text>

              <TouchableOpacity onPress={goToToday} style={styles.button}>
                <Text style={styles.goToTodayText}>Go to Today</Text>
              </TouchableOpacity>
            </View>
          )}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#00adf5",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            arrowColor: "orange",
            monthTextColor: "blue",
            indicatorColor: "blue",
            textDayFontFamily: "monospace",
            textMonthFontFamily: "monospace",
            textDayHeaderFontFamily: "monospace",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#32CD32",
    alignItems: "center",
    marginBottom: 150,

  },
  dateContainer: {
    width: "100%",
  },
  header: {
    alignItems: "center",
  },
  dateText: {
    fontSize: 20,
    color: "#000000",
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  goToTodayText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  calendar: {
    width: "100%",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#ffffff",
  },
 
});

export default MyCalendar;
