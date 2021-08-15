const SelfieTokenizer = artifacts.require("SelfieTokenizer");

module.exports = function(deployer) {
  deployer.deploy(SelfieTokenizer);
};