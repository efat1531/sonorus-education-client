import NavBarDesktop from "../../components/NavBar/NavBarDesktop";
import HeroImage1 from "./HeroImage1";
import HeroImage2 from "./HeroImage2";
import HeroSection from "./HeroSection";
import TopInstructor from "./TopInstructor";
import HomePageCourseTemplate from "../../components/CourseStructure/CourseTemplate/HomePageCourseTemplate";

const coursesJSON = [
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2eef76bbee32903376390e9d2627617cdbc232e3296659fb0d8a37a43aeb2892?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    category: "Design",
    price: "$57",
    title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
    ratingImgSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1c674d575929137eae0fb7811a2d75702e98c2aaf32de2a96ba070a8b7a09270?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    rating: "5.0",
    students: "265700",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/dc318593efabab625a07a71e31bc795b06c1c879f9b787b8a8b49689e01c3079?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    category: "Developments",
    price: "$57",
    title: "The Complete 2021 Web Development Bootcamp",
    ratingImgSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1c674d575929137eae0fb7811a2d75702e98c2aaf32de2a96ba070a8b7a09270?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    rating: "5.0",
    students: "265700",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb6dca3a9204087de5d8a79fe06ef37e135c5ea4367189c54d9bba247cb500e?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    category: "Business",
    price: "$57",
    title: "Learn Python Programming Masterclass",
    ratingImgSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1c674d575929137eae0fb7811a2d75702e98c2aaf32de2a96ba070a8b7a09270?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    rating: "5.0",
    students: "25200",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a11bf67adca6bacd20ad0f3b8b2d5c04606cec1fdbfd381f4828ac067c08f7be?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    category: "Marketing",
    price: "$57",
    title: "The Complete Digital Marketing Course - 12 Courses in 1",
    ratingImgSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1c674d575929137eae0fb7811a2d75702e98c2aaf32de2a96ba070a8b7a09270?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    rating: "5.0",
    students: "30",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/f9b982b89f00bc6e288840a5ae72      </HomePageCourseTemplate>4bbb27bb18a7efaba30d45de721ca5d36fd6?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    category: "IT & Software",
    price: "$57",
    title: "Reiki Level I, II and Master/Teacher Program",
    ratingImgSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1c674d575929137eae0fb7811a2d75702e98c2aaf32de2a96ba070a8b7a09270?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    rating: "5.0",
    students: "50",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/56d968543f3f608ecbfe714455b09577334711384c28960e9f4e884ce480d83d?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    category: "Music",
    price: "$57",
    title: "The Complete Foundation Stock Trading Course",
    ratingImgSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1c674d575929137eae0fb7811a2d75702e98c2aaf32de2a96ba070a8b7a09270?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    rating: "5.0",
    students: "3500",
  },
  {
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/29cc0f4e6db3b41c7348f1b5dbe8694ff78744fc5b14f397383fcf1969fefbb0?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    category: "Marketing",
    price: "$57",
    title: "Beginner to Pro in Excel: Financial Modeling and Valuati...",
    ratingImgSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1c674d575929137eae0fb7811a2d75702e98c2aaf32de2a96ba070a8b7a09270?apiKey=23afa202bc2b43d8bffafdcae0891485&",
    rating: "5.0",
    students: "3500",
  },
];

const HomePage = () => {
  return (
    <div>
      <NavBarDesktop />
      <HeroSection />
      <HeroImage1 />
      <HeroImage2 />
      <HomePageCourseTemplate title={`Top Courses`} courses={coursesJSON} />
      <HomePageCourseTemplate title={`Recent Courses`} courses={coursesJSON} />
      <TopInstructor />
    </div>
  );
};

export default HomePage;
