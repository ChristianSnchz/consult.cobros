const downloadFiles = (file: File): void => {
  const csvURL = window.URL.createObjectURL(file);
  const link = document.createElement('a');
  link.download = file.name;
  link.href = csvURL;
  link.click();

  // Clean up and remove the link
  if (link.parentNode) link.parentNode.removeChild(link);
};
export default downloadFiles;
