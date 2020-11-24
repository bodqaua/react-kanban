export function setLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string): any {
    const item = localStorage.getItem(key);
    if (item === null) {
        return null;
    }
    return JSON.parse(item);
}

export function removeLocalStorage(key: string): boolean {
    localStorage.removeItem(key);
    return true;
}
