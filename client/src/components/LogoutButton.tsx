import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import "./Navbar.css"

export const LogoutButton = () => {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3002/api/auth/logout", {
                method: "POST", 
                credentials: "include", 
        });
    
            if (response.ok) {
                console.log(response)
                setUser(null); 
            } else {
                console.error('Logout failed');
            }
        } catch (err) {
            console.error('Logout error:', err);
        }
    }
    return(
        <div>
            <button className="logout-btn" onClick={handleLogout}>
                Logout    
            </button>

        </div>
    )
}