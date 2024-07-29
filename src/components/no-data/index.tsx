
const index = ({text}:{
    text?:string
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
        <img className=" h-32 w-32 " src='/noData.jpg'/>
        <h1>{text||"No Data"}</h1>
    </div>
  )
}

export default index