import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'passwordStrength', async: false })
export class PasswordStrengthValidator implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    if (!password) return false;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
  }
}
