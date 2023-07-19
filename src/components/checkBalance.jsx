import { useDispatch, useSelector } from "react-redux"
import { accountNumber, authentication } from "../redux/actionCreator"

const CheckBalance = (props) => {
    const { history } = props;
    //useDispatch
    const dispatch=useDispatch()
    const accNo = useSelector(state => state.accountNumber)
    const cardDetails = useSelector(state => state.cards)
    const accountHolderName = cardDetails.find(accDetails => accNo.toString().includes(accDetails.card_no))
    
    const handleOkayButton = () => {
        dispatch(authentication(false))
        dispatch(accountNumber(""))
        history.push("/")
    }

    return (
        <div>
            <div className="bg-[#062C30] h-[100vh] flex flex-col border-2  border-white items-center">
                <div className="text-3xl text-[#E2D784] mt-10 font-medium">Balance Enquiry</div>
                <div className="text-[#F5F5F5] text-lg mt-5 font-medium">Available Balance : {accountHolderName.availableBalance}</div>
                <div className="mt-5">
                    <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4 rounded" onClick={handleOkayButton}>
                        Ok
                    </button>
                </div>
            </div>
        </div>
    )
}
export default CheckBalance