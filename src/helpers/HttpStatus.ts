export default class HttpStatus {
   static readonly ok = 200 //
   static readonly badRequest = 400 // Client sent an invalid request — such as lacking required request body or parameter
   static readonly unauthorized = 401 // Client failed to authenticate with the server
   static readonly forbidden = 403 // Client authenticated but does not have permission to access the requested resource
   static readonly notFound  = 404 // The requested resource does not exist
   static readonly conflict = 409 //  Duplicate resource or resource already exists
   static readonly preconditionFailed  = 412 // One or more conditions in the request header fields evaluated to false
   static readonly internalServerError = 500 // A generic error occurred on the server
   static readonly serviceUnavailable = 503 // The requested services is not available
}
