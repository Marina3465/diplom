const baseUrl = 'https://testbackend.melod1n.dedyn.io';
// data_token;
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
    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
   
    return res.json()
}


// checkAccount().then((res) => {

// })

export {
    login, checkAccount
}

