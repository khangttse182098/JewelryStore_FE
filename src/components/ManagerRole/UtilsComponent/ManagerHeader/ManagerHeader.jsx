import MahikaLogoImg from "/assets/managerLogo.png";
import MahikaLogoText from "/assets/text-logo.png";
import Arrow from "/assets/arrow-down-icon.png";

const ManagerHeader = () => {
  return (
    <div className="bg-white flex justify-between p-3">
      <div className="flex">
        <img src={MahikaLogoImg} alt="Mahika Logo" />
        <img src={MahikaLogoText} alt="Mahika Logo" className="h-12 mt-3" />
      </div>
      <div className="flex items-center mr-10">
        <p className="text-lg font-medium mr-5">Pham Hoang Phuc</p>
        <img src={Arrow} alt="Arrow" className="size-5" />
      </div>
    </div>
  );
};

export default ManagerHeader;
