
function Prd({children,...props}) {
    this.Value = props;
    return {$$typeof:"hello",value:"heelo"};
}

function crxCx(data = null) {
    let cxt = new Object();
    cxt.Value = null;
    cxt.Provider = Prd.bind(cxt);
    return cxt;
}


function useCx(cx) {
    return { ...cx.Value }
}       

export {useCx,crxCx,Prd};