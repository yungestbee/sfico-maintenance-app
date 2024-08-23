import React from 'react';
import { format } from 'date-fns';

const DateTimeDisplay = ({ timestamp }) => {
  const formattedDate = format(
    new Date(timestamp),
    'eeee, MMMM do yyyy, h:mm:ss a'
  );

  return <div>{formattedDate}</div>;
};

export default DateTimeDisplay;
