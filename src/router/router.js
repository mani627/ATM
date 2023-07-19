import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from '../components/home'
import Deposit from '../components/deposit'
import Withdraw from '../components/withdraw'
import WithdrawStatus from '../components/withdrawStatus'
import DepositSuccess from '../components/depositSuccess'
import Authentication from '../components/authentication'
import DepositAuthentication from '../components/depositAuthentication'
import CheckBalance from '../components/checkBalance'

const RouterShell = () => {

    const authentication = useSelector(state => state.auth)
   
    return (
        <Router>
            {!authentication ? (
                <Switch>
                    <Route exact path='/' component={Authentication} />
                    <Route exact path='*' render={() => <Redirect to='/' />} />
                </Switch>
            ) :
                (
                    <Switch>
                        <Route exact path='/' component={Authentication} />
                        <Route path='/home' component={Home} />
                        <Route path='/deposit' component={Deposit} />
                        <Route path='/depositAuthentication' component={DepositAuthentication} />
                        <Route path='/depositSuccess' component={DepositSuccess} />
                        <Route path='/withdraw' component={Withdraw} />
                        <Route path='/withdrawStatus' component={WithdrawStatus} />
                        <Route path='/checkBalance' component={CheckBalance} />
                    </Switch>
                )
            }
        </Router>
    )
}
export default RouterShell