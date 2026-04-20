

export default function ProfileCard(user){
    console.log(user);
    return(
       <div className="border border-rounded m-2 h-60 w-55">
         <img src={user.user.avatar_url} className="h-45 w-60" alt="" />
         <h2 className="text-center pt-2">{user.user.login}</h2>
       </div>
    )
}