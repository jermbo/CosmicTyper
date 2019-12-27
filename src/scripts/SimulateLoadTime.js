export default function SimulateLoadTime(data, waitTime = 250) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, waitTime);
  });
}

// function simulateDataLoad(data) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(data);
//     }, 5000);
//   });
// }
