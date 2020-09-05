export default (callback) => {
  setTimeout(() => {
    callback();
  }, 3000);
};
