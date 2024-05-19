export const validateFiles = (value: FileList) => {
  if (value.length != 1) {
    return 'Files is required';
  }

  const file = value[0];

  if (file.size > 2 * 1024 * 1024) {
    return 'File size should be less than 2MB';
  }

  return true;
};
