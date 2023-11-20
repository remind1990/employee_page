export const calculateSum = (data) => {
  // Extract values from the object and filter out non-numeric values
  const numericValues = Object.values(data).filter(
    (value) => typeof value === 'number'
  );
  // Calculate the sum
  const sum = numericValues.reduce((acc, value) => acc + value, 0);

  return sum;
};

export function getMonthNameFromId(id) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[id - 1];
}

export const calculateTotalSumForEachCategory = (statistics) => {
  // Initialize an array to store objects with category name and total sum
  const totalSumArray = [];

  // Iterate over each day in the statistics array
  statistics.forEach((day) => {
    // Check if the day has clients
    if (day.clients && day.clients[0]) {
      // Iterate over each field in the clients object
      for (const field in day.clients[0]) {
        // Check if the field is a number
        if (typeof day.clients[0][field] === 'number') {
          // Find the corresponding object in the totalSumArray or create a new one
          const categoryObject = totalSumArray.find(
            (obj) => obj.name === field
          );
          if (categoryObject) {
            // If the object already exists, update the value
            categoryObject.value += day.clients[0][field];
          } else {
            // If the object doesn't exist, create a new one
            totalSumArray.push({
              name: field,
              value: day.clients[0][field],
            });
          }
        }
      }
    }
  });

  return totalSumArray;
};
