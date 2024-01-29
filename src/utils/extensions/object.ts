import { isNull } from "./constants";

declare global
{  
    interface Object 
    {
        isNull():boolean;
        isNumeric(singed?:boolean):boolean;
        isInteger(singed?:boolean):boolean;
        toNumber():number;
    }  
};

Object.prototype.isNull = function():boolean
{
  return isNull(this);
};

Object.prototype.toNumber = function():number
{
  return Number(this);
};

Object.prototype.isNumeric = function(singed:boolean = true):boolean
{
  if (isNull(this))
  {
    return false;
  }
  
  const value:any = this;
  const numValue:number = value.toNumber();
  if (isNaN(numValue))
  {
    return false;
  }

  if (singed === false)
  {
    if (numValue < 0)
    {
        return true;
    }
  }

  return true;
};

Object.prototype.isInteger = function(singed:boolean = true):boolean
{
  if (isNull(this))
  {
    return false;
  }
  
  const value:any = this;
  const numValue:number = Number(value);
  if (isNaN(numValue))
  {
    return false;
  }

  if (!Number.isInteger(numValue))
  {
    return false;
  }

  if (singed === false)
  {
    if (numValue < 0)
    {
      return true;
    }
  }

  return true;
};

export {};