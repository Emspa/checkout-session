import { useEffect, useState } from "react"

export const Confirmation = () => {
    const [verified, setVerified] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!verified) {
            console.log("nu körs jag")
            const verifySession = async () => {
                console.log("och jag hoppar in i funktionen")
                let sessionId;
                const dataFromLs = localStorage.getItem("sessionId")

                if (dataFromLs) {
                    sessionId = JSON.parse(dataFromLs)
                }

                const response = await fetch("http://localhost:3002/api/stripe/verify-session", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',
                    body: JSON.stringify({ sessionId })
                })

                const data = await response.json()

                if (data.verified) {
                    localStorage.removeItem("sessionId")
                    setVerified(data.verified)
                    
                    setIsLoading(false)
                }

            }

            verifySession()
        }
    }, [verified])


    return (
        <div>
            <h3>{verified && !isLoading ? "TACK FÖR DITT KÖP ✅" : "LOADING..."}</h3>
        </div>
    )
}

export default Confirmation