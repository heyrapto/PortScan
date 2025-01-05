import { person1, person2, person3, person4, person5, person6, person7 } from "../images";

const People = () => {
  return (
    <div className="flex mt-[70px] py-[25px] relative w-full">
      <div className="flex items-center justify-center bottom-0 left-0 gap-[100px] absolute overflow-hidden right-0 m-auto">
      <img src={person1} className="w-[50px] " />
      <img src={person2} className="w-[50px] " />
      <img src={person3} className="w-[50px] " />
      <img src={person4} className="w-[50px] " />
      <img src={person5} className="w-[50px] " />
      <img src={person6} className="w-[50px] " />
      <img src={person7} className="w-[50px] " />
      </div>
    </div>
  );
};

export default People;
