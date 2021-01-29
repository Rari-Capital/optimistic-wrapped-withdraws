import { SignerWithAddress } from "@eth-optimism/plugins/hardhat/ethers/internal/signer-with-address";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { solidity } from "ethereum-waffle";
chai.use(solidity);
chai.use(chaiAsPromised);
chai.should();

import { ethers, l2ethers } from "hardhat";

import { L2Checkpoint__factory } from "../typechain";

describe("Everything", function () {
  let l1Signers;
  let l2Signers;

  before(async () => {
    l1Signers = await ethers.getSigners();
    l2Signers = await l2ethers.getSigners();
  });

  it("should allow deposits on L2", async function () {
    let [l1Deployer, l1User] = l1Signers as SignerWithAddress[];
    let [l2Deployer, l2User] = l2Signers as SignerWithAddress[];

    const L2CheckpointFactory = (await l2ethers.getContractFactory(
      "L2Checkpoint"
    )) as L2Checkpoint__factory;
  });
});
