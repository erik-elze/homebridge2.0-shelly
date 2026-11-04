const Homebridge = require('./mocks/homebridge')

const homebridge = new Homebridge()

const {
  ConsumptionCharacteristic
} = require('../util/custom-characteristics')(homebridge)

describe('ConsumptionCharacteristic', function() {
  describe('#constructor()', function() {
    it('should set a name and UUID', function() {
      const char = new ConsumptionCharacteristic()
      char.displayName.should.be.ok()
      char.UUID.should.be.ok()
    })

    it('should set its properties', function() {
      const char = new ConsumptionCharacteristic()
      char.props.should.be.ok()
      char.props.format.should.be.ok()
      char.props.perms.should.be.ok()
    })

    it('uses PAIRED_READ when supplied by current HAP-NodeJS', function() {
      const currentHomebridge = new Homebridge()
      currentHomebridge.hap.Perms = {
        PAIRED_READ: 'pr',
        NOTIFY: 'ev',
      }
      const { ConsumptionCharacteristic: CurrentConsumptionCharacteristic } =
        require('../util/custom-characteristics')(currentHomebridge)

      const char = new CurrentConsumptionCharacteristic()
      char.props.perms.should.deepEqual(['pr', 'ev'])
      char.props.perms.should.not.containEql(null)
    })
  })
})
