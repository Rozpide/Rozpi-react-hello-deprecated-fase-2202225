import React, { useState, useEffect } from "react";
import getState from "./flux";
import PropTypes from "prop-types";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore => setState({
                    store: Object.assign(state.store, updatedStore),
                    actions: { ...state.actions }
                })
            })
        );

        useEffect(() => {
            state.actions.getMessage(); // Llamada a la acción de ejemplo
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

injectContext.propTypes = {
    PassedComponent: PropTypes.elementType
};

export default injectContext;
