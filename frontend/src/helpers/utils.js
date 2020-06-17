export const  isChildrenEmpty = (data, text, content) => {
    // return map of the component
    // or auxiliar text, case is empty
    return Object.keys(data).length === 0 === true ? text : content  
}