import { passwordConfirmValidator } from './password-confirm.directive';

describe('PasswordConfirmValidatorFunction', () => {
  it('should be defined', () => {
    const directive = passwordConfirmValidator;
    expect(directive).toBeDefined();
  });
});
