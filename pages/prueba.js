import { fetcher } from "@/utils/fetcher";
import { useState } from "react";
import useSWR from "swr";

const ProductsList = () => {
  const [page, setPage] = useState(1);

  const { data, error } = useSWR(`/api/products?page=${page}`, fetcher, {
    dedupingInterval: 2000,
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (error) return <div>Error al cargar los datos</div>;
  if (!data) return <div>Cargando datos...</div>;

  const hasNextPage = data.length === 20;
  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {data.map((product) => (
          <li key={product._id}>
            <p>{product?.title}</p>
          </li>
        ))}
      </ul>
      {/* Botones de paginación */}
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        Anterior
      </button>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNextPage}
      >
        Siguiente
      </button>
    </div>
  );
};

export default ProductsList;
