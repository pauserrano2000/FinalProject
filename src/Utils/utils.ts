export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getInitials = (firstName: string | null, lastName:string | null) => {
    return (firstName && firstName?.charAt(0) + (lastName && lastName?.charAt(0))) ?? null;
    
}