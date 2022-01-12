import React from 'react'
import { useSelector } from 'react-redux';

const Alert = () => {
    const alert = useSelector(state => state.alert)
    const capitalize = (type)=>{
        if(type==='success'){
            return 'Success';
        }
        return 'Error';
    }
    return (
        <div style={{height: '50px'}}>
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(alert.type)}</strong>, {alert.message}
            </div>}
        </div>
    )
}

export default Alert
