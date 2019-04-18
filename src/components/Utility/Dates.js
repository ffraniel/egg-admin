import { format, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

export const dateDifference = (date) => {
  let difference = differenceInDays(date, new Date());
  if (difference < -1) {
    let differenceString = Math.abs(difference).toString();
    return `Made ${differenceString} days ago`;
  } else {
    let differenceHours = Math.abs(differenceInHours(date, new Date())).toString();
    if (differenceHours < -1) {
      return `Made ${differenceHours} hours ago`;
    } else {
      let differenceSeconds = Math.abs(differenceInMinutes(date, new Date())).toString();
      return `Made ${differenceSeconds} minutes ago`;
    }
  }
};

export const formatDate = (date) => {
  return format(date, 'DD/MM/YYYY');
};
