export const formatDate = (date: string) => {
  let dateWhithoutSpace = date.split(" ")[0]

  let day = dateWhithoutSpace.split("/")[0];
  let month = dateWhithoutSpace.split("/")[1];
  let year = dateWhithoutSpace.split("/")[2];

  let dateFormatted = year + "-" + month + "-" + day

  return dateFormatted;
}

export function applyMask(mask: string = '', value: string) {
  if (!mask) {
    return value;
  }
  if (!value) {
    return '';
  }
  value = value.replace(/[^\d]/g, '');
  var max =
    value.length < mask.length - mask.replace('_', '').length
      ? value.length
      : mask.length;
  var result = '';
  let valueIndex = 0;
  for (var i = 0; i < max; i++) {
    if (mask.charAt(i) !== '_') {
      result += mask.charAt(i);
    } else {
      result += value.charAt(valueIndex++);
    }
    if (valueIndex === value.length) {
      return result;
    }
  }
  return result;
}