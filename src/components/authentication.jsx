import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accountNumber, authentication } from "../redux/actionCreator";
// import '../App.css';
import '../index.css'



const Authentication = (props) => {

    const { history } = props
    const cardDetails = useSelector(state => state.cards)
    const accountDetails = useSelector(state => state.accountNumber)
    console.log("accountDetails", accountDetails)
    const dispatch = useDispatch()
    const [inputCardNumber, setCardNumber] = useState("")
    const [cardNumberValidation, setCardNumberValidation] = useState("")

    useEffect(() => {
        if (accountDetails) {
            history.push("/home")
        }
    }, [])

    const handleCardValidation = () => {
        const numberRegex = /^\d+$/
        if (inputCardNumber === "") {
            setCardNumberValidation("Please enter the Account Number")
        }
        else if (!numberRegex.test(inputCardNumber)) {
            setCardNumberValidation("Please enter numbers only")
        }
        else {
            setCardNumberValidation("")
            checkAccountNumber()
        }
    }

    const checkAccountNumber = () => {
        const filteredCardDetails = cardDetails.find(card => (inputCardNumber.includes(card.card_no)))
        if (filteredCardDetails && filteredCardDetails.isValid === true) {
            dispatch(authentication(true))
            dispatch(accountNumber(filteredCardDetails.card_no))
            history.push("/home")
        }
        else if (filteredCardDetails && filteredCardDetails.isValid === false) {
            setCardNumberValidation("Account Expired")
            history.push("/")
        }
        else {
            setCardNumberValidation("Invalid account Number")
            history.push("/")
        }
    }

    return (
        <div className=" bg-teal-400 h-[100vh] flex flex-col items-center">
            <h1 className="text-3xl">Welcome Page</h1>
           
            <div>
                <h3>Insert your Card</h3>
            </div>
            <div>
                <input type="text" onChange={(e) => setCardNumber(e.target.value)} maxLength={"14"} />
            </div>
            <div>{cardNumberValidation}</div>
            <div>
                <button onClick={handleCardValidation}>Continue</button>
            </div>
    
        </div>
    )
}
export default Authentication