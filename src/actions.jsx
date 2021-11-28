// Error check response
function assertResponse(response) {
    if (response.status >= 200 || response.status < 300) {
        return response;
    } else {
        throw new Error(`${response.status}:${response.statusText}`);
    }
}

// Thunk creator function which takes month and day URL components as parameters
export function fetchDate(month, day, year) {
    return dispatch => {
        fetch(`https://bradfell.me:8443/photos/${month}/${day}/${year}`)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(showPhotos(data.results));
                } else {
                    console.error(data);
                }
            });
    };
}

// Action enum
export const Action = Object.freeze({
    ShowPhotos: 'ShowPhotos',
});
// Action creator - replace current photos with new fetched photos
export function showPhotos(photos) {
    return {type: Action.ShowPhotos, payload: photos};
}