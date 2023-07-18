import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { accountNumber, authentication, deposit } from "../redux/actionCreator"

const DepositSuccess = (props) => {

    const { history } = props
    const { location } = props
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(deposit(0))
    }, [])

    const handleOkayButton = () => {
        dispatch(authentication(false))
        dispatch(accountNumber(""))
        history.push("/")
    }

    return (
        <div className="bg-[#062C30] h-[100vh] flex flex-col border-2  border-white items-center">
            <div className="text-3xl text-[#E2D784] mt-10 font-medium">Deposit</div>
            <div className="text-[#F5F5F5] text-lg mt-5 font-medium">Total Balance : {location.balance}</div>
            <div className="text-[#F5F5F5] text-xl mt-5 font-medium">Deposit Success</div>
            <div className="mt-5">
                <button class="bg-[#E1EEDD] hover:bg-[#BAD1C2] text-gray-800 font-bold py-2 px-4 rounded" onClick={handleOkayButton}>
                    Ok
                </button>
            </div>
        </div>
    )
}
export default DepositSuccess