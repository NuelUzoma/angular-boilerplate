/**
 * An HTTP interceptor that will automatically add the JWT token 
 * to the Authorization header of every outgoing HTTP request.
 * 
 * Ensures that the JWT token is included in all requests
 */
import { HttpRequest, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    // Retrieve the JWT token from the localStorage
    const token = localStorage.getItem('token');

    console.log('JWT Token:', token);

    // Clone the request and add the Authorization header with the token
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(authRequest);
}