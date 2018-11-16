import moment from 'moment';

export * from './styled';
export * from './Auth';

export const format = (date: string, format = 'LLLL'): string => {
  const obj = moment(date);
  if (obj.isValid()) {
    return obj.format(format);
  }
  return date;
};
