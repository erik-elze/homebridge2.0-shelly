
module.exports = homebridge => {
  const Characteristic = homebridge.hap.Characteristic

  const Formats = homebridge.hap.Formats || Characteristic.Formats
  const Perms = homebridge.hap.Perms || Characteristic.Perms
  // HAP-NodeJS 1.0 renamed READ to PAIRED_READ.  Retain the old spelling as a
  // fallback so the plugin can still run with the Homebridge versions it
  // previously supported.
  const pairedRead = Perms.PAIRED_READ || Perms.READ

  class ConsumptionCharacteristic extends Characteristic {
    constructor() {
      super('Consumption', ConsumptionCharacteristic.UUID)
      this.setProps({
        format: Formats.FLOAT,
        unit: 'W',
        minValue: 0,
        maxValue: 65535,
        minStep: 0.1,
        perms: [pairedRead, Perms.NOTIFY],
      })
      this.value = this.getDefaultValue()
    }
  }
  ConsumptionCharacteristic.UUID = 'E863F10D-079E-48FF-8F27-9C2605A29F52'

  class ElectricCurrentCharacteristic extends Characteristic {
    constructor() {
      super('Electric Current', ElectricCurrentCharacteristic.UUID)
      this.setProps({
        format: Formats.FLOAT,
        unit: 'A',
        perms: [pairedRead, Perms.NOTIFY],
      })
      this.value = this.getDefaultValue()
    }
  }
  ElectricCurrentCharacteristic.UUID = 'E863F126-079E-48FF-8F27-9C2605A29F52'

  class VoltageCharacteristic extends Characteristic {
    constructor() {
      super('Voltage', VoltageCharacteristic.UUID)
      this.setProps({
        format: Formats.FLOAT,
        unit: 'V',
        perms: [pairedRead, Perms.NOTIFY],
      })
      this.value = this.getDefaultValue()
    }
  }
  VoltageCharacteristic.UUID = 'E863F10A-079E-48FF-8F27-9C2605A29F52'

  return {
    ConsumptionCharacteristic,
    ElectricCurrentCharacteristic,
    VoltageCharacteristic,
  }
}
