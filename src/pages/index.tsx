/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import IPLookup from '../views/IPLookup';
import { NextPageContext } from 'next';
import { getApiHost, setContextResponseHeaders } from '../utils/network/network';
import { getMyRealIP } from '../utils/apis/apis';
import ResponseDetails from '../interfaces/api/ResponseDetails';
import { useRouter } from 'next/router'
import { useEffect } from 'react';

interface IndexProps {
  ipAddress: string;
}
const Index: React.FC<IndexProps> = (props) =>  {
  const router = useRouter();
  
  useEffect(() => {
    router.push('', undefined, { shallow: true });
  }, [router]);
  
  return (
    <div className="container">
      <Head>
            <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
      </Head>
      
      <main>
          <IPLookup ipAddress={props.ipAddress} /> 
      </main>

      <footer>
      </footer>
    </div>
  )
};


export async function getServerSideProps(context: NextPageContext) {
  const host: string = getApiHost(context);
  console.log("host: ", host);
  setContextResponseHeaders(context, host);
  const headers : HeadersInit = 
    {
        'origin': host,
        'referer': host
    };
  const myRealIpResponse: ResponseDetails<string> = await getMyRealIP(host, headers);
  console.log('myRealIpResponse', myRealIpResponse);

  return {
    props: {ipAddress: myRealIpResponse.data}
  }
} 

export default Index;
