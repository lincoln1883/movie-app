import Jumbotron from "./Jumbotron";
//import PaginateMovie from "../features/movies/PaginateMovie";
//import PaginateShow from "../features/shows/PaginateShows";

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <Jumbotron />
      {/* <div className="flex flex-col gap-1 w-full h-full object-cover m-3">
        <PaginateMovie />
        <PaginateShow />
      </div> */}
    </div>
  );
};

export default Home;
