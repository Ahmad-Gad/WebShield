import HttpRequestMethod from "../../enums/HttpRequestMethod";

import externalApi from "../network/externalApi";
import { getEnvVariableValue } from "../global";
import IPAddressLookup from "../../interfaces/api/model/response/IPAddress/IPAddressLookup";
import ResponseDetails from "../../interfaces/api/ResponseDetails";
import { invokeWebRequest } from "../network/webRequestEngine";

export const getWeatherForecast = async (host?: string) : Promise<ResponseDetails<any[]>> => {
    const weatherForecastRoute:string = process.env.NEXT_PUBLIC_GET_WEATHER_FORECAST_ROUTE;
    const weatherForecastApi:string = process.env.NEXT_PUBLIC_GET_WEATHER_FORECAST_API;

    const uri:string = `${weatherForecastRoute}/${weatherForecastApi}`;
    return externalApi(uri, HttpRequestMethod.GET, null, host);
};

export const getMyRealIP = async(host?: string, headers?: HeadersInit): Promise<ResponseDetails<string>> => {
    const response: ResponseDetails<string> = await externalApi(getEnvVariableValue('GET_MY_REAL_IP_API_LOCAL_ROUTE'), HttpRequestMethod.GET, null, host, headers);
    return response;
}

export const lookupIp = async(ipAddress: string): Promise<ResponseDetails<IPAddressLookup>> => {
    //const apiUrl: string = `${getEnvVariableValue('NEXT_PUBLIC_LOOKUP_IP_API_LOCAL_ROUTE')}/${ipAddress}`;
    const apiUrl: string = `${process.env.NEXT_PUBLIC_LOOKUP_IP_API_LOCAL_ROUTE}/${ipAddress}`;
    const response: ResponseDetails<IPAddressLookup> = await externalApi(apiUrl, HttpRequestMethod.GET);
    return response;
}

