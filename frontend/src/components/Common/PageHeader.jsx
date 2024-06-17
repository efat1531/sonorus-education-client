import { Link } from "react-router-dom";
const PageHeader = ({ title, breadcrumb }) => {
  return (
    <div className="bg-gray-100 p-8 text-center">
      <h3>{title}</h3>
      <p className="mt-4">
        {breadcrumb.map((b) =>
          b.link ? (
            <Link key={b.name} to={b.link} className="text-gray-400">
              {b.name}
            </Link>
          ) : (
            <span key={b.name}>{b.name}</span>
          )
        )}
      </p>
    </div>
  );
};
export default PageHeader;
