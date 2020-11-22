const cropText = (text, maxLength = 1000) => {
  if (text.length <= maxLength) return text;

  let str = text.slice(0, maxLength);
  const arr = str.split(' ');
  arr.splice(arr.length - 1, 1);
  str = arr.join(' ');
  return `${str}...`;
};

export default cropText;
