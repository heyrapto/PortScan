import { long, longer, longest, medium, small } from "../../images"

const FacingUp = () => {
  return (
    <div className="absolute top-0 left-0 right-0 m-auto flex flex-col">
        <img src={small} />
        <img src={medium} />
        <img src={long} />
        <img src={longer} />
        <img src={longest} />
    </div>
  )
}

export default FacingUp