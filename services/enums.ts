export enum LoginServiceMessages {
  Success = 'Login successful',
  Error = 'Problem with email or password',
  UnknownError = 'An unknown error occurred',
}

export enum GetTranslatorServiceMessages {
  Success = 'User found',
  NotFound = 'User not found',
  UnknownError = 'An unknown error occurred',
}

export enum SendEmailServiceMessages {
  Success = 'Email sent successfully',
  Error = 'Something went wrong',
}

export enum UpdateTranslatorServiceMessages {
  Success = 'Password created successfully',
  Error = 'User was not updated',
  UnknownError = 'An unknown error occurred',
}

export enum UpdateTranslatorBalanceDay {
  Success = 'BalanceDay was succesfully updated',
  Error = 'Error updating balanceDay',
  UnknownError = 'An unknown error occurred',
}
