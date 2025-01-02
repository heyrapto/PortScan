import { long, longer, longest, medium, small } from "../../images"

const FacingUp = () => {
  return (
    <div className="absolute top-0 left-0 right-0 m-auto flex flex-col z-0">
        <img src={longest} className="w-[200px]" />
        <img src={longer} className="w-[100px]" />
        <img src={long} className="w-[70px]" />
        <img src={medium} className="w-[50px]" />
        <img src={small} className="w-[30px]" />
    </div>
  )
}

export default FacingUp;