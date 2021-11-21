import React from 'react'

const Alert = (props) => {
    const capitalize = (type)=>{
        if(type==='success'){
            return 'Success';
        }
        return 'Error';
    }
    return (
        <div style={{height: '50px'}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong>, {props.alert.message}
            </div>}
        </div>
    )
}

export default Alert
