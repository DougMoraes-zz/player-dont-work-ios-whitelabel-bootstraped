import { InitOptions } from 'i18next';
import en from './en/en.json';
import es from './es/es.json';

export const i18nOptions: Partial<InitOptions> = {
    resources: {
        en,
        es,
    },
};
