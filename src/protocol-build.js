function scaleWells(wellCount) {
  const colToRowsRatio = 1.5;
  let rows;
  let columns;
  for (let rowsIter=1;rowsIter<wellCount;rowsIter++){
    cols = wellCount/rowsIter;
    if ((cols/rowsIter) <= colToRowsRatio) {
        rows = rowsIter;
        break;
    }
  }
  return {"rows": rows, "columns": columns};
}