import { useRouteError } from "react-router-dom"

const SinglePageError = () => {
    const error = useRouteError()
  return (
    <h2>Something went wrong...</h2>
  )
}
export default SinglePageError