import React from 'react';
import IPLookup from '../../components/IPLookup';

interface IPLookupViewProps {
    ipAddress: string;
}

const IPLookupView: React.FC<IPLookupViewProps> = (props: IPLookupViewProps) => {
    return <IPLookup ipAddress={props.ipAddress}/>;
}
        
export default IPLookupView;