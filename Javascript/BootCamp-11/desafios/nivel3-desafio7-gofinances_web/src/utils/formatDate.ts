const formatDate = (date: Date): string => {
  const newDate = new Date(date);
  // const newDate = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
  return Intl.DateTimeFormat('br-BR').format(newDate);
};

export default formatDate;
