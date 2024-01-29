const getDecimalSeparator = () : string =>
{
  const num:number = 1.1;
  const numLocaleString: string = num.toLocaleString().substring(1, 2);
  return numLocaleString;
};

export const emptyString:string = "";
export const periodCharcter:string = ".";
export const whiteSpace:string = " ";
export const hyphen:string = "-";
export const decimalSeparator:string = getDecimalSeparator();

export const isNull = (value:any):boolean => 
{
  return value === undefined || value === null;
};

export const isNullOrEmpty = (value:any, trimWhiteSpaces: boolean = false):boolean =>
{
  if (isNull(value))
  {
    return true;
  }
  
  if (value === emptyString)
  {
    return true;
  }

  if (trimWhiteSpaces &&  value.trim() === emptyString)
  {
    return true;
  }

  return false;
};

