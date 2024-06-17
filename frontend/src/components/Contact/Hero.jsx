import ContactBanner from "../../assets/images/contact.png";
import Button from "../ui/Button";
const Hero = () => {
  return (
    <section className="container flex gap-4 items-center pt-4">
      {/* Text */}
      <div className="max-w-[380px] space-y-6">
        <h1>Connect with us</h1>
        <p className="text-gray-600">
          Want to chat? We’d love to hear from you! Get in touch with our
          Customer Success Team to inquire about speaking events, advertising
          rates, or just say hello.
        </p>
        <Button title="Copy Email" secondary />
      </div>
      {/* Image */}
      <div className="flex justify-end w-full">
        <div>
          <img src={ContactBanner} alt="" />
        </div>
      </div>
    </section>
  );
};
export default Hero;
