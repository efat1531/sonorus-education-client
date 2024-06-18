import style from "./MainCourses.module.css";
import CustomSelect from "../../components/uitls/Input/CustomSelect";
import CourseSmall from "../../components/uitls/Cards/CourseSmall";
import { useEffect, useState } from "react";

const courses = [
  {
    title: "Beginner to Pro in Excel: Financial Modeling and Valuation",
    imageSrc: "https://picsum.photos/seed/picsum/1200/1000.jpg",
    rating: 4.5,
    students: 100,
    price: 100,
    discount: 20,
    category: {
      name: "Phonics",
      color: "#342F98",
      backgroundColor: "#EBEBFF",
    },
    createAt: new Date("24-06-09"),
  },
  {
    title: "Beginner to Pro in Excel: Financial Modeling and Valuation",
    imageSrc: "https://picsum.photos/seed/picsum2/1200/1000.jpg",
    rating: 4.8,
    students: 150,
    price: 120,
    discount: 15,
    category: {
      name: "Math",
      color: "#F2994A",
      backgroundColor: "#FFF2E8",
    },
    createAt: new Date("24-06-10"),
  },
  {
    title: "Beginner to Pro in Excel: Financial Modeling and Valuation",
    imageSrc: "https://picsum.photos/seed/picsum3/1200/1000.jpg",
    rating: 4.2,
    students: 75,
    price: 80,
    discount: 10,
    category: {
      name: "Writing",
      color: "#4CAF50",
      backgroundColor: "#E8F0F7",
    },
    createAt: new Date("24-06-11"),
  },

  {
    title: "Beginner to Pro in Excel: Financial Modeling and Valuation",
    imageSrc: "https://picsum.photos/seed/picsum/1200/1000.jpg",
    rating: 4.5,
    students: 100,
    price: 100,
    discount: 0, // Original discount
    category: {
      name: "Phonics",
      color: "#342F98",
      backgroundColor: "#EBEBFF",
    },
    createAt: new Date("24-06-12"),
  },
  {
    title: "Beginner to Pro in Excel: Financial Modeling and Valuation",
    imageSrc: "https://picsum.photos/seed/picsum/1200/1000.jpg",
    rating: 4.5,
    students: 100,
    price: 0,
    discount: 0, // Increased discount
    category: {
      name: "Phonics",
      color: "#342F98",
      backgroundColor: "#EBEBFF",
    },
    createAt: new Date("24-06-13"),
  },
];

const options = [
  {
    value: "trending",
    label: "Trending",
    hoverColor: "#F2E8FF",
    textColor: "#334155",
  },
  {
    value: "newest",
    label: "Newest",
    hoverColor: "#E8F0F7",
    textColor: "#334155",
  },
  {
    value: "priceLow",
    label: "Price: Low to High",
    hoverColor: "#E8F0F7",
    textColor: "#334155",
  },
  {
    value: "priceHigh",
    label: "Price: High to Low",
    hoverColor: "#E8F0F7",
    textColor: "#334155",
  },
  {
    value: "rating",
    label: "Rating",
    hoverColor: "#E8F0F7",
    textColor: "#334155",
  },
  {
    value: "students",
    label: "Number of Students",
    hoverColor: "#E8F0F7",
    textColor: "#334155",
  },
];

const calculatedPrice = (price, discount) => {
  return price - discount;
};

const MainCourses = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const [newCourses, setNewCourses] = useState(courses);
  useEffect(() => {
    setNewCourses((prevCourses) => {
      return [...prevCourses].sort((a, b) => {
        if (selectedOption) {
          switch (selectedOption.value) {
            case "trending":
              return b.rating - a.rating;
            case "newest":
              return b.createAt - a.createAt;
            case "priceHigh":
              return (
                calculatedPrice(b.price, b.discount) -
                calculatedPrice(a.price, a.discount)
              );
            case "priceLow":
              return (
                calculatedPrice(a.price, a.discount) -
                calculatedPrice(b.price, b.discount)
              );
            case "rating":
              return b.rating - a.rating;
            case "students":
              return b.students - a.students;
            default:
              return 0;
          }
        }
        return 0;
      });
    });
  }, [selectedOption]);

  return (
    <section className={style.mainSection}>
      <div className={style.topAction}>
        <div className={style.searchBar}>
          <div className={style.icon}>
            <img src="src/assets/svg/MagnifyGlass.svg" alt="search" />
          </div>
          <div>
            <input
              className={style.searchInput}
              type="text"
              placeholder="Search for courses"
            />
          </div>
        </div>
        <div>
          <div className={style.filterSection}>
            <div className={style.sortText}>Sort By :</div>
            <CustomSelect
              customPlaceholder={"Select an option"}
              options={options}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
            />
          </div>
        </div>
      </div>
      <div className={style.courseList}>
        {newCourses.map((course, index) => (
          <CourseSmall key={index} course={course} />
        ))}
        {/* <CourseSmall course={courses[0]} /> */}
      </div>
    </section>
  );
};

export default MainCourses;
