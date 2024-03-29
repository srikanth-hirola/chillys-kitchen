
export const useHandleFooter = () => {

    const handleFooterAddCol = (e, state, setState, content, stageName, index) => {
        e.preventDefault();
        let updatedState = JSON.parse(JSON.stringify(state));
        if (stageName && stageName === 'items') {
            updatedState[index][stageName].push(content)
        } else {
            updatedState.push(content)
        }
        setState(updatedState)
    }

    const handleFooterDeleteContent = (e, state, setState, index1, stageName, index2) => {
        e.preventDefault()
        let updatedState = JSON.parse(JSON.stringify(state));
        if (stageName && stageName === 'items') {
            let uppdatedContentArray = updatedState[index1][stageName]
            let updatedState2 = uppdatedContentArray.filter((item, index) => index !== index2)
            updatedState[index1][stageName] = updatedState2
        } else {
            updatedState = updatedState.filter((content, index) => index !== index1)
        }
        setState(updatedState)
    }

    const handleContentChange = (e, state, setState, index1, stageName, index2) => {
        e.preventDefault();
        const { name, value } = e.target;
        let updatedState = JSON.parse(JSON.stringify(state));
        if (stageName && stageName === 'items') {
            updatedState[index1][stageName][index2][name] = value
        } else {
            updatedState[index1][name] = value
        }
        setState(updatedState)
    }

    return { handleFooterAddCol, handleFooterDeleteContent, handleContentChange }
}