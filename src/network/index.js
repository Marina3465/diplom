const baseUrl = 'https://testbackend.melod1n.dedyn.io'

async function login(loginInfo){
    const url = new URL(`${baseUrl}/auth`)
    url.search = new URLSearchParams(loginInfo).toString()
    // console.log(url)

    const res = await fetch(url)
    return res.json()
}

async function checkAccount(){
    const url = `${baseUrl}/account`;
    console.log(url)
    // console.log(localStorage.getItem('access_token'))
    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    return res.json()
}

export {
    login, checkAccount
}

