import moment from 'moment';

export const DATE_STRING_FORMAT = "MM/DD/YYYY";
export const TIME_STRING_FORMAT = "hh:mm a";
export const DATE_TIME_STRING_FORMAT = "MM/DD/YYYY HH:mm";

export const dateToString = (date, format) => {
    return moment(date.seconds * 1000).format(format);
}