const useHandleChange = () => {
    const handleInputChange = ({ value, key, index, myState, setMyState, arrObj }) => {
        // Clone the current state to avoid mutating it directly
        const newState = JSON.parse(JSON.stringify(myState));
        if (typeof index !== 'undefined') {
            newState[key][index][arrObj] = value;
            // newState[key][index] = { ...newState[key][index], [Object.keys(value)[0]]: value[Object.keys(value)[0]] };
        } else {
            // If it's a nested object
            if (key.includes('.')) {
                const keys = key.split('.');
                let nestedObject = newState;
                for (let i = 0; i < keys.length - 1; i++) {
                    nestedObject = nestedObject[keys[i]];
                }
                nestedObject[keys[keys.length - 1]] = value;
            } else {
                // If it's a simple property
                newState[key] = value;
            }
        }

        // Update the state
        setMyState(newState);
    };

    const handleChange = ({ value, key, index, myState, setMyState }) => {
        // Clone the current state to avoid mutating it directly
        const newState = { ...myState };
      
        if (typeof index !== 'undefined') {
          // Update nested array object
          newState[key][index] = { ...newState[key][index], ...value };
        } else {
          // If it's a nested object
          if (key.includes('.')) {
            const keys = key.split('.');
            let nestedObject = newState;
            for (let i = 0; i < keys.length - 1; i++) {
              nestedObject = nestedObject[keys[i]];
            }
            nestedObject[keys[keys.length - 1]] = value;
          } else {
            // If it's a simple property
            newState[key] = value;
          }
        }
      
        // Update the state
        setMyState(newState);
      };

    const handleAddToArray = ({ structure, state, setState, key }) => {
        const updatedState = JSON.parse(JSON.stringify(state));
        if (key) {
            updatedState[key].push(structure)
        } else {
            updatedState.push(structure);
        }
        setState(updatedState)
    }

    const handleRemoveFromArray = ({ index, state, setState, key }) => {
        const updatedState = JSON.parse(JSON.stringify(state));
        if (key) {
            updatedState[key].splice(index, 1)
        } else {
            updatedState.splice(index, 1)
        }
        setState(updatedState)
    }

    const handleMenuLinkInputChange = ({ value, key, index, myState, setMyState, arrObj }) => {
        // Clone the current state to avoid mutating it directly
        const newState = JSON.parse(JSON.stringify(myState));
        if (typeof index !== 'undefined') {
            newState.menuCards[index][key][arrObj] = value; // Update the specific property of the menuCard
        } else {
            // Check if the key is a nested property
            if (key.includes('.')) {
                const keys = key.split('.');
                let nestedObject = newState.menuCards;
                for (let i = 0; i < keys.length - 1; i++) {
                  nestedObject = nestedObject[keys[i]];
                }
                nestedObject[keys[keys.length - 1]] = value;
            } else {
                newState[key] = value; // Update the main state if it's not nested
            }
        }
      
        // Update the state
        setMyState(newState);
      };

    return { handleInputChange, handleChange, handleAddToArray, handleRemoveFromArray, handleMenuLinkInputChange }
}

export default useHandleChange