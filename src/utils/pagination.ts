export function getPersistedPage(): number {
    const page = window.localStorage.getItem('currentPage');
    return page ? Number(page) : 1;
}

export function setPersistedPage(page: number) {
    window.localStorage.setItem('currentPage', String(page));
}
