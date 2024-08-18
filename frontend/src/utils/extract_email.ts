export const extractNameFromEmail = (email: string ): string => {
    const [namePart] = email.split('@');
  
    const formattedName = namePart
      .split(/[\._]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  
    return formattedName;
  };
 
  