const groupDataByColumnId = (data) => {
  const groupedData = {};
  
  for (const card of data) {
    const { columnId } = card;

    if (!groupedData[columnId]) {
      groupedData[columnId] = [];
    }

    groupedData[columnId].push(card);
  }

  return groupedData;
}

export default groupDataByColumnId;