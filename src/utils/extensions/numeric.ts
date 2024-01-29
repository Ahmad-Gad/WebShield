import { isNull } from "./constants";

declare global 
{  
    interface Number 
    {
        isNan():boolean;
        isInteger(singed?:boolean):boolean;
        isSigned(singed?:boolean):boolean;
    }  
};

Number.prototype.isNan = function():boolean
{
    if (isNull(this))
    {
        return true;
    }
    
    const value:number = this;
    return isNaN(value);
};

Number.prototype.isSigned = function():boolean
{
    const value:number = this;
    return value < 0;
};

Number.prototype.isInteger = function(singed:boolean = true):boolean
{
    const value:number = this;

    if (!Number.isInteger(value))
    {
      return false;
    }

    if (singed === false && value < 0)
    {
        return false;
    }

    return true;
};

export {};