import PageHeader from "../components/Common/PageHeader";
import ContactUs from "../components/Contact/ContactUs";
import Hero from "../components/Contact/Hero";

const Contact = () => {
  return (
    <div>
      <PageHeader
        title="Contact"
        breadcrumb={[
          { name: "Home /", link: "/" },
          { name: " Contact", link: null },
        ]}
      />
      <Hero />
      <ContactUs />
    </div>
  );
};
export default Contact;
