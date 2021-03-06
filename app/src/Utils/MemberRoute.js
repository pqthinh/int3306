import React , {useState } from 'react'
import { Route, useHistory } from 'react-router-dom';
import { getToken, getUser } from './Common'
import ReactJsAlert from "reactjs-alert"

// handle the private routes
function MemberRoute({ component: Component, ...rest }) {
    const user = getUser()
    const token = getToken()
    let history = useHistory()
    console.log(user)
    const [status, setStatus] = useState(true)
    let redirect = true

    if(!token || !user || user.role !== "member") {
        redirect = false
    }
    return (
        <Route
            {...rest}
            render={(props) => redirect?  <Component {...props} /> : 
            <ReactJsAlert
                type="error"   // success, warning, error, info
                title="Không thể chuyển hướng tới trang bạn muốn"   // title you want to display
                status={status}   // true or false
                button="Trở lại"
                color="#00B16A"
                quote="Bạn đang đăng nhập với tài khoản Chủ nhà trọ. Vì thế bạn ko được xem nội udng này"
                Close={() => {
                    setStatus(false)
                    history.goBack()
                }} 
            /> }
        />
    )
}

export default MemberRoute;