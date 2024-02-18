import PaginateMovie from "../features/movies/PaginateMovie";
import PaginateShow from "../features/shows/PaginateShows";

const Home = () => {
	return (
    <div className="w-full h-full overflow-hidden">
      <div className="flex flex-col gap-1 object-cover m-3">
        <PaginateMovie />
        <PaginateShow />
      </div>
    </div>
  );
};

export default Home;
