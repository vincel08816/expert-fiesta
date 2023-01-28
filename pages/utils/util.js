/**
 * @function formatDate
 * @param {string} dateString - A string representing the date to be formatted
 * @returns {string} A string representing the date in the format 'Today at 11:24 PM', 'Yesterday at 9:32 PM', '01/13/2023 7:31 PM', '09/10/2018 9:32 PM'
 * @description The function takes a date string as an input and returns a string representing the date in the format 'Today at 11:24 PM', 'Yesterday at 9:32 PM', '01/13/2023 7:31 PM', '09/10/2018 9:32 PM'
 */

export const formatDate = (dateString) => {
  if (!dateString || dateString?.length === 0) return;
  const date = new Date(dateString);
  const today = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  if (date.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
    return `Today at ${hour12}:${minutes.toString().padStart(2, 0)} ${ampm}`;
  } else if (
    date.setHours(0, 0, 0, 0) ==
    new Date(today.getTime() - 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0)
  ) {
    return `Yesterday at ${hour12}:${minutes
      .toString()
      .padStart(2, 0)} ${ampm}`;
  } else {
    return `${month}/${day}/${year} ${hour12}:${minutes
      .toString()
      .padStart(2, 0)} ${ampm}`;
  }
};
