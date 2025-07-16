const StatusBadge = ({status}) => {
    const base = "px-3 py-1 rounded-full text-sm font-semibold capitalize inline-block"

    const variants = {
        wishlist: "bg-purple-100 text-purple-800 border border-purple-300",
        applied: "bg-yellow-100 text-yellow-800 border border-yellow-300",
        interview: "bg-blue-100 text-blue-800 border border-blue-300",
        offer: "bg-green-100 text-green-800 border border-green-300",
        rejected: "bg-red-100 text-red-800 border border-red-300 line-through"
    }

    return <span className={`${base} ${variants[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>

}
export default StatusBadge