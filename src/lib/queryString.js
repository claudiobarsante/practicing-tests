// const keyValueToString = ([key, value]) => {
//   if (typeof value === 'object' && !Array.isArray(value)) {
//     throw new Error('Please check yout params');
//   }
//   return `${key}=${value}`;
// };

// module.exports.queryString = obj => {
//   //   let array = [];
//   //   for (let key in obj) {
//   //     if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
//   //       throw new Error('Please check params');
//   //     }
//   //     array.push(`${key}=${obj[key]}`);
//   //   }

//   //   return array.join('&');

//   return Object.entries(obj).map(keyValueToString).join('&');
// };

const keyValueToString = ([key, value]) => {
  // if (typeof value === 'object' && !Array.isArray(value)) {
  //   throw new Error('Please check yout params');
  // }
  return `${key}=${value}`;
};

export function queryString(obj) {
  return Object.entries(obj).map(keyValueToString).join('&');
}

export function parse(string) {
  return Object.fromEntries(
    string.split('&').map(item => {
      let [key, value] = item.split('=');

      if (value.indexOf(',') > -1) {
        value = value.split(',');
      }

      return [key, value];
    })
  );
}
