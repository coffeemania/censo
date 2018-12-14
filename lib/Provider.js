// import fetch from 'node-fetch';
// import axios from 'axios';
import request from 'request-promise-native';


export class Provider {

    static async fetch() {

        const headers = {
            'cookie': 'session=f31ddc827743138d548f4a05dc0f7826',
            'origin': 'https://xn--90adear.xn--p1ai',
            'accept-encoding': 'identity',
            // 'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'x-requested-with': 'XMLHttpRequest',
            'pragma': 'no-cache',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'cache-control': 'no-cache',
            'authority': 'xn--90adear.xn--p1ai',
            'referer': 'https://xn--90adear.xn--p1ai/request_main/check/?status=57a740065901f01d2137317a405294e8',
            'sec-metadata': 'destination="", site=same-origin'
        };

        const dataString = 'id=57a740065901f01d2137317a405294e8';

        const options = {
            url: 'https://xn--90adear.xn--p1ai/request_main/check_status/?status=57a740065901f01d2137317a405294e8',
            method: 'POST',
            headers: headers,
            body: dataString
        };

        const result = await request(options);

        // console.dir(result);

        return JSON.parse(result).message;
    }

    // static async fetch(appealId) {
    //
    //     // const id = '57a740065901f01d2137317a405294e8';
    //
    //     const cookie = 'f31ddc827743138d548f4a05dc0f7826';
    //     const domain = 'xn--90adear.xn--p1ai';
    //     // const domain = 'гибдд.рф';
    //     const referer = `https://${domain}/request_main/check/?status=${appealId}`;
    //     // const url = referer;
    //
    //     const headers = {
    //         cookie: `session=${cookie}`,
    //         origin: `https://${domain}`,
    //         // 'accept-encoding': 'gzip, deflate, br',
    //         'accept-encoding': 'identity',
    //         'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    //         'x-requested-with': 'XMLHttpRequest',
    //         pragma: 'no-cache',
    //         'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36',
    //         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //         accept: 'application/json, text/javascript, */*; q=0.01',
    //         'cache-control': 'no-cache',
    //         authority: domain,
    //         referer,
    //         'sec-metadata': 'destination="", site=same-origin'
    //     };
    //
    //     const url = `https://${domain}/request_main/check_status/?status=${appealId}`;
    //
    //     const result = await axios.post(url, {/*id: appealId*/}, {
    //         headers
    //     });
    //
    //     // const result = await fetch(url, {
    //     //     method: 'POST',
    //     //     body: {id: appealId},
    //     //     headers
    //     // });
    //     //
    //     console.dir(result);
    // }


    static async getAppealStatus(appealId) {
        return this.fetch(appealId);
    }
}
