import { json } from "react-router-dom";
import axios from 'axios'

const baseUrl = 'https://testbackend.melod1n.dedyn.io';

async function loginAxios(loginInfo, callback){
    const url = `${baseUrl}/auth`

    console.log(url)

    await axios.get(url,{
        params:{
            email:loginInfo.email,
            password:loginInfo.password
        }
    }).then((res)=>{
        callback(res.data)
    })
}

async function login(loginInfo) {
    const url = new URL(`${baseUrl}/auth`)
    url.search = new URLSearchParams(loginInfo).toString()
    const res = await fetch(url)

    return res.json()
}

async function checkAccount() {
    const url = `${baseUrl}/account`;
    console.log(url)
    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    return res.json()
}

async function getDataFilters(callback) {
    const url = `${baseUrl}/journals/filters`;

    await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then((res) => {
        callback(res.data)
        console.log(res.data);
    })
}



export {
    login, checkAccount, getDataFilters, loginAxios
}

