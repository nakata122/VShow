
const BaseUrl = 'http://localhost:3001';


// Function to return GET promise
function get (endpoint) {
    return fetch(endpoint, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(validate).catch(catcher);
}

// Function to return POST promise
function post (data, endpoint) {
    return fetch(endpoint, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(validate).catch(catcher);
}

// Function to return PUT promise
function update (data, endpoint) {
    return fetch(BaseUrl+endpoint, {
        method: 'put',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(validate).catch(catcher);
}

// Function to return DELETE promise
function remove (endpoint) {
    return fetch(BaseUrl+endpoint, {
        method: 'delete',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(validate).catch(catcher);
}

function validate(res){
    if(res.status === 200) return res;
    else if(res.status === 401) res.json = () => ({type:'error', message: 'Wrong username or password'});
    else if(res.status === 404) res.json = () => ({type:'error', message: 'Not found'});
    else res.json = () =>({type:'error', message: 'Error'});
    return res;
}

function catcher(res){
    res.json = () =>({type:'error', message: 'Could not connect to server'});
    return res;
}

export default {
    get,
    post,
    update,
    remove
}