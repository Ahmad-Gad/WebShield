import { emptyString, isNull } from './constants';
declare global 
{  
  interface String 
  {
    isEmptyString():boolean;
    isNullOrEmpty(trimWhiteSpaces?: boolean):boolean;
    isNumeric(singed?:boolean):boolean;
    isInteger(singed?:boolean):boolean;
    toNumber():number;
  }  
};

String.prototype.isEmptyString = function():boolean
{
  return this === emptyString;
};

String.prototype.isNullOrEmpty = function(trimWhiteSpaces: boolean = false):boolean
{
  if (isNull(this))
  {
    return true;
  }
  
  const value:string = this;

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

String.prototype.toNumber = function()
{
  const value:string = this;
  return Number(value);
};

String.prototype.isNumeric = function(singed:boolean = true):boolean
{
  if (isNull(this))
  {
    return false;
  }
  
  const value:string = this;
  const numValue:number = Number(value);
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

String.prototype.isInteger = function(singed:boolean = true):boolean
{
  if (isNull(this))
  {
    return false;
  }  
  
  const value:string = this;
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