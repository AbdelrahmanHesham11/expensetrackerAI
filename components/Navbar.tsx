import {checkUser } from "../lib/checkUser";
function Navbar(){

    const user = checkUser();
    return(
        <div>
            <h1>Navbar gekki</h1>
        </div>
    )
}
export default Navbar