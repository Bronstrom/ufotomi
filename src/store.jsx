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
            "Tag": "Nature",
            "is_deleted": 0,
            "is_editing": true,
        },
        {
            "id": 2,
            "year": 2021,
            "month": 9,
            "day": 1,
            "imgName": "Shady Deer",
            "imgLink": "https://drive.google.com/uc?export=view&id=1iX3kbgNyPvm9f6SvGJw4qHoqDSTNUiAa",
            "imgDesc": "A deer cooling off in the shade of a hot summer day.",
            "Tag": "Animals",
            "is_deleted": 0,
            "is_editing": false,
        },
        {
            "id": 3,
            "year": 2021,
            "month": 9,
            "day": 6,
            "imgName": "River Bridge",
            "imgLink": "https://drive.google.com/uc?export=view&id=1JaPVVu4Uto65KDoVxE5uZudUo09T93lk",
            "imgDesc": "A bridge spanning across a bright river on a sunny day.",
            "Tag": "Nature",
            "is_deleted": 0,
            "is_editing": false,
        },
        {
            "id": 4,
            "year": 2021,
            "month": 9,
            "day": 2,
            "imgName": "Slightly Sunny River",
            "imgLink": "https://drive.google.com/uc?export=view&id=1tMKZIXkXKdnKU9r6HfDYTY-acHA6VkYy",
            "imgDesc": "A river covered in a mildly sunny atmosphere.",
            "Tag": "Nature",
            "is_deleted": 0,
            "is_editing": false,
        },
    ],
};

// Handles actions (Pulls photos/media from MySQL database into a local Redux store)
function reducer(state, action) {
    switch (action.type) {
        case Action.ShowPhotos:
            return {
                ...state,
                photos: action.payload,
            };
        case Action.BeginPhotoEdit:
            return {
                ...state,
                photos: state.photos.map(photo => {
                    if (photo.id === action.payload) {
                        return {...photo, is_editing: true};
                    } else {
                        return photo;
                    }
                }),
            };
        case Action.EndPhotoEdit:
            return {
                ...state,
                photos: state.photos.map(photo => {
                    if (photo.id === action.payload) {
                        return {...photo, is_editing: false};
                    } else {
                        return photo;
                    }
                }),
            };
        case Action.ReplacePhoto:
            return {
                ...state,
                photos: state.photos.map(photo => {
                    if (photo.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return photo;
                    }
                }),
            };
        case Action.AddPhoto:
            return {
                ...state,
                // Build new array of photos, starting with new photo and previous photos 
                // behind it (new photos appear first)
                photos: [action.payload, ...state.photos]
            };
        case Action.RemovePhoto:
            return {
                ...state,
                // Filter through filters to find
                photos: state.photos.filter(photos => photo.id !== action.payload),
            };
        default:
            return state;
    }
}

// Create global store to store state across app components
export const store = createStore(reducer, initialState, applyMiddleware(thunk));
