import { useEffect } from 'react'
import axios from 'axios'
export const App = () => {
  useEffect(() => {
    axios.get('http://jsonplaceholder.typicode.com/posts/1').then((res) => {
      console.log(res.data)
    })
  }, [])
  return <div>app</div>
}
