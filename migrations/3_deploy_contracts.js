var Contract_Sertifikat = artifacts.require("./Contract_Sertifikat.sol");

module.exports = function(deployer) {
  deployer.deploy(Contract_Sertifikat);
};
