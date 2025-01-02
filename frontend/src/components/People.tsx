import { person1, person2, person3, person4, person5, person6, person7 } from "../images";

const People = () => {
  return (
    <div className="flex flex-wrap md:gap-[100px] gap-[50px] mt-[70px] overflow-hidden justify-center">
      <img src={person1} className="w-[50px] md:w-[80px]" />
      <img src={person2} className="w-[50px] md:w-[80px]" />
      <img src={person3} className="w-[50px] md:w-[80px]" />
      <img src={person4} className="w-[50px] md:w-[80px]" />
      <img src={person5} className="w-[50px] md:w-[80px]" />
      <img src={person6} className="w-[50px] md:w-[80px]" />
      <img src={person7} className="w-[50px] md:w-[80px]" />
    </div>
  );
};

export default People;
