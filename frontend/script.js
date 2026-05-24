const API_URL = 'http://localhost:3000';

async function registerUser() {

    const name =
        document.getElementById('registerName').value;

    const email =
        document.getElementById('registerEmail').value;

    const password =
        document.getElementById('registerPassword').value;

    const response = await fetch(`${API_URL}/register`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            name,
            email,
            password
        })

    });

    const data = await response.json();

    document.getElementById('output').innerText =
        JSON.stringify(data, null, 2);
}

async function loginUser() {

    const email =
        document.getElementById('loginEmail').value;

    const password =
        document.getElementById('loginPassword').value;

    const response = await fetch(`${API_URL}/login`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            email,
            password
        })

    });

    const data = await response.json();

    if (data.token) {

        localStorage.setItem('token', data.token);
    }

    document.getElementById('output').innerText =
        JSON.stringify(data, null, 2);
}

async function loadDashboard() {

    const token =
        localStorage.getItem('token');

    const response = await fetch(`${API_URL}/dashboard`, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    const data = await response.json();

    document.getElementById('output').innerText =
        JSON.stringify(data, null, 2);
}

async function loadUsers() {

    const token =
        localStorage.getItem('token');

    const response = await fetch(`${API_URL}/users`, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    });

    const data = await response.json();

    document.getElementById('output').innerText =
        JSON.stringify(data, null, 2);
}