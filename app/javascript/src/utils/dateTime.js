const dateFromTimeStamp = timeStamp => {
  const dateObject = new Date(timeStamp);
  const year = dateObject.getUTCFullYear();
  const month = dateObject.getUTCMonth() + 1;
  const day = dateObject.getUTCDate();

  return `${year}-${month}-${day}`;
};

export { dateFromTimeStamp };
