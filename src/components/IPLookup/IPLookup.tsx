// import '../../styles/style.css';
import React, { useRef, useState } from 'react';
import { Alert, Button, TextField } from '@mui/material';
import { getMyRealIP, lookupIp } from '../../utils/apis/apis';
import ResponseDetails from '../../interfaces/api/ResponseDetails';
import IPAddressLookup from '../../interfaces/api/model/response/IPAddress/IPAddressLookup';

interface IPLookupProps {
  ipAddress: string;
}

const IPLookup: React.FC<IPLookupProps> = (props: IPLookupProps) => {
    const loadedRef = useRef<boolean>(false);
    
    const [ip , setIP] = useState<string | undefined>(props.ipAddress ?? '');
    const [ipLookupDetails , setIpLookupDetails] = useState<string>('');
    const [alertSeverity , setAlertSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');

    const lookupIpAddress = async (): Promise<void> => {
      if (ip === '') {
        return;
      }
   
      const ipLookupDetails: ResponseDetails<IPAddressLookup> = await lookupIp(ip);
      if (!ipLookupDetails.success) {
        setAlertSeverity('error');
        setIpLookupDetails(ipLookupDetails.error.toString());
      } else {
        setAlertSeverity('success');
        const ipLookupData:IPAddressLookup = ipLookupDetails.data;
        const ipLookupString: string = `${ipLookupData.continent.names.en}, ${ipLookupData.country.names.en}, ${ipLookupData.subdivisions[0].names.en}, ${ipLookupData.city.names.en} - ${ipLookupData.traits.isp}`;
        setIpLookupDetails(ipLookupString);
      }
    };

    return (
        <div>
          {
            ip !== '' && ipLookupDetails !== '' ? 
              <Alert
              variant="filled" 
              severity={alertSeverity}
              >{ipLookupDetails}</Alert> : undefined
          }
          
          <br/>
          <br/>
          <br/>
          <br/>
          <TextField
                      label="IP Address"
                      value={ip}
                      className={'locationSearch_input'}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setIP(event.target.value);
                      }}
                      />
          <br/>
          <br/>
          <Button 
                variant="contained"
                disabled={ip === ''}
                onClick={lookupIpAddress}>Lookup IP</Button>
        </div>
      );
};

export default IPLookup;