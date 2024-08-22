'use server'
import { HTTP_METHOD } from '@/types/http.type';
import { getCookie } from './cookie';

export async function requestHTTPs<T>(url: string, requestBody: object | null, method: HTTP_METHOD): Promise<T> {
    const accessTokenCookie = await getCookie('access_token');
    let options = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        method
    }
    const isPostMethod = method === HTTP_METHOD.POST;
    const isPatchMethod = method === HTTP_METHOD.PATCH;
    if (isPostMethod || isPatchMethod){
        options = Object.assign(options, {
            body: JSON.stringify(requestBody),
        });
    }
    if(accessTokenCookie){
        options = Object.assign(options, {
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${accessTokenCookie.value}`
            }
        });
    }
    const result = await fetch(url, options)
        .then(async (value: Response) => {
            return await value.json();
        })
        .catch((error: unknown) => {
            throw error;
        });

    return result;
}