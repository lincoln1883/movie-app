import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchShows } from "./showSlice";
import { Spinner, Pagination } from "flowbite-react";
import Show from "./Show";
import ShowSearch from "./ShowSearch";

const ShowList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const shows = useAppSelector((state) => state.shows.shows);
  const loading = useAppSelector((state) => state.shows.status === "loading");

  useEffect(() => {
    const page = currentPage.toString();
    dispatch(fetchShows(page));
  }, [dispatch, currentPage]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ShowSearch />
      <h1 className="text-center text-3xl font-semibold mb-2 capitalize">
        Popular shows
      </h1>
      {loading ? (
        <Spinner aria-label="Default status example" />
      ) : (
        <div className="flex justify-center items-center">
          <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-center sm:gap-2 px-3 pr-3 mb-8">
            {shows.map((show) => (
              <Show key={show.id} show={show} />
            ))}
          </ul>
        </div>
      )}
      <div className="flex items-center justify-center mb-3">
        <Pagination
          layout="table"
          currentPage={currentPage}
          totalPages={100}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
};

export default ShowList;
