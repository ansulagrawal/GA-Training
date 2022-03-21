import {
  validateLength,
  validatePassword,
  validateEmail,
} from './helperFunction';

//Testing validateLength
test('Length Validation', () => {
  expect(validateLength('abcd', 1, 5)).toBe(true);
});

test('Length Validation', () => {
  expect(validateLength('abcde', 1, 10)).toBe(true);
});

test('Length Validation', () => {
  expect(validateLength('abcd', 1, 3)).toBe(false);
});

//Testing validateEmail
test('Email Validation', () => {
  expect(validateEmail('mkrana56@gmail.com')).toBe(true);
});

test('Email Validation', () => {
  expect(validateEmail('mkrana56gmail.com')).toBe(false);
});

test('Email Validation', () => {
  expect(validateEmail('mkrana@gmail.com')).toBe(true);
});

//Testing validatePassword
test('Password Validation', () => {
  expect(validatePassword('mkrana')).toBe(false);
});

test('Password Validation', () => {
  expect(validatePassword('#Mukul123')).toBe(true);
});

test('Password Validation', () => {
  expect(validatePassword('abhiskekT$123')).toBe(true);
});
