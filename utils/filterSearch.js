import Categories from "@/components/Categories";

const filterSearch = ({ router, page, category, sort, search }) => {
  const query = router.query;

  if (category) query.category = category;
  if (page) query.page = page;
  if (search) query.search = search;
  if (sort) query.sort = sort;

  router.push({
    pathname: "/categories",
    query: query,
  });
};

export default filterSearch;
