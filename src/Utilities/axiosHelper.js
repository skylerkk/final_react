import axios from "axios";


export async function axiosHelper(method, url, headers, func, data = {}, catchFunc, body = {}) {

    // const history = useHistory();
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