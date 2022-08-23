export const makeId = (Length) => {
  let result = '';
  const chars = '012345abcdefghijklmnopqrstuvwxyz';
  const charLength = chars.length;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < Length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }

  return result;
};

makeId(5);
