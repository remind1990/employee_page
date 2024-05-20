export enum ApiError {
  DOWNLOAD_COLLECTION_ERROR = 'Error downloading collection',
  RATE_LIMIT_EXCEEDED = 'Too many requests, please try again later.',
  NO_TRANSLATOR_FOUND = 'No translator found',
  AUTHENTICATION_ERROR = 'There was a mistake in email or password',
  FUNCTION_ERROR = 'Error in function',
  RATE_LIMIT_SUCCESSFUL = 'Rate limit check successful',
  TRANSLATOR_NOT_UPDATED = 'No translator was updated',
  TRANSLATOR_NO_DATES_PASSED = 'No dates passed in translator balance day update',
}

export enum ApiSuccess {
  EMAIL_SUCCESS = 'Emai has been sent',
  USER_FOUND_SUCCESSFULLY = 'Successfully found a user',
  LOGIN_SUCCESSFUL = 'passwords match',
  LOG_IN_MESSAGE = 'Hello [translator name]. Please log in',
  TRANSLATOR_UPDATED_SUCCESSFULLY = 'Translator was updated with mongoose',
}

export enum ColorEnum {
  BLUE = '#3b82f6',
  ORANGE = '#f97316',
  RED = '#f43f5e',
  INDIGO = '#6366f1',
  CRIMSON = '#be123c',
  SKY_BLUE = '#38bdf8',
  PURPLE = '#8b5cf6',
  LIGHT_RED = '#FF6667',
  DARK_BLUE = '#336CFF',
  YELLOW = '#FFD700',
}
