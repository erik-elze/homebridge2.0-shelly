const EventEmitter = require('events')

const Homebridge = require('./mocks/homebridge')

const homebridge = new Homebridge()
const PowerMeterAbility = require('../abilities/power-meter')(homebridge)
const {
  ConsumptionCharacteristic,
} = require('../util/custom-characteristics')(homebridge)
const { PowerMeterService } = require('../util/custom-services')(homebridge)

describe('PowerMeterAbility', function() {
  it('repairs invalid permissions on cached characteristics', function() {
    const service = new PowerMeterService()
    const consumption = service.getCharacteristic(ConsumptionCharacteristic)
    consumption.setProps({
      perms: [null, 'ev'],
    })

    const device = new EventEmitter()
    device.power = 0
    const accessory = {
      device,
      log: {
        debug() {},
      },
      platformAccessory: {
        addService() {},
        getService() {
          return service
        },
      },
    }
    const ability = new PowerMeterAbility('power')

    ability.setup(accessory)

    consumption.props.perms.should.deepEqual(['READ', 'NOTIFY'])
  })
})
