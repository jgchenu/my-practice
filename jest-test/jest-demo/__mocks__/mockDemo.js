export function getData() {
  return new Promise((resolve, reject) => {
    resolve({
      data: 123,
    });
  });
}
