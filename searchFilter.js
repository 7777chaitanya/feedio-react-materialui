let filteredArray = [];
  if (searchTerm !== "") {
    filteredArray = searchKeywords.filter(
      (item) =>
        item.toLowerCase().indexOf(searchTerm.toLowerCase().trim()) !== -1
    );
  }
  console.log("filtered Array =>", filteredArray);
  if (filteredArray.length === 0 && searchTerm !== "") {
    filteredArray = ["No results found!"];
  }
  if (filteredArray.length === 0 && searchTerm === "") {
    filteredArray = ["Enter a word to Search!"];
  }