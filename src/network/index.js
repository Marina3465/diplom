import { json } from "react-router-dom";

const baseUrl = 'https://testbackend.melod1n.dedyn.io';

async function login(loginInfo){
    const url = new URL(`${baseUrl}/auth`)
    url.search = new URLSearchParams(loginInfo).toString()
    const res = await fetch(url)

    return res.json()
}

async function checkAccount(){
    const url = `${baseUrl}/account`;
    console.log(url)
    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    return res.json()
}

// async function getDataFilters(){
//     const url = `${baseUrl}/journals/filters`;
//     const res = await fetch(url, {
//         headers: {
//             "Authorization": `Bearer ${localStorage.getItem('token')}`
//         }
//     })
//     const data = res.json()
//     console.log(data)
//     return data
   
    
// }


export {
    login, checkAccount
}

