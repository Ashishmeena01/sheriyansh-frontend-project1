
function Provider(props){
    this.Value = this.props;
    return <>
    {props.children}
    </>
}

function crxCx(data = null){
    let cxt = {
        Value:data,
        Provider
    }
    return cxt;
}


function useCx(cx){
    return {...cx.Value}
}       