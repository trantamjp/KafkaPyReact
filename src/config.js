const EVENT_API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:5013`;

export const LOGIN_API_URL = EVENT_API_BASE_URL + '/events/login';
export const LOGOUT_API_URL = EVENT_API_BASE_URL + '/events/logout';
export const VIEWPAGE_API_URL = EVENT_API_BASE_URL + '/events/viewpage';

export const CONSUMER_API_URL = EVENT_API_BASE_URL + '/events/consumer';
