import { person1, person2, person3, person4, person5, person6, person7 } from "../images"

const People = () => {
  return (
    <div className="flex gap-[100px] mt-[70px]">
    <img src={person1} className="w-[50px]" />
    <img src={person2} className="w-[50px]"/>
    <img src={person3} className="w-[50px]" />
    <img src={person4} className="w-[50px]" />
    <img src={person5} className="w-[50px]" />
    <img src={person6} className="w-[50px]" />
    <img src={person7} className="w-[50px]" />
    </div>
  )
}

export default People