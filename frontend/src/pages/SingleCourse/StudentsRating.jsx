import style from "./StudentsRating.module.css";
import { useState, React } from "react";
import CustomSelect from "../../components/uitls/Input/CustomSelect";
import StudentFeedbackCard from "../../components/uitls/Cards/StudentFeedbackCard";
import Divider from "../../components/uitls/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ratings = [
  {
    rating: 4,
    imageURL: "https://picsum.photos/seed/picsum/1200/1000.jpg",
    name: "John Doe",
    date: new Date("2024-06-10"),
    feedback:
      "This course is really helpful. I learned a lot from this course.",
  },
  {
    rating: 3,
    imageURL: "https://picsum.photos/seed/picsum3/1200/1000.jpg",
    name: "Mike Lee",
    date: new Date("2024-06-11"),
    feedback:
      "The course covered the basics well, but I was hoping for more advanced topics.",
  },
  {
    rating: 1,
    imageURL: "https://picsum.photos/seed/picsum4/1200/1000.jpg",
    name: "Alice Johnson",
    date: new Date("2024-06-12"),
    feedback:
      "The course material was outdated and the instructor was difficult to understand. Disappointed.",
  },
  {
    rating: 2,
    imageURL: "https://picsum.photos/seed/picsum5/1200/1000.jpg",
    name: "David Kim",
    date: new Date("2024-06-13"),
    feedback:
      "The course content seemed good, but there were some missing details that made it difficult to follow along at times. I would recommend this with reservations.&apos;",
  },
  {
    rating: 4,
    imageURL: "https://picsum.photos/seed/picsum6/1200/1000.jpg",
    name: "Sarah Garcia",
    date: new Date("2024-06-14"),
    feedback:
      "This course was clear and well-organized. I learned a lot of the core concepts. However, some additional practice exercises or real-world examples would have been helpful for better understanding.",
  },
  {
    rating: 4,
    imageURL: "https://picsum.photos/seed/picsum8/1200/1000.jpg",
    name: "Emily Williams",
    date: new Date("2024-06-15"),
    feedback:
      "The content of this course was excellent and very informative. However, I found the pace of the lectures to be a bit slow. The ability to adjust the playback speed would be a great improvement.",
  },
];

const options = [
  {
    value: "1",
    label: "1 Star Rating",
    hoverColor: "#FF0000", // Red for 1 star
    textColor: "#FFFFFF", // White text
  },
  {
    value: "2",
    label: "2 Star Rating",
    hoverColor: "#FF7F00", // Orange for 2 stars
    textColor: "#FFFFFF", // White text
  },
  {
    value: "3",
    label: "3 Star Rating",
    hoverColor: "#FFFF00", // Yellow for 3 stars
    textColor: "#000000", // Black text
  },
  {
    value: "4",
    label: "4 Star Rating",
    hoverColor: "#00FF00", // Green for 4 stars
    textColor: "#000000", // Black text
  },
  {
    value: "5",
    label: "5 Star Rating",
    hoverColor: "#0000FF", // Blue for 5 stars
    textColor: "#FFFFFF", // White text
  },
];

const StudentsRating = () => {
  const [selectedOption, setSelectedOption] = useState(options[4]);
  const [visibleReviews, setVisibleReviews] = useState(2);
  const filteredAndSortedRatings = ratings
    .filter((rating) => rating.rating <= parseInt(selectedOption.value))
    .sort((a, b) => b.rating - a.rating);

  const length = filteredAndSortedRatings.length;

  const handleLoadMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 2);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setVisibleReviews(2);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.heading}>
        <div className={style.title}>Student&apos;s Feedback</div>
        {ratings.length > 0 && (
          <div className={style.filter}>
            <CustomSelect
              options={options}
              setSelectedOption={handleOptionChange}
              selectedOption={selectedOption}
              customPlaceholder="Filter by Rating"
            />
          </div>
        )}
      </div>
      {filteredAndSortedRatings
        .slice(0, visibleReviews)
        .map((rating, index) => (
          <div key={index} className={style.feedbackContainer}>
            <StudentFeedbackCard feedback={rating} />
            <Divider width="100%" />
          </div>
        ))}
      {visibleReviews < length && (
        <button className={style.loadMoreButton} onClick={handleLoadMore}>
          <div className={style.loadMoreText}>Load More</div>
          <FontAwesomeIcon icon={faSpinner} spin style={{ color: "#FF6636" }} />
        </button>
      )}
    </div>
  );
};

export default StudentsRating;
