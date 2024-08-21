import axios from 'axios';

const BaseApiInstance = axios.create();
delete BaseApiInstance.defaults.headers.common.Authorization;

export default BaseApiInstance;
