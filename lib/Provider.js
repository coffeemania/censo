import request from 'request-promise-native';


const regexps = {
    registered: /Ваше\sобращение\sот\s(\d{2}\.\d{2}\.\d{4})\sг.\sid\sобращения\s([^\s]*)\sзарегистрировано\s(\d{2}\.\d{2}\.\d{4})\sг\.\s\u2116\s([^\s]*)/gm
    // ...
};


export class Provider {

    static async fetch(appealId) {

        const result = await request({
            url: 'https://xn--90adear.xn--p1ai/request_main/check_status/',
            method: 'POST',
            headers: this.getHeaders(),
            body: `id=${appealId}`
        });

        return JSON.parse(result).message;
    }

    static getHeaders() {
        return {
            'accept-encoding': 'identity',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'x-requested-with': 'XMLHttpRequest',
            'pragma': 'no-cache',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'cache-control': 'no-cache'

            // - optional -
            // 'cookie': 'session=f31ddc827743138d548f4a05dc0f7826',
            // 'origin': 'https://xn--90adear.xn--p1ai',
            // 'accept-encoding': 'gzip, deflate, br',
            // 'authority': 'xn--90adear.xn--p1ai',
            // 'referer': 'https://xn--90adear.xn--p1ai/request_main/check/?status=57a740065901f01d2137317a405294e8',
            // 'sec-metadata': 'destination="", site=same-origin'
        };
    }

    /**
     * [appealDate, internalId, acceptDate, genericId]
     */
    static async parse(statusResponse) {
        // const mock = 'Ваше обращение от 24.11.2018 г. id обращения S26GIBDD514201 зарегистрировано 26.11.2018 г. № 3/186104524717 и находится на рассмотрении в УГИБДД ГУ МВД России по Краснодарскому краю. Обращаем Ваше внимание, что в системе МВД России регистрационный номер обращению присваивается однократно при поступлении и остается неизменным.'
        const re = regexps.registered;
        return re.exec(statusResponse);
    }

    static async getAppealStatus(appealId) {
        const statusData = this.fetch(appealId);
        return statusData;
    }
}
