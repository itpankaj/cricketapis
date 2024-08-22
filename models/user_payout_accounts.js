const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_payout_accounts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    payout_paypal_email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    iban_full_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    iban_country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    iban_bank_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    iban_number: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    swift_full_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    swift_address: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    swift_state: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    swift_city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    swift_postcode: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    swift_country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    swift_bank_account_holder_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    swift_iban: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    swift_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    swift_bank_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    swift_bank_branch_city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    swift_bank_branch_country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    default_payout_account: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "paypal"
    }
  }, {
    sequelize,
    tableName: 'user_payout_accounts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
