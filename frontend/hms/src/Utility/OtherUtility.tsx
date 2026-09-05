const arrayToCSV = (arr: any) => {
    // 1. If it's already an array, join it
    if (Array.isArray(arr)) {
        return arr.length > 0 ? arr.join(", ") : null;
    }

    // 2. If it's a string, attempt to parse JSON or fallback to regular string
    if (typeof arr === 'string' && arr.trim() !== '') {
        try {
            const parsed = JSON.parse(arr);
            if (Array.isArray(parsed)) {
                return parsed.length > 0 ? parsed.join(", ") : null;
            }
        } catch {
            // It's a standard plain string (e.g., "Peanuts")
            return arr;
        }
    }

    return null;
};

export { arrayToCSV };

// const arrayToCSV = (arr: string[]) => {
//     if(!arr || arr.length===0) return null;
//     return arr.join(", ");
// }

// export { arrayToCSV };