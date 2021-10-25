export default {
    LOG_LEVEL: 0, // DEBUG LEVELS: 0 => No logs | 1 => Lifecycle | 2 => 1 + Rest
    IS_BUNDLED: false,
    IS_POLL_ENABLED: true,
    IS_DATA_POLL_ENABLED: true,
    IS_COMPOSER_LOG_ENABLED: true, // if true it still needs to be enabled via API in composer
    ERROR_LOG_UI: 'redbox', // 'none' | 'redbox' | 'toast' | 'alert'
    WARNING_LOG_UI: 'toast', // 'none' | 'yellowbox' | 'toast' | 'alert'
};
