import { long, longer, longest, medium, small } from "../../images"

const FacingUp = () => {
  return (
    <div className="absolute top-0 left-0 right-0 m-auto flex flex-col z-0">
        <img src={small} className="w-[30px]" />
        <img src={medium} className="w-[30px]" />
        <img src={long} className="w-[30px]" />
        <img src={longer} className="w-[30px]" />
        <img src={longest} className="w-[30px]" />
    </div>
  )
}

export default FacingUp