export const getLeft = (column) => {
  const { sticky } = column.columnDef;
  if (sticky) {
    return column.columnDef.left;
  }
  return "";
};
