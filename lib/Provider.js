import request from 'request-promise-native';
import {AppealHistory} from '../models/appealHistory';


export class Provider {

    static async fetch(appealId) {

        const response = await request({
            url: 'https://xn--90adear.xn--p1ai/request_main/check_status/',
            method: 'POST',
            headers: this.getHeaders(),
            body: `id=${appealId}`
        });

        // TODO mock
        // const response = '{"message":"\u0412\u0430\u0448\u0435 \u043e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u0435 \u043e\u0442 24.11.2018 \u0433. id \u043e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u044f S26GIBDD514201 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u043e 26.11.2018 \u0433. \u2116 3\/186104524717 \u0438 \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0441\u044f \u043d\u0430 \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0438 \u0432 \u0423\u0413\u0418\u0411\u0414\u0414 \u0413\u0423 \u041c\u0412\u0414 \u0420\u043e\u0441\u0441\u0438\u0438 \u043f\u043e \u041a\u0440\u0430\u0441\u043d\u043e\u0434\u0430\u0440\u0441\u043a\u043e\u043c\u0443 \u043a\u0440\u0430\u044e. \u041e\u0431\u0440\u0430\u0449\u0430\u0435\u043c \u0412\u0430\u0448\u0435 \u0432\u043d\u0438\u043c\u0430\u043d\u0438\u0435, \u0447\u0442\u043e \u0432 \u0441\u0438\u0441\u0442\u0435\u043c\u0435 \u041c\u0412\u0414 \u0420\u043e\u0441\u0441\u0438\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u043d\u043e\u043c\u0435\u0440 \u043e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u044e \u043f\u0440\u0438\u0441\u0432\u0430\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u043e\u0434\u043d\u043e\u043a\u0440\u0430\u0442\u043d\u043e \u043f\u0440\u0438 \u043f\u043e\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u0438 \u0438 \u043e\u0441\u0442\u0430\u0435\u0442\u0441\u044f \u043d\u0435\u0438\u0437\u043c\u0435\u043d\u043d\u044b\u043c."}';
        const raw = JSON.parse(response).message;
        const parsed = this.parse(raw);

        return {
            parsed,
            raw
        };
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
     * [appealDate, genericId, acceptDate, genericNumber]
     */
    static parse(statusResponse) {

        // don't move regexps definition out of this scope :)
        // https://stackoverflow.com/questions/4724701/regexp-exec-returns-null-sporadically
        const regexps = {
            registered: /Ваше\sобращение\sот\s(\d{2}\.\d{2}\.\d{4})\sг.\sid\sобращения\s([^\s]*)\sзарегистрировано\s(\d{2}\.\d{2}\.\d{4})\sг\.\s\u2116\s([^\s]*)/gm
            // ...
        };

        // const mock = 'Ваше обращение от 24.11.2018 г. id обращения S26GIBDD514201 зарегистрировано 26.11.2018 г. № 3/186104524717 и находится на рассмотрении в УГИБДД ГУ МВД России по Краснодарскому краю. Обращаем Ваше внимание, что в системе МВД России регистрационный номер обращению присваивается однократно при поступлении и остается неизменным.'
        const re = regexps.registered;
        const data = re.exec(statusResponse);
        return {
            appealDate: data[1],
            genericId: data[2],
            acceptDate: data[3],
            genericNumber: data[4]
        };
    }


    static async updateStatus(eventId, parsed, rawStatus) {

        return await AppealHistory.query().insertAndFetch({
            eventId: parseInt(eventId, 10),
            appealDate: parsed.appealDate,
            acceptDate: parsed.acceptDate,
            genericId: parsed.genericId,
            genericNumber: parsed.genericNumber,
            rawStatus
        });
    }


    static async getAppealStatus(eventId, appealId) {
        const {parsed, raw} = await this.fetch(appealId);
        const result = await this.updateStatus(eventId, parsed, raw);
        return result;
    }
}
