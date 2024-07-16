const filterSearch = ({ router, page, category, sort, q }) => {
  const path = router.pathname;
  const query = { ...router.query };

  if (category) {
    query.category = category;
  } else {
    delete query.category;
  }

  if (page && page !== 1) {
    query.page = page;
  } else {
    delete query.page;
  }

  if (q) {
    query.q = q;
  } else {
    delete query.q;
  }

  if (sort) {
    query.sort = sort;
  } else {
    delete query.sort;
  }

  router.push({
    pathname: path,
    query: query,
  });
};

export default filterSearch;

// const query = router.query;
