const blobToFile = (blob: Blob, fileName: string): File => {
  const file: any = blob;
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  file.lastModifiedDate = new Date();
  file.name = fileName;
  // Cast to a File() type
  return file;
};

export default blobToFile;
