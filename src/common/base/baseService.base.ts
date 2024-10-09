import { HttpStatus } from '@nestjs/common';
import { BaseError } from './baseError.base';

export class BaseService {
   protected BadRequestException(message: string) {
      throw new BaseError('BadRequestException', HttpStatus.BAD_REQUEST, message);
   }

   protected UnauthorizedException(message: string) {
      throw new BaseError('UnauthorizedException', HttpStatus.UNAUTHORIZED, message);
   }

   protected PaymentRequiredException(message: string) {
      throw new BaseError('PaymentRequiredException', HttpStatus.PAYMENT_REQUIRED, message);
   }

   protected ForbiddenException(message: string) {
      throw new BaseError('ForbiddenException', HttpStatus.FORBIDDEN, message);
   }

   protected NotFoundException(message: string) {
      throw new BaseError('NotFoundException', HttpStatus.NOT_FOUND, message);
   }

   protected MethodNotAllowedException(message: string) {
      throw new BaseError('MethodNotAllowedException', HttpStatus.METHOD_NOT_ALLOWED, message);
   }

   protected NotAcceptableException(message: string) {
      throw new BaseError('NotAcceptableException', HttpStatus.NOT_ACCEPTABLE, message);
   }

   protected ProxyAuthenticationRequiredException(message: string) {
      throw new BaseError(
         'ProxyAuthenticationRequiredException',
         HttpStatus.PROXY_AUTHENTICATION_REQUIRED,
         message,
      );
   }

   protected RequestTimeoutException(message: string) {
      throw new BaseError('RequestTimeoutException', HttpStatus.REQUEST_TIMEOUT, message);
   }

   protected ConflictException(message: string) {
      throw new BaseError('ConflictException', HttpStatus.CONFLICT, message);
   }

   protected GoneException(message: string) {
      throw new BaseError('GoneException', HttpStatus.GONE, message);
   }

   protected LengthRequiredException(message: string) {
      throw new BaseError('LengthRequiredException', HttpStatus.LENGTH_REQUIRED, message);
   }

   protected PreconditionFailedException(message: string) {
      throw new BaseError('PreconditionFailedException', HttpStatus.PRECONDITION_FAILED, message);
   }

   protected PayloadTooLargeException(message: string) {
      throw new BaseError('PayloadTooLargeException', HttpStatus.PAYLOAD_TOO_LARGE, message);
   }

   protected URITooLongException(message: string) {
      throw new BaseError('URITooLongException', HttpStatus.URI_TOO_LONG, message);
   }

   protected UnsupportedMediaTypeException(message: string) {
      throw new BaseError(
         'UnsupportedMediaTypeException',
         HttpStatus.UNSUPPORTED_MEDIA_TYPE,
         message,
      );
   }

   protected RequestedRangeNotSatisfiableException(message: string) {
      throw new BaseError(
         'RequestedRangeNotSatisfiableException',
         HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
         message,
      );
   }

   protected ExpectationFailedException(message: string) {
      throw new BaseError('ExpectationFailedException', HttpStatus.EXPECTATION_FAILED, message);
   }

   protected ImATeapotException(message: string) {
      throw new BaseError('ImATeapotException', HttpStatus.I_AM_A_TEAPOT, message);
   }

   protected MisdirectedRequestException(message: string) {
      throw new BaseError('MisdirectedRequestException', HttpStatus.MISDIRECTED, message);
   }

   protected UnprocessableEntityException(message: string) {
      throw new BaseError('UnprocessableEntityException', HttpStatus.UNPROCESSABLE_ENTITY, message);
   }

   protected FailedDependencyException(message: string) {
      throw new BaseError('FailedDependencyException', HttpStatus.FAILED_DEPENDENCY, message);
   }

   protected PreconditionRequiredException(message: string) {
      throw new BaseError(
         'PreconditionRequiredException',
         HttpStatus.PRECONDITION_REQUIRED,
         message,
      );
   }

   protected TooManyRequestsException(message: string) {
      throw new BaseError('TooManyRequestsException', HttpStatus.TOO_MANY_REQUESTS, message);
   }

