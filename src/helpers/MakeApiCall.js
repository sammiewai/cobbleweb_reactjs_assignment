import axios from 'axios';

export async function MakeApiCall(params) {
    return await new Promise((resolve, reject) => {
        
        const baseUrl = process.env.REACT_APP_BE_BASE_URL;
        const url = `${baseUrl}/${params.url}`;
        axios.request({
            method: params.method,
            url: url,
            data: params.body,
            headers: params.headers
        }).then((response) => {
            let result = response.data ? response.data : '';
            resolve(result);
        }).catch((err) => {
            // Resolve with the error returned
            if (err.response) {
                let errorMessage = (err.response.data && err.response.data.message ? err.response.data.message : err.response.data) || "Undefined upstream error occured.";
                let errorObj = {
                    status: false,
                    message: errorMessage
                };

                resolve(errorObj);
            } else {
                resolve(err);
            }
        })
    })
}
