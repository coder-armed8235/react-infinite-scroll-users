import { useEffect, useState } from "react"
import ProfileCard from "../components/card";

export default function Pagination(){

    const[users,setUser]=useState([]);
    const[page,setPage]= useState(1);
    const[loading,setLoading]=useState(false);

    const fetchDetail = async()=>{
         const response = await fetch(`https://api.github.com/users?per_page=15&page=${page}`);
        const data= await response.json();
        setUser((prev) => [...prev, ...data]);
        setLoading(false);
    }

    useEffect(()=>{
        fetchDetail();
    },[page])

   const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return(
    <div>
      <h1 className="text-4xl font-bold text-center m-3">GitHub profile</h1>
    <div className="flex gap-1 h-full flex-wrap justify-center">
      
        {
          users.length === 0 ?
          <p>Loading...</p>:
          users.map((user,index)=><ProfileCard key={index} user={user}/>)
        }
    </div>
    </div>
  )
}