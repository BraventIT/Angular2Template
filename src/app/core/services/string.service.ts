import { Injectable } from '@angular/core';

@Injectable()
export class StringService {

    constructor() { }

    /**
     * Formats a string with parameters (encoding URL)
     */
    stringFormat(args: any[]): string {

        let url = '',
            baseUrl = '',
            qs = '',
            qsFormatted = '',
            splitted,
            vars = [],
            hash, i;

        if (args === null || args.length === 0) {
            return '';
        }

        if (args.length === 1) {
            url = args[0];
        } else {
            url = args[0].replace(/\{(\d+)\}/g, function (match, number) {
                return args[parseInt(number, 10) + 1] !== undefined ? encodeURIComponent(args[parseInt(number, 10) + 1]) : '';
            });
        }

        // Remove empty qs parameters
        if (url.indexOf('?') >= 0) {
            splitted = url.split('?');
            baseUrl = splitted[0];

            if (splitted.length > 1) {
                qs = splitted[1].split('&');
                for (i = 0; i < qs.length; i++) {
                    if (qs[i].indexOf('=') >= 0) {
                        hash = qs[i].split('=');
                        vars.push({ code: hash[0], value: hash[1] });
                    } else {
                        vars.push({ code: qs[i], value: '' });
                    }
                }

                // Fill qsFormatted using vars and removing empty values
                for (i = 0; i < vars.length; i++) {
                    if (vars[i].value && vars[i].value !== '') {
                        qsFormatted = qsFormatted + ((qsFormatted === '') ? '?' : '&') + vars[i].code + '=' + vars[i].value;
                    }
                }
            }
        } else {
            baseUrl = url;
        }

        return baseUrl + qsFormatted;
    }

    /**
     * String Format without encoding
     * @param {any[]} args
     * @returns {string}
     * @memberOf StringService
     */
    stringFormatText(args: any[]): string {

        let result = '';

        if (args === null || args.length === 0) {
            return '';
        }

        if (args.length === 1) {
            result = args[0];
        } else {
            result = args[0].replace(/\{(\d+)\}/g, function (match, number) {
                return args[parseInt(number, 10) + 1] !== undefined ? args[parseInt(number, 10) + 1] : '';
            });
        }

        return result;
    }
}