   protected InternalServerErrorException(message: string) {
      throw new BaseError(
         'InternalServerErrorException',
         HttpStatus.INTERNAL_SERVER_ERROR,
         message,
      );
   }

   protected NotImplementedException(message: string) {
      throw new BaseError('NotImplementedException', HttpStatus.NOT_IMPLEMENTED, message);
   }

   protected BadGatewayException(message: string) {
      throw new BaseError('BadGatewayException', HttpStatus.BAD_GATEWAY, message);
   }

   protected ServiceUnavailableException(message: string) {
      throw new BaseError('ServiceUnavailableException', HttpStatus.SERVICE_UNAVAILABLE, message);
   }

   protected GatewayTimeoutException(message: string) {
      throw new BaseError('GatewayTimeoutException', HttpStatus.GATEWAY_TIMEOUT, message);
   }

   protected HTTPVersionNotSupportedException(message: string) {
      throw new BaseError(
         'HTTPVersionNotSupportedException',
         HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
         message,
      );
   }

   protected ThrowError(error: any) {
      console.log(error);
      switch (error.response.error) {
         case 'BadRequestException':
            throw this.BadRequestException(error.response.message);
         case 'UnauthorizedException':
            throw this.UnauthorizedException(error.response.message);
         case 'PaymentRequiredException':
            throw this.PaymentRequiredException(error.response.message);
         case 'ForbiddenException':
            throw this.ForbiddenException(error.response.message);
         case 'NotFoundException':
            throw this.NotFoundException(error.response.message);
         case 'MethodNotAllowedException':
            throw this.MethodNotAllowedException(error.response.message);
         case 'NotAcceptableException':
            throw this.NotAcceptableException(error.response.message);
         case 'ProxyAuthenticationRequiredException':
            throw this.ProxyAuthenticationRequiredException(error.response.message);
         case 'LengthRequiredException':
            throw this.LengthRequiredException(error.response.message);
         case 'RequestTimeoutException':
            throw this.RequestTimeoutException(error.response.message);
         case 'ConflictException':
            throw this.ConflictException(error.response.message);
         case 'GoneException':
            throw this.GoneException(error.response.message);
         case 'PreconditionFailedException':
            throw this.PreconditionFailedException(error.response.message);
         case 'PayloadTooLargeException':
            throw this.PayloadTooLargeException(error.response.message);
         case 'URITooLongException':
            throw this.URITooLongException(error.response.message);
         case 'UnsupportedMediaTypeException':
            throw this.UnsupportedMediaTypeException(error.response.message);
         case 'RequestedRangeNotSatisfiableException':
            throw this.RequestedRangeNotSatisfiableException(error.response.message);
         case 'ExpectationFailedException':
            throw this.ExpectationFailedException(error.response.message);
         case 'ImATeapotException':
            throw this.ImATeapotException(error.response.message);
         case 'MisdirectedRequestException':
            throw this.MisdirectedRequestException(error.response.message);
         case 'UnprocessableEntityException':
            throw this.UnprocessableEntityException(error.response.message);

         case 'FailedDependencyException':
            throw this.FailedDependencyException(error.response.message);

         case 'PreconditionRequiredException':
            throw this.PreconditionRequiredException(error.response.message);

         case 'TooManyRequestsException':
            throw this.MisdirectedRequestException(error.response.message);

         case 'InternalServerErrorException':
            throw this.InternalServerErrorException(error.response.message);

         case 'NotImplementedException':
            throw this.NotImplementedException(error.response.message);

         case 'BadGatewayException':
            throw this.BadGatewayException(error.response.message);

         case 'ServiceUnavailableException':
            throw this.ServiceUnavailableException(error.response.message);

         case 'GatewayTimeoutException':
            throw this.GatewayTimeoutException(error.response.message);

         case 'HTTPVersionNotSupportedException':
            throw this.HTTPVersionNotSupportedException(error.response.message);
         default:
            throw new BaseError(
               'UnknownError',
               HttpStatus.INTERNAL_SERVER_ERROR,
               'An unknown error occurred',
            );
      }
   }
}