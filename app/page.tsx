import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server"

async function  Home(){
  const user = await currentUser();
  if(!user){
    return<Guest/>
  }
  return(

    <h1>Home</h1>

  );
}
export default Home