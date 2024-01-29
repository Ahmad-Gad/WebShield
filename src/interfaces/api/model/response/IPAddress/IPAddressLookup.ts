import IPSectionNames from "./IPSectionNames";

export default interface IPAddressLookup {
    continent: IPSectionNames;

    country: IPSectionNames;

    subdivisions: IPSectionNames []; // province

    city: IPSectionNames;

    traits: {
        isp: string;
    };
}