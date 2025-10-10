import { Link } from "react-router-dom"
import { RightArrowIcon } from "../Svgs"


const ViewAllButton = ({ to }) => {
    return (
        <Link to={to ? to : ''} className='flex items-center gap-1.5 max-w-max cursor-pointer'>
            <div className="text-[#F9FAFB] text-xs font-medium">
                View All
            </div>
            <RightArrowIcon />
        </Link>
    )
}

export default ViewAllButton
