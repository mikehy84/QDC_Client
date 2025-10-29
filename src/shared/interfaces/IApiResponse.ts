export default interface IApiResponse {
    data?: {
        // this will be included in suggestions
        statusCode?: number,
        isSuccess?: boolean,
        errorMessages?: Array<string>,
        result: {
            // this will not give suggestions
            [Key:string] : string
        }
    }
    error?: any;
};