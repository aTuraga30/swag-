/*
This is a simple helper function to display all of the information from the database.
*/

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
  }
  
  function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
  }
  
  module.exports = {
    getOffset,
    emptyOrRows
  }