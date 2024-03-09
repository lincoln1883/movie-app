import Popular from "../components/Popular";
import Trending from "../components/Trending";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
    <Popular />
    <Trending />
    </div>
  );
};

export default HomePage;