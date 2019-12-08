import { API_BASE_URL, ACCESS_TOKEN } from '../index';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/api/auth/newUser",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkGroupNameAvailability(groupName) {
    return request ({
            url: API_BASE_URL + "/group/checkGroupNameAvailability?groupName=" + groupName,
            method: 'GET'
    } );
}

export function checkTypeAvailability(type){
    return request ({
            url: API_BASE_URL + "/type/checkTypeAvailability?type=" + type,
            method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/api/users/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/users/user/me",
        method: 'GET'
    });
    
}

export function getReceivedDocuments (email) {
    return request ({
        url: API_BASE_URL + "/api/documents/?email=" + email + "/received",
        method: 'GET'
    })
}

