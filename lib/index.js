'use strict';

const stringErrors = (target, {required, minLength, maxLength, regex}, modelName) => {
  function* stringErrorGenerator() {
    if (!required && !target) {
      return
    }
    if (required && !target) {
      yield `${modelName} is required`
    }
    if (typeof target !== 'string') {
      yield `${modelName} is not string`
      return
    }
    if (minLength && minLength > target.length) {
      yield `${modelName} should be at least ${minLength} characters`
    }
    if (maxLength && maxLength < target.length) {
      yield `${modelName} shouldn't be more than ${maxLength} characters`
    }
    if (regex && !regex.text(target)) {
      yield `${modelName} is invalid string`
    }
  }
  return [...stringErrorGenerator()]
}

const mailErrors = (mail, modelName = 'Mail') => {
  return stringErrors(mail, {required: true, regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/}, modelName)
}

const uuidErrors = (uuid, modelName = 'UUID') => {
  return stringErrors(uuid, {required: true, regex: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/}, modelName)
}

module.exports = {stringErrors, mailErrors, uuidErrors};
