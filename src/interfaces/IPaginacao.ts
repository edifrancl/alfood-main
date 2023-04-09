/* Results vai ser um array de outra interface -- recurso do typescript */
export default interface IPaginacao<T> {
    count: number
    next: string
    previous: string
    results: T[]
}