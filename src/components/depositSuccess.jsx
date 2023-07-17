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
        <div>
            <h1>Deposit</h1>
            <h3>Total Balance : {location.balance}</h3>
            <h3>Deposit Success</h3>
            <button onClick={handleOkayButton}>Ok</button>
        </div>
    )
}
export default DepositSuccess