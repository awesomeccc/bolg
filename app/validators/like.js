const {
  LinValidator,
  Rule
} = require('../../core/lin-validator-v2')

const {
  ArtType
} = require('../lib/enum')


class PositiveIntegerValidator extends LinValidator {
  constructor() {
      super()
      this.id = [
          new Rule('isInt', '需要是正整数', {
              min: 1
          }),
      ]
  }
}

class LikeValidator extends PositiveIntegerValidator {
  constructor() {
      super()
      this.validateType = checkArtType
      // const checker = new Checker(ArtType)
      // this.validateType = checker.check.bind(checker)
  }
}

function checkArtType(vals) {
  let type = vals.body.type || vals.path.type
  if (!type) {
      throw new Error('type是必须参数')
  }
  type = parseInt(type)

  if (!ArtType.isThisType(type)) {
      throw new Error('type参数不合法')
  }
}

module.exports = {
  PositiveIntegerValidator,
  LikeValidator
}