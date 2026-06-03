import axios from "axios"

export async function register({name, username, email, password}){ 
    try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/register",
        {
            name, username, email, password
        },
        {
            withCredentials: true
        })

        return response.data

    } catch (error) {
        console.log(error)
    }
}

export async function login({email, password}){
    try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/login", {
            email, password
        }, 
        {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function logout(){
    try {
        const response = await axios.get("http://localhost:3000/api/v1/auth/logout",{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getMe(){
    try {
        const response = await axios.get("http://localhost:3000/api/v1/auth/get-me",{
            withCredentials: true
        })

        return response.data
    } catch (error) {
        console.log(error)
    }
}