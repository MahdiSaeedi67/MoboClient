import React from 'react'
import {connect} from 'react-redux'

function incerementCounter(num){
    return {
        type:"INCEREMENT",
        num:num
    }
}

function decerementCounter(num){
    return {
        type:"DECEREMENT",
        num:num
    }
}

function mapStateToProps(state){
    return {
        count: state.count
    }
}

const mapDispatchToProps={
    incerementCounter,
    decerementCounter
}

function Counter(props){
    function incerementHandler(){
        props.incerementCounter(1);
    }
    
    function decerementHandler(){
        props.decerementCounter(1);
    }
    
    return (
        <div>
            <h1>
                {props.count}
            </h1>
            <div>
                <button onClick={incerementHandler}>+</button>
                <button onClick={decerementHandler}>-</button>
            </div>

        </div>    
    )
}


export default connect(mapStateToProps,mapDispatchToProps)(Counter)