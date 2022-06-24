

import { environment } from '../../environments/environment';

export class Urls {
    private static BASE_URL: string = environment.api_base_url;
    public static readonly CENTERS = `${Urls.BASE_URL}/centers`;
    public static readonly LOGIN = `${Urls.BASE_URL}/accounts/login`;
    public static readonly USERS = `${Urls.BASE_URL}/accounts`;
    public static readonly DOCKS = `${Urls.BASE_URL}/docks`;
    public static readonly FISHERMAN = `${Urls.BASE_URL}/fishermans`;
    public static readonly TRANSACTION = `${Urls.BASE_URL}/transactions`;
    public static readonly WLIST = `${Urls.BASE_URL}/wasteItems`;
    public static readonly WCOLLECTED = `${Urls.BASE_URL}/wasteCollecteds`;
    public static readonly LOGOUT = `${Urls.BASE_URL}/accounts/logout`;

}
