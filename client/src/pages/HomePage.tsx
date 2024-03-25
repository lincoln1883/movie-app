import ImageCarousel from "../components/ImageCarousel";
import Popular from "../components/Popular";
import Trending from "../components/Trending";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full">
      <div>
       <ImageCarousel />
      </div>
    <Popular />
    <Trending />
    </div>
  );
};

export default HomePage;