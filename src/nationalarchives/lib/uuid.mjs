/* eslint-disable no-magic-numbers */
/* eslint-disable no-bitwise */
const uuidv4 = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/gu, (char) =>
    (
      char ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (char / 4)))
    ).toString(16),
  );

export default uuidv4;
