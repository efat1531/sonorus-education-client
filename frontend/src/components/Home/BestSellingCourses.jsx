const BestSellingCourses = () => {
  return (
    <section id="best-selling-course" className="bg-gray-200 py-16">
      <div className="container">
        {/* <!-- Section Header Start --> */}
        <div className="section-header">
          <span className="section-header-before"></span>
          <h2>Best Selling Courses</h2>
          <span className="section-header-after"></span>
        </div>
        {/* <!-- Section Header End --> */}

        {/* <!-- Course Grid Start --> */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
          {/* <!-- Course Item Start --> */}
          <div className="bg-white border">
            {/* <!-- Course Image Box --> */}
            <div className="course-img-box">
              <img src="./assets/img/course-img-1.png" alt="" />
            </div>
            {/* <!-- Course Details --> */}
            <div className="grid">
              <div className="flex justify-between px-4 py-2">
                <span className="bg-orange-300 text-orange-700 uppercase px-2 py-1 font-semibold">
                  DESIGN
                </span>
                <p>
                  <span className="text-orange-500 font-bold text-xl">500</span>
                  Taka
                </p>
              </div>
              <p className="p-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
                saepe!
              </p>
              <div className="flex justify-between px-4 py-2 border-t">
                {/* <!-- Course Rating --> */}
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-star text-yellow-500"></i>
                  <span>5.0</span>
                </div>
                {/* <!-- Course Statistics --> */}
                <div className="flex gap-1">
                  <span className="font-semibold">216k</span>
                  <span className="text-gray-500">students</span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Course Item End --> */}
        </div>
        {/* <!-- Course Grid End --> */}
      </div>
    </section>
  );
};

export default BestSellingCourses;
