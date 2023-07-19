import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accountNumber, authentication } from "../redux/actionCreator";
import cardLogo from "../assets/images/insert_card.jpg"
import '../index.css'
const Authentication = (props) => {

    const { history } = props
    const cardDetails = useSelector(state => state.cards)
    const accountDetails = useSelector(state => state.accountNumber)
    const dispatch = useDispatch()
    const [inputCardNumber, setCardNumber] = useState("")
    const [cardNumberValidation, setCardNumberValidation] = useState("")

    useEffect(() => {
        if (accountDetails) {
            history.push("/home")
        }
    }, [])

    const handleCardValidation = () => {
        if (inputCardNumber === "") {
            setCardNumberValidation("Please enter the Account Number")
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
        <div className="bg-[#062C30] h-[100vh] flex flex-col items-center border-2 border-white ">
            <div className="text-3xl text-[#E2D784] mt-10 font-medium">Welcome Page</div>
            <div className="text-[#F5F5F5] text-xl mt-5 font-medium">Insert your Card</div>
            <input value={inputCardNumber} className="mt-5 font-medium text-[#F5F5F5] bg-[#05595B] p-3 w-[20%] max-md:w-[50%] border-2 border-white rounded text-center" type="text" onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))} maxLength={"14"} />
            <div className="mt-5 text-[#E6DDC4] font-medium">{cardNumberValidation}</div>
            <img className="mt-5" src={cardLogo} width={"300px"} height={"250px"}/>
            <div className="mt-5">
                <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4 rounded" onClick={handleCardValidation}>
                    Continue
                </button>
            </div>
        </div>
    )
}
export default Authentication