import type {  NextApiRequest, NextApiResponse } from 'next';
import { emptyString } from '../../../utils/extensions/constants';
import { getEnvVariableValue, getRequestDetails } from '../../../utils/global';
import { isLegalRequest, returnBadRequest, returnForbiddenRequest } from '../../../utils/network/network';
import { invokeWebRequest } from '../../../utils/network/webRequestEngine';
import ResponseDetails from '../../../interfaces/api/ResponseDetails';
import RequestDetails from '../../../interfaces/api/RequestDetails';


const host:string = process.env.EXTERNAL_API_HOST;

const headers : string[][] | Record<string, string> | Headers = 
{
    'Content-Type': 'application/json'
};


const handler = async (req: NextApiRequest, res: NextApiResponse<any>): Promise<any> =>
{
    
    const protocol:string = req.socket.localPort === 443? "https" : "http";
    const portSuffix:string = req.socket.localPort === 443 || req.socket.localPort === 80 ? emptyString : `:${req.socket.localPort}`;
    const origin: string = `${protocol}://${req.headers.host}${portSuffix}`;
    res.setHeader('Access-Control-Allow-Origin',  origin);

    console.log('req.rawHeaders', req.rawHeaders);
    if (!isLegalRequest(req))
    {
        returnForbiddenRequest(res);
    }

    if (!req.query || Object.entries(req.query).length === 0) {
        returnBadRequest(res);
    }

    const requestDetails : RequestDetails = getRequestDetails(req);
    
    console.log('requestDetails', requestDetails);
    let apiUri: string = '';
    let queryString: string = '';
    switch (requestDetails.query?.index?.[0]) {
        case 'getMyIp': {
            apiUri = getEnvVariableValue('GET_MY_REAL_IP_API_URL');
            break;
        }

        case 'lookupIp': {
            apiUri = getEnvVariableValue('LOOKUP_IP_API_URL');
            queryString = `/?token=${getEnvVariableValue('LOOKUP_IP_API_TOKEN')}`;
            break;
        }
    }

    const requestUrl:string =  `${apiUri}/${(requestDetails.query.index as string[]).splice(1).join('/')}${requestDetails.queryString}${queryString}`;
    console.log('Real API Url', requestUrl);
    const apiCallResponse : ResponseDetails<any> = await invokeWebRequest(requestUrl, requestDetails.method, requestDetails.body, headers);
    const status: number = await apiCallResponse.status;
    res.setHeader('Cache-Control', 'private, max-age=300');
    res.status(status).json(apiCallResponse);

};

export default handler;