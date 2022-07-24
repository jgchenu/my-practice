export async function readFileAsDataUrl(file) {
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.onload = () => {
      const base64Img = reader.result;
      resolve(base64Img);
    };
    reader.readAsDataURL(file);
  });
}
