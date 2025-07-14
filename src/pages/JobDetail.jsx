import { useParams } from "react-router-dom"
const JobDetail = ()=>{
    const {id} = useParams()
     return <h2 className="text-2xl font-bold text-amber-950">Job Detail - ID: {id}</h2>
}
export default JobDetail