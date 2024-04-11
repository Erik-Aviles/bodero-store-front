const filterSearch = ({ router, page, category, sort, q }) => {
  const path = router.pathname;
  const query = router.query;

  if (category) {
    query.category = category;
  }
  if (page) query.page = page;
  if (q) query.q = q;
  if (sort) query.sort = sort;

  router.push({
    pathname: path,
    query: query,
  });
};

export default filterSearch;
