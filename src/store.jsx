import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Action } from './actions';

// Placeholder photos/media for testing purposes
const initialState = {
    photos: [
        {
            "id": 1,
            "year": 2021,
            "month": 9,
            "day": 3,
            "imgName": "Blood Red Sun",
            "imgLink": "https://drive.google.com/uc?export=view&id=1hjfFgMcH8piJokyYjtjWgyL1lPUUosLq",
            "imgDesc": "A pretty red and rad sun resting above the mountain line at dusk.",
            "is_deleted": 0,
        },
        {
            "id": 2,
            "year": 2021,
            "month": 9,
            "day": 1,
            "imgName": "Shady Deer",
            "imgLink": "https://drive.google.com/uc?export=view&id=1iX3kbgNyPvm9f6SvGJw4qHoqDSTNUiAa",
            "imgDesc": "A deer cooling off in the shade of a hot summer day.",
            "is_deleted": 0,
        },
    ],
};

// Pull photos/media from MySQL database into a local Redux store
function reducer(state, action) {
    switch (action.type) {
        case Action.ShowPhotos:
            return {
                ...state,
                photos: action.payload,
            };
        default:
            return state;
    }
}

// Create global store to store state across app components
export const store = createStore(reducer, initialState, applyMiddleware(thunk));