import axios from "axios";


export async function axiosHelper(method, fullurl, headers, func, data = {}, catchFunc, body = {}) {

    // const history = useHistory();
    // let url = `https://cors-anywhere.herokuapp.com/https://ttrpgbackend.herokuapp.com/${fullurl}`
    let url = `http://localhost:8000/${fullurl}`
    return await axios(
        {
            method,
            url,
            data,
            body,
            headers,
        }
    ).then(res => func(res))
    .catch(err => catchFunc(err));

}