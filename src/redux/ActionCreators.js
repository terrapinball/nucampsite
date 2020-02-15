import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const fetchCampsites = () => dispatch => {
    
    dispatch(campsitesLoading());
    
    return fetch(baseUrl + 'campsites')
    .then(res => {
        if (res.ok) {
            return res;
        } else {
            const error = new Error(`Error ${res.status}: ${res.statusText}`);
            error.res = res;
            throw error;
        }
    },
    error => {
        const errMess = new Error(error.message);
        throw errMess;
    }
    )
    .then(res => res.json())
    .then(campsites => dispatch(addCampsites(campsites)))
    .catch(error => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
    .then(res => {
        if (res.ok) {
            return res;
        } else {
            const error = new Error(`Error ${res.status}: ${res.statusText}`);
            error.res = res;
            throw error;
        }
    },
    error => {
        const errMess = new Error(error.message);
        throw errMess;
    }
    )
    .then(res => res.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})

export const postComment = (campsiteId, rating, author, text) => dispatch => {
    const newComment = {
        campsiteId,
        rating,
        author,
        text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (res.ok) {
                    return res;
                } else {
                    const error = new Error(`Error ${res.status}: ${res.statusText}`);
                    error.res = res;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(res => res.json())
        .then(res => dispatch(addComment(res)))
        .catch(error => {
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        })
};

export const fetchPromotions = () => dispatch => {
    
    dispatch(promotionsLoading());
    
    return fetch(baseUrl + 'promotions')
    .then(res => {
        if (res.ok) {
                    return res;
                } else {
                    const error = new Error(`Error ${res.status}: ${res.statusText}`);
                    error.res = res;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(res => res.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});

export const fetchPartners = () => dispatch => {

    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
    .then(res => {
        if (res.ok) {
                    return res;
                } else {
                    const error = new Error(`Error ${res.status}: ${res.statusText}`);
                    error.res = res;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )    
        .then(res => res.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});

export const postFeedback = (feedback) => () => {

    return fetch({
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (res.ok) {
                    return res;
                } else {
                    const error = new Error(`Error ${res.status}: ${res.statusText}`);
                    error.res = res;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(res => res.json())
        .then(res => alert('Thank you for your feedback!' + JSON.stringify(res)))
        // .then(res => res.text())
        // .then(text => console.log(text))
        .catch(error => {
            console.log('post feedback', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        })
}