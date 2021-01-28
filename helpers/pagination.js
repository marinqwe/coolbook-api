module.exports = function (page) {
  const postsPerPage = 5; //limit
  const itemsToSkip = postsPerPage * (page - 1); //offset
  return {
    postsPerPage,
    itemsToSkip,
  };
};
